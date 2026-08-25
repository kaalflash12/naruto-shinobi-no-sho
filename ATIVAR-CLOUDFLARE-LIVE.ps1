param(
  [string]$Repo = 'kaalflash12/naruto-shinobi-no-sho'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Write-Step([string]$Text) {
  Write-Host "`n=== $Text ===" -ForegroundColor Cyan
}

function Get-GhExecutable {
  $existing = Get-Command gh -ErrorAction SilentlyContinue
  if ($existing) { return $existing.Source }

  Write-Step 'Baixando GitHub CLI portatil'
  $root = Join-Path $env:TEMP 'shinobi-gh-portable'
  if (Test-Path $root) { Remove-Item $root -Recurse -Force }
  New-Item -ItemType Directory -Path $root -Force | Out-Null

  $headers = @{ 'User-Agent' = 'naruto-shinobi-no-sho-bootstrap' }
  $release = Invoke-RestMethod -Headers $headers -Uri 'https://api.github.com/repos/cli/cli/releases/latest'
  $asset = @($release.assets | Where-Object { $_.name -match '^gh_.*_windows_amd64\.zip$' }) | Select-Object -First 1
  if (-not $asset) { throw 'Nao foi possivel localizar o GitHub CLI Windows amd64.' }

  $zip = Join-Path $root 'gh.zip'
  Invoke-WebRequest -Headers $headers -Uri $asset.browser_download_url -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $root -Force
  $gh = Get-ChildItem $root -Recurse -Filter gh.exe | Select-Object -First 1
  if (-not $gh) { throw 'gh.exe nao foi encontrado depois da extracao.' }
  return $gh.FullName
}

function Ensure-GhLogin([string]$Gh) {
  Write-Step 'Validando login GitHub'
  & $Gh auth status --hostname github.com *> $null
  if ($LASTEXITCODE -eq 0) {
    Write-Host 'GitHub autenticado.' -ForegroundColor Green
    return
  }

  Write-Host 'O GitHub CLI ainda nao esta autenticado. O navegador sera aberto uma unica vez.' -ForegroundColor Yellow
  & $Gh auth login --hostname github.com --git-protocol https --web
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao autenticar o GitHub CLI.' }
}

function ConvertFrom-SecureValue([Security.SecureString]$Secure) {
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  }
  finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}

function Set-GhSecret([string]$Gh, [string]$Name, [string]$Value) {
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $Gh
  $psi.Arguments = "secret set $Name --repo $Repo"
  $psi.UseShellExecute = $false
  $psi.RedirectStandardInput = $true
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.CreateNoWindow = $true

  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $psi
  [void]$p.Start()
  $p.StandardInput.Write($Value)
  $p.StandardInput.Close()
  $stdout = $p.StandardOutput.ReadToEnd()
  $stderr = $p.StandardError.ReadToEnd()
  $p.WaitForExit()
  if ($p.ExitCode -ne 0) {
    throw "Falha ao gravar GitHub Secret $Name. $stderr $stdout"
  }
}

function Get-CloudflareToken {
  Write-Step 'Criando token Cloudflare'
  Write-Host 'Abrindo a pagina oficial de API Tokens da Cloudflare...' -ForegroundColor Yellow
  Start-Process 'https://dash.cloudflare.com/profile/api-tokens'
  Write-Host ''
  Write-Host 'No painel Cloudflare: Create Token -> template "Edit Cloudflare Workers" -> Continue -> Create Token.' -ForegroundColor White
  Write-Host 'O token e mostrado uma unica vez. Cole-o abaixo; a entrada fica oculta e nao sera gravada em arquivo.' -ForegroundColor White

  $secure = Read-Host 'CLOUDFLARE_API_TOKEN' -AsSecureString
  $token = ConvertFrom-SecureValue $secure
  if ([string]::IsNullOrWhiteSpace($token)) { throw 'Token vazio.' }
  return $token.Trim()
}

function Test-CloudflareToken([string]$Token) {
  Write-Step 'Validando token diretamente na Cloudflare'
  $headers = @{ Authorization = "Bearer $Token"; 'Content-Type' = 'application/json' }
  $verify = Invoke-RestMethod -Method Get -Headers $headers -Uri 'https://api.cloudflare.com/client/v4/user/tokens/verify'
  if ($verify.success -ne $true -or ([string]$verify.result.status).ToLowerInvariant() -ne 'active') {
    throw 'A Cloudflare nao confirmou o token como ACTIVE.'
  }
  Write-Host 'Token Cloudflare ACTIVE.' -ForegroundColor Green
}

