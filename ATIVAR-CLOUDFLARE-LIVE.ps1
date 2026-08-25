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

function Get-MongoUri {
  Write-Step 'MongoDB ainda nao configurado no Worker'
  Write-Host 'O backend confirmou que nao existe MONGODB_URI persistida no Worker.' -ForegroundColor Yellow
  Write-Host 'Cole a connection string do MongoDB Atlas. A entrada fica oculta e sera gravada somente como GitHub Secret.' -ForegroundColor White
  $secure = Read-Host 'MONGODB_URI' -AsSecureString
  $uri = ConvertFrom-SecureValue $secure
  if ([string]::IsNullOrWhiteSpace($uri) -or $uri -notmatch '^mongodb(\+srv)?://') {
    throw 'MONGODB_URI vazia ou invalida.'
  }
  return $uri.Trim()
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

function Get-NewRunId([string]$Gh, [string]$Workflow, [DateTime]$SinceUtc, [int]$WaitSeconds = 600) {
  $deadline = [DateTime]::UtcNow.AddSeconds($WaitSeconds)
  while ([DateTime]::UtcNow -lt $deadline) {
    $json = & $Gh run list --repo $Repo --workflow $Workflow --limit 30 --json databaseId,createdAt,status,conclusion,event 2>$null
    if ($LASTEXITCODE -eq 0 -and $json) {
      $runs = @($json | ConvertFrom-Json)
      $candidate = $runs |
        Where-Object { ([DateTime]$_.createdAt).ToUniversalTime() -ge $SinceUtc.AddSeconds(-5) } |
        Sort-Object { [DateTime]$_.createdAt } -Descending |
        Select-Object -First 1
      if ($candidate) { return [long]$candidate.databaseId }
    }
    Start-Sleep -Seconds 2
  }
  throw "Workflow $Workflow nao apareceu dentro de $WaitSeconds segundos."
}

function Watch-Run([string]$Gh, [long]$RunId, [string]$Label, [switch]$AllowFailure) {
  Write-Host "$Label run: $RunId" -ForegroundColor Green
  & $Gh run watch $RunId --repo $Repo --exit-status
  $ok = ($LASTEXITCODE -eq 0)
  if (-not $ok -and -not $AllowFailure) { throw "$Label falhou. Run $RunId" }
  return $ok
}

function Invoke-Workflow([string]$Gh, [string]$Workflow, [string]$Label) {
  $started = [DateTime]::UtcNow
  & $Gh workflow run $Workflow --repo $Repo --ref main
  if ($LASTEXITCODE -ne 0) { throw "Falha ao disparar $Label." }
  $runId = Get-NewRunId $Gh $Workflow $started 600
  [void](Watch-Run $Gh $runId $Label)
  return $runId
}

function Get-RunEvidenceJson([string]$Gh, [long]$RunId, [string]$FileName) {
  $root = Join-Path $env:TEMP ("shinobi-run-{0}-{1}" -f $RunId, [Guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $root -Force | Out-Null
  try {
    & $Gh run download $RunId --repo $Repo --dir $root *> $null
    if ($LASTEXITCODE -ne 0) { return $null }
    $file = Get-ChildItem $root -Recurse -File -Filter $FileName | Select-Object -First 1
    if (-not $file) { return $null }
    return (Get-Content $file.FullName -Raw | ConvertFrom-Json)
  }
  finally {
    if (Test-Path $root) { Remove-Item $root -Recurse -Force -ErrorAction SilentlyContinue }
  }
}

function Get-RepoJson([string]$Gh, [string]$Path) {
  $raw = & $Gh api "repos/$Repo/contents/$Path`?ref=main" 2>$null
  if ($LASTEXITCODE -ne 0 -or -not $raw) { return $null }
  $meta = $raw | ConvertFrom-Json
  if (-not $meta.content) { return $null }
  $bytes = [Convert]::FromBase64String(([string]$meta.content -replace '\s', ''))
  $text = [Text.Encoding]::UTF8.GetString($bytes)
  return ($text | ConvertFrom-Json)
}

function Start-AuditAndGetLiveRun([string]$Gh) {
  Write-Step 'Disparando auditor de credenciais'
  $started = [DateTime]::UtcNow
  & $Gh workflow run backend-secret-presence.yml --repo $Repo --ref main
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao disparar Backend Secret Presence Audit.' }
  $auditId = Get-NewRunId $Gh 'backend-secret-presence.yml' $started 600
  [void](Watch-Run $Gh $auditId 'Backend Secret Presence Audit')

  Write-Step 'Aguardando Backend Live'
  return (Get-NewRunId $Gh 'live-backend-e2e.yml' $started 600)
}

function Complete-LiveBackend([string]$Gh) {
  $liveId = Start-AuditAndGetLiveRun $Gh
  $liveOk = Watch-Run $Gh $liveId 'Live Backend Cloudflare + MongoDB E2E' -AllowFailure
  if ($liveOk) { return $liveId }

  $live = Get-RunEvidenceJson $Gh $liveId 'LIVE-BACKEND.json'
  $preflight = Get-RunEvidenceJson $Gh $liveId 'MONGODB-PREFLIGHT.json'
  $missingMongo = ($null -ne $live -and [string]$live.status -eq 'BLOCKED_MONGODB_URI_NOT_CONFIGURED') -or
                  ($null -ne $preflight -and [string]$preflight.status -eq 'BLOCKED_MONGODB_URI_NOT_CONFIGURED')
  if (-not $missingMongo) {
    $status = if ($live) { [string]$live.status } else { 'SEM_EVIDENCIA_LIVE' }
    throw "Backend Live falhou por causa diferente de MONGODB_URI ausente. Status: $status. Run $liveId"
  }

  $mongo = $null
  try {
    $mongo = Get-MongoUri
    Set-GhSecret $Gh 'MONGODB_URI' $mongo
    Write-Host 'MONGODB_URI gravada como GitHub Secret.' -ForegroundColor Green
  }
  finally {
    if ($mongo) { $mongo = $null }
    [GC]::Collect()
  }

  Write-Step 'Repetindo backend live com MongoDB configurado'
  $retryId = Start-AuditAndGetLiveRun $Gh
  [void](Watch-Run $Gh $retryId 'Live Backend Cloudflare + MongoDB E2E')
  return $retryId
}

function Complete-LiveConsumers([string]$Gh, [DateTime]$SinceUtc) {
  Write-Step 'Aguardando consumidores live'
  $accountId = Get-NewRunId $Gh 'account-live-e2e.yml' $SinceUtc 900
  $gameplayId = Get-NewRunId $Gh 'browser-gameplay-e2e.yml' $SinceUtc 900

  [void](Watch-Run $Gh $accountId 'Account Live E2E')
  [void](Watch-Run $Gh $gameplayId 'Browser Gameplay E2E')
  return @{ Account = $accountId; Gameplay = $gameplayId }
}

function Complete-FinalReadiness([string]$Gh) {
  Write-Step 'Executando orquestracao final'
  $orchestrationStarted = [DateTime]::UtcNow
  & $Gh workflow run final-readiness-orchestration.yml --repo $Repo --ref main
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao disparar Final Readiness Orchestration.' }
  $orchestrationId = Get-NewRunId $Gh 'final-readiness-orchestration.yml' $orchestrationStarted 600
  [void](Watch-Run $Gh $orchestrationId 'Final Readiness Orchestration')

  $finalId = Get-NewRunId $Gh 'final-readiness.yml' $orchestrationStarted 600
  [void](Watch-Run $Gh $finalId 'Final Readiness')

  $report = $null
  for ($i = 0; $i -lt 60 -and -not $report; $i++) {
    $report = Get-RepoJson $Gh 'audit/FINAL-READINESS.json'
    if ($report -and [string]$report.status -eq 'PASS_FINAL_READINESS' -and $report.ok -eq $true) { break }
    $report = $null
    Start-Sleep -Seconds 2
  }
  if (-not $report) { throw 'Final Readiness terminou, mas audit/FINAL-READINESS.json nao confirmou PASS_FINAL_READINESS.' }

  Write-Host 'PASS_FINAL_READINESS confirmado no repositorio.' -ForegroundColor Green
  return $finalId
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
  Write-Host 'GitHub Secrets Cloudflare gravados.' -ForegroundColor Green

  $chainStarted = [DateTime]::UtcNow
  $liveRun = Complete-LiveBackend $gh
  Write-Host "Backend Live PASS. Run $liveRun" -ForegroundColor Green

  $consumers = Complete-LiveConsumers $gh $chainStarted
  Write-Host ("Consumidores Live PASS. Account={0} Gameplay={1}" -f $consumers.Account, $consumers.Gameplay) -ForegroundColor Green

  $finalRun = Complete-FinalReadiness $gh
  Write-Host "Final Readiness PASS. Run $finalRun" -ForegroundColor Green
}
finally {
  if ($token) { $token = $null }
  [GC]::Collect()
}

Write-Host ''
Write-Host 'PASS_FINAL_READINESS' -ForegroundColor Green