function Resolve-CloudflareAccount([string]$Token) {
  Write-Step 'Detectando conta Cloudflare'
  $headers = @{ Authorization = "Bearer $Token"; 'Content-Type' = 'application/json' }
  $response = Invoke-RestMethod -Method Get -Headers $headers -Uri 'https://api.cloudflare.com/client/v4/accounts?per_page=50'
  if ($response.success -ne $true) { throw 'Falha ao listar contas Cloudflare.' }
  $accounts = @($response.result)
  if ($accounts.Count -eq 0) { throw 'Nenhuma conta Cloudflare acessivel por esse token.' }
  if ($accounts.Count -eq 1) {
    Write-Host ("Conta detectada: {0}" -f $accounts[0].name) -ForegroundColor Green
    return [string]$accounts[0].id
  }

  # Quando houver varias contas, tenta identificar automaticamente a que ja possui o Worker canonico.
  $matches = @()
  foreach ($account in $accounts) {
    try {
      $uri = "https://api.cloudflare.com/client/v4/accounts/$($account.id)/workers/scripts/naruto-shinobi-no-sho-api"
      $r = Invoke-WebRequest -UseBasicParsing -Method Get -Headers $headers -Uri $uri -ErrorAction Stop
      if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 300) { $matches += $account }
    }
    catch { }
  }
  if ($matches.Count -eq 1) {
    Write-Host ("Conta detectada pelo Worker existente: {0}" -f $matches[0].name) -ForegroundColor Green
    return [string]$matches[0].id
  }

  Write-Host 'Mais de uma conta Cloudflare ficou elegivel. Escolha a conta do jogo:' -ForegroundColor Yellow
  for ($i = 0; $i -lt $accounts.Count; $i++) {
    Write-Host ("[{0}] {1}  {2}" -f ($i + 1), $accounts[$i].name, $accounts[$i].id)
  }
  do {
    $choice = Read-Host 'Numero da conta'
    $parsed = 0
    $ok = [int]::TryParse($choice, [ref]$parsed) -and $parsed -ge 1 -and $parsed -le $accounts.Count
  } until ($ok)
  return [string]$accounts[$parsed - 1].id
}

function Start-BackendBootstrap([string]$Gh) {
  Write-Step 'Disparando pipeline live'
  $started = [DateTime]::UtcNow
  & $Gh workflow run backend-secret-presence.yml --repo $Repo --ref main
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao disparar Backend Secret Presence Audit.' }

  $runId = $null
  for ($i = 0; $i -lt 90 -and -not $runId; $i++) {
    Start-Sleep -Seconds 2
    $json = & $Gh run list --repo $Repo --workflow backend-secret-presence.yml --limit 10 --json databaseId,createdAt,status,conclusion,event 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $json) { continue }
    $runs = @($json | ConvertFrom-Json)
    $candidate = $runs |
      Where-Object { ([DateTime]$_.createdAt).ToUniversalTime() -ge $started.AddSeconds(-5) } |
      Sort-Object { [DateTime]$_.createdAt } -Descending |
      Select-Object -First 1
    if ($candidate) { $runId = [long]$candidate.databaseId }
  }
  if (-not $runId) { throw 'O workflow foi disparado, mas a execucao nova nao apareceu no GitHub Actions.' }

  Write-Host "Backend Secret Presence run: $runId" -ForegroundColor Green
  & $Gh run watch $runId --repo $Repo --exit-status
  if ($LASTEXITCODE -ne 0) { throw "Backend Secret Presence Audit falhou. Run $runId" }

  Write-Host ''
  Write-Host 'CLOUDFLARE_API_TOKEN e CLOUDFLARE_ACCOUNT_ID estao no GitHub Secrets.' -ForegroundColor Green
  Write-Host 'O workflow existente agora dispara automaticamente o Live Backend quando o auditor confirmar readiness.' -ForegroundColor Green
}

$gh = Get-GhExecutable
Ensure-GhLogin $gh

$token = $null
try {
  $token = Get-CloudflareToken
  Test-CloudflareToken $token
  $accountId = Resolve-CloudflareAccount $token

  Write-Step 'Gravando secrets sem persistir o token em arquivo'
  Set-GhSecret $gh 'CLOUDFLARE_API_TOKEN' $token
  Set-GhSecret $gh 'CLOUDFLARE_ACCOUNT_ID' $accountId
  Write-Host 'GitHub Secrets gravados.' -ForegroundColor Green

  Start-BackendBootstrap $gh
}
finally {
  if ($token) { $token = $null }
  [GC]::Collect()
}

Write-Host ''
Write-Host 'BOOTSTRAP_CLOUDFLARE_LIVE_DISPARADO' -ForegroundColor Green
