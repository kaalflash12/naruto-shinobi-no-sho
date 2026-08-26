param(
  [string]$Repo = 'kaalflash12/naruto-shinobi-no-sho',
  [string]$PreferredCloudflareAccountId = '2a0d551fcc5064ae91aed8b42513f3a'
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
  if (-not $asset) { throw 'Nao foi possivel localizar GitHub CLI Windows amd64.' }
  $zip = Join-Path $root 'gh.zip'
  Invoke-WebRequest -Headers $headers -Uri $asset.browser_download_url -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $root -Force
  $gh = Get-ChildItem $root -Recurse -Filter gh.exe | Select-Object -First 1
  if (-not $gh) { throw 'gh.exe nao encontrado.' }
  return $gh.FullName
}

function Ensure-GhLogin([string]$Gh) {
  Write-Step 'Validando login GitHub'
  & $Gh auth status --hostname github.com *> $null
  if ($LASTEXITCODE -eq 0) {
    Write-Host 'GitHub autenticado.' -ForegroundColor Green
    return
  }
  Write-Host 'Abrindo autorizacao GitHub no navegador...' -ForegroundColor Yellow
  & $Gh auth login --hostname github.com --git-protocol https --web
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao autenticar GitHub CLI.' }
}

function Set-GhSecret([string]$Gh, [string]$Name, [string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) { throw "Valor vazio para GitHub Secret $Name." }
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
  if ($p.ExitCode -ne 0) { throw "Falha ao gravar GitHub Secret $Name. $stderr $stdout" }
}

function Remove-GhSecret([string]$Gh, [string]$Name) {
  & $Gh secret delete $Name --repo $Repo *> $null
}

function Get-NpxExecutable {
  $existing = Get-Command npx.cmd -ErrorAction SilentlyContinue
  if (-not $existing) { $existing = Get-Command npx -ErrorAction SilentlyContinue }
  if ($existing) { return $existing.Source }

  Write-Step 'Baixando Node.js LTS portatil'
  $root = Join-Path $env:TEMP 'shinobi-node-portable'
  if (Test-Path $root) { Remove-Item $root -Recurse -Force }
  New-Item -ItemType Directory -Path $root -Force | Out-Null
  $index = Invoke-RestMethod -Uri 'https://nodejs.org/dist/index.json'
  $release = @($index | Where-Object { $_.version -like 'v24.*' -and $_.lts -and ($_.files -contains 'win-x64-zip') }) | Select-Object -First 1
  if (-not $release) { throw 'Node.js v24 LTS Windows x64 nao localizado.' }
  $base = "https://nodejs.org/dist/$($release.version)"
  $zipName = "node-$($release.version)-win-x64.zip"
  $zip = Join-Path $root $zipName
  $sums = Invoke-WebRequest -UseBasicParsing -Uri "$base/SHASUMS256.txt"
  $expectedLine = @($sums.Content -split "`n" | Where-Object { $_ -match [regex]::Escape($zipName) }) | Select-Object -First 1
  if (-not $expectedLine) { throw 'SHA256 oficial do Node.js nao localizado.' }
  $expected = (($expectedLine -split '\s+')[0]).Trim().ToLowerInvariant()
  Invoke-WebRequest -Uri "$base/$zipName" -OutFile $zip
  $actual = (Get-FileHash -Algorithm SHA256 -Path $zip).Hash.ToLowerInvariant()
  if ($actual -ne $expected) { throw 'SHA256 do Node.js portatil nao confere.' }
  Expand-Archive -Path $zip -DestinationPath $root -Force
  $npx = Get-ChildItem $root -Recurse -Filter npx.cmd | Select-Object -First 1
  if (-not $npx) { throw 'npx.cmd nao encontrado.' }
  return $npx.FullName
}

function Clear-CloudflareEnvironment {
  foreach ($name in @('CLOUDFLARE_API_TOKEN','CLOUDFLARE_API_KEY','CLOUDFLARE_EMAIL','CLOUDFLARE_ACCOUNT_ID','CF_API_TOKEN','CF_API_KEY','CF_EMAIL','CF_ACCOUNT_ID')) {
    Remove-Item "Env:$name" -ErrorAction SilentlyContinue
  }
  $env:WRANGLER_SEND_METRICS = 'false'
}

function Get-CloudflareOAuth([string]$Npx) {
  Clear-CloudflareEnvironment
  Write-Step 'Autorizando Cloudflare sem copiar token'
  & $Npx --yes 'wrangler@4.119.0' whoami *> $null
  if ($LASTEXITCODE -ne 0) {
    Write-Host 'O navegador vai abrir com o codigo ja preenchido. Apenas aprove a autorizacao Cloudflare.' -ForegroundColor Yellow
    & $Npx --yes 'wrangler@4.119.0' login --device
    if ($LASTEXITCODE -ne 0) { throw 'OAuth Cloudflare via Wrangler falhou.' }
  }

  $raw = (& $Npx --yes 'wrangler@4.119.0' auth token --json 2>$null | Out-String).Trim()
  if ([string]::IsNullOrWhiteSpace($raw)) { throw 'Wrangler nao retornou credencial ativa.' }
  try { $auth = $raw | ConvertFrom-Json } catch { throw 'Resposta de wrangler auth token --json invalida.' }
  if ([string]$auth.type -eq 'api_key') { throw 'Autenticacao antiga API key/email nao e aceita por este bootstrap.' }
  $token = [string]$auth.token
  if ([string]::IsNullOrWhiteSpace($token)) { throw 'Wrangler nao retornou bearer token.' }
  return @{ Token = $token.Trim(); Type = [string]$auth.type }
}

function Get-CloudflareAccounts([string]$Token) {
  $headers = @{ Authorization = "Bearer $Token"; 'Content-Type' = 'application/json' }
  $response = Invoke-RestMethod -Method Get -Headers $headers -Uri 'https://api.cloudflare.com/client/v4/accounts?per_page=50'
  if ($response.success -ne $true) { throw 'Cloudflare recusou a credencial OAuth/API token.' }
  $accounts = @($response.result)
  if ($accounts.Count -eq 0) { throw 'Nenhuma conta Cloudflare acessivel.' }
  return $accounts
}

function Resolve-CloudflareAccount([string]$Token, [string]$PreferredId) {
  Write-Step 'Detectando conta Cloudflare automaticamente'
  $accounts = @(Get-CloudflareAccounts $Token)
  if (-not [string]::IsNullOrWhiteSpace($PreferredId)) {
    $preferred = @($accounts | Where-Object { [string]$_.id -eq $PreferredId }) | Select-Object -First 1
    if ($preferred) {
      Write-Host ("Conta Cloudflare selecionada automaticamente: {0}" -f $preferred.name) -ForegroundColor Green
      return [string]$preferred.id
    }
  }
  if ($accounts.Count -eq 1) { return [string]$accounts[0].id }

  $headers = @{ Authorization = "Bearer $Token"; 'Content-Type' = 'application/json' }
  $matches = @()
  foreach ($account in $accounts) {
    try {
      $uri = "https://api.cloudflare.com/client/v4/accounts/$($account.id)/workers/scripts/naruto-shinobi-no-sho-api"
      $r = Invoke-WebRequest -UseBasicParsing -Method Get -Headers $headers -Uri $uri -ErrorAction Stop
      if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 300) { $matches += $account }
    } catch { }
  }
  if ($matches.Count -eq 1) { return [string]$matches[0].id }
  $chosen = @($accounts | Sort-Object { [string]$_.id }) | Select-Object -First 1
  Write-Host ("Conta Cloudflare escolhida sem prompt: {0}" -f $chosen.name) -ForegroundColor Yellow
  return [string]$chosen.id
}

function Get-AtlasExecutable {
  $existing = Get-Command atlas.exe -ErrorAction SilentlyContinue
  if (-not $existing) { $existing = Get-Command atlas -ErrorAction SilentlyContinue }
  if ($existing) { return $existing.Source }

  Write-Step 'Baixando MongoDB Atlas CLI portatil'
  $root = Join-Path $env:TEMP 'shinobi-atlas-portable'
  if (Test-Path $root) { Remove-Item $root -Recurse -Force }
  New-Item -ItemType Directory -Path $root -Force | Out-Null
  $headers = @{ 'User-Agent' = 'naruto-shinobi-no-sho-bootstrap' }
  $release = Invoke-RestMethod -Headers $headers -Uri 'https://api.github.com/repos/mongodb/mongodb-atlas-cli/releases/latest'
  $asset = @($release.assets | Where-Object { $_.name -match '^mongodb-atlas-cli_.*_windows_x86_64\.zip$' }) | Select-Object -First 1
  if (-not $asset) { throw 'Atlas CLI Windows x86_64 nao localizado.' }
  $zip = Join-Path $root $asset.name
  Invoke-WebRequest -Headers $headers -Uri $asset.browser_download_url -OutFile $zip
  if ([string]$asset.digest -match '^sha256:([a-fA-F0-9]{64})$') {
    $expected = $Matches[1].ToLowerInvariant()
    $actual = (Get-FileHash -Algorithm SHA256 -Path $zip).Hash.ToLowerInvariant()
    if ($actual -ne $expected) { throw 'SHA256 do Atlas CLI nao confere.' }
  }
  Expand-Archive -Path $zip -DestinationPath $root -Force
  $atlas = Get-ChildItem $root -Recurse -Filter atlas.exe | Select-Object -First 1
  if (-not $atlas) { throw 'atlas.exe nao encontrado.' }
  return $atlas.FullName
}

function Ensure-AtlasLoginZeroPaste([string]$Atlas) {
  & $Atlas auth whoami *> $null
  if ($LASTEXITCODE -eq 0) { return }

  Write-Step 'Autorizando MongoDB Atlas sem copiar codigo no PowerShell'
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $Atlas
  $psi.Arguments = 'auth login --force --skipConfig --noBrowser'
  $psi.UseShellExecute = $false
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.CreateNoWindow = $true
  $p = New-Object System.Diagnostics.Process
  $p.StartInfo = $psi
  [void]$p.Start()

  $code = $null
  $uri = $null
  $lines = New-Object System.Collections.Generic.List[string]
  while (-not $p.HasExited -and (-not $code -or -not $uri)) {
    $line = $p.StandardOutput.ReadLine()
    if ($null -eq $line) { Start-Sleep -Milliseconds 100; continue }
    [void]$lines.Add($line)
    Write-Host $line
    if (-not $code -and $line -match '^\s*([A-Za-z0-9]{4,8}-[A-Za-z0-9]{4,8})\s*$') { $code = $Matches[1] }
    if (-not $uri -and $line -match '(https://[^\s]+)') { $uri = $Matches[1].Trim() }
  }
  if ($code -and $uri) {
    $separator = if ($uri.Contains('?')) { '&' } else { '?' }
    $complete = $uri + $separator + 'user_code=' + [Uri]::EscapeDataString($code) + '&code=' + [Uri]::EscapeDataString($code)
    Write-Host 'Abrindo autorizacao Atlas com o codigo ja anexado ao link...' -ForegroundColor Yellow
    Start-Process $complete
  }
  $tail = $p.StandardOutput.ReadToEnd()
  if ($tail) { Write-Host $tail }
  $stderr = $p.StandardError.ReadToEnd()
  $p.WaitForExit()
  if ($p.ExitCode -ne 0) { throw "Autorizacao MongoDB Atlas falhou. $stderr" }
  & $Atlas auth whoami *> $null
  if ($LASTEXITCODE -ne 0) { throw 'MongoDB Atlas CLI nao ficou autenticado.' }
}

function New-RandomHex([int]$Bytes = 24) {
  $buffer = New-Object byte[] $Bytes
  [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($buffer)
  return ([BitConverter]::ToString($buffer) -replace '-', '').ToLowerInvariant()
}

function Get-JsonRows($Object) {
  if ($null -eq $Object) { return @() }
  if ($Object.PSObject.Properties.Name -contains 'results') { return @($Object.results) }
  if ($Object -is [System.Array]) { return @($Object) }
  return @($Object)
}

function Get-MongoUriAutomatic {
  if (-not [string]::IsNullOrWhiteSpace($env:MONGODB_URI)) { return $env:MONGODB_URI.Trim() }
  $atlas = Get-AtlasExecutable
  Ensure-AtlasLoginZeroPaste $atlas

  Write-Step 'Provisionando/reutilizando MongoDB Atlas automaticamente'
  $projectsRaw = (& $atlas projects list --limit 500 --output json 2>$null | Out-String)
  $projects = @(Get-JsonRows ($projectsRaw | ConvertFrom-Json))
  $project = @($projects | Where-Object { ([string]$_.name) -match '(?i)(naruto|shinobi)' }) | Select-Object -First 1
  if (-not $project) { $project = $projects | Select-Object -First 1 }

  if (-not $project) {
    $orgRaw = (& $atlas organizations list --limit 500 --output json 2>$null | Out-String)
    $orgs = @(Get-JsonRows ($orgRaw | ConvertFrom-Json))
    $org = $orgs | Select-Object -First 1
    if (-not $org) { throw 'Atlas autenticado, mas nenhuma organizacao foi encontrada.' }
    $createdRaw = (& $atlas projects create 'naruto-shinobi-no-sho' --orgId ([string]$org.id) --output json 2>$null | Out-String)
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar projeto MongoDB Atlas.' }
    $project = $createdRaw | ConvertFrom-Json
  }
  $projectId = [string]$project.id
  if ([string]::IsNullOrWhiteSpace($projectId)) { throw 'Project ID do Atlas vazio.' }

  $clustersRaw = (& $atlas clusters list --projectId $projectId --limit 500 --output json 2>$null | Out-String)
  $clusters = @(Get-JsonRows ($clustersRaw | ConvertFrom-Json))
  $cluster = @($clusters | Where-Object { ([string]$_.name) -match '(?i)(naruto|shinobi)' }) | Select-Object -First 1
  if (-not $cluster) { $cluster = $clusters | Select-Object -First 1 }

  $username = 'shinobi_game'
  $password = New-RandomHex 24
  if (-not $cluster) {
    $clusterName = 'shinobi-no-sho'
    & $atlas setup --projectId $projectId --clusterName $clusterName --provider AWS --region US_EAST_1 --tier M0 --username $username --password $password --accessListIp '0.0.0.0/0' --skipSampleData --connectWith skip --force
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar cluster M0 gratuito no MongoDB Atlas.' }
  } else {
    $clusterName = [string]$cluster.name
    & $atlas accessLists create '0.0.0.0/0' --type cidrBlock --projectId $projectId --comment 'Cloudflare Workers - Naruto Shinobi no Sho' *> $null
    & $atlas dbusers update $username --password $password --projectId $projectId *> $null
    if ($LASTEXITCODE -ne 0) {
      & $atlas dbusers create readWriteAnyDatabase --username $username --password $password --projectId $projectId *> $null
      if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar usuario do banco MongoDB Atlas.' }
    }
  }

  $deadline = [DateTime]::UtcNow.AddMinutes(15)
  do {
    $descRaw = (& $atlas clusters describe $clusterName --projectId $projectId --output json 2>$null | Out-String)
    if ($LASTEXITCODE -eq 0 -and $descRaw) {
      $desc = $descRaw | ConvertFrom-Json
      $state = [string]$desc.stateName
      if ($state -eq 'IDLE') { break }
    }
    Start-Sleep -Seconds 10
  } while ([DateTime]::UtcNow -lt $deadline)

  $connRaw = (& $atlas clusters connectionStrings describe $clusterName --projectId $projectId --output json 2>$null | Out-String)
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao obter connection string MongoDB Atlas.' }
  $match = [regex]::Match($connRaw, 'mongodb\+srv://[^"\s]+')
  if (-not $match.Success) { throw 'Connection string SRV nao encontrada.' }
  $srv = $match.Value
  $rest = $srv -replace '^mongodb\+srv://([^@/]+@)?', ''
  $rest = $rest -replace '/.*$', ''
  $userEsc = [Uri]::EscapeDataString($username)
  $passEsc = [Uri]::EscapeDataString($password)
  $mongo = "mongodb+srv://$userEsc`:$passEsc@$rest/naruto_shinobi_no_sho?retryWrites=true&w=majority"
  $password = $null
  return $mongo
}

function Get-NewRunId([string]$Gh, [string]$Workflow, [DateTime]$SinceUtc, [int]$WaitSeconds = 600) {
  $deadline = [DateTime]::UtcNow.AddSeconds($WaitSeconds)
  while ([DateTime]::UtcNow -lt $deadline) {
    $json = & $Gh run list --repo $Repo --workflow $Workflow --limit 30 --json databaseId,createdAt,status,conclusion,event 2>$null
    if ($LASTEXITCODE -eq 0 -and $json) {
      $runs = @($json | ConvertFrom-Json)
      $candidate = $runs | Where-Object { ([DateTime]$_.createdAt).ToUniversalTime() -ge $SinceUtc.AddSeconds(-5) } | Sort-Object { [DateTime]$_.createdAt } -Descending | Select-Object -First 1
      if ($candidate) { return [long]$candidate.databaseId }
    }
    Start-Sleep -Seconds 2
  }
  throw "Workflow $Workflow nao apareceu em $WaitSeconds segundos."
}

function Watch-Run([string]$Gh, [long]$RunId, [string]$Label, [switch]$AllowFailure) {
  Write-Host "$Label run: $RunId" -ForegroundColor Green
  & $Gh run watch $RunId --repo $Repo --exit-status
  $ok = ($LASTEXITCODE -eq 0)
  if (-not $ok -and -not $AllowFailure) { throw "$Label falhou. Run $RunId" }
  return $ok
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
  } finally {
    if (Test-Path $root) { Remove-Item $root -Recurse -Force -ErrorAction SilentlyContinue }
  }
}

function Get-RepoJson([string]$Gh, [string]$Path) {
  $raw = & $Gh api "repos/$Repo/contents/$Path`?ref=main" 2>$null
  if ($LASTEXITCODE -ne 0 -or -not $raw) { return $null }
  $meta = $raw | ConvertFrom-Json
  if (-not $meta.content) { return $null }
  $bytes = [Convert]::FromBase64String(([string]$meta.content -replace '\s', ''))
  return ([Text.Encoding]::UTF8.GetString($bytes) | ConvertFrom-Json)
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
  $missingMongo = ($null -ne $live -and [string]$live.status -eq 'BLOCKED_MONGODB_URI_NOT_CONFIGURED') -or ($null -ne $preflight -and [string]$preflight.status -eq 'BLOCKED_MONGODB_URI_NOT_CONFIGURED')
  if (-not $missingMongo) {
    $status = if ($live) { [string]$live.status } else { 'SEM_EVIDENCIA_LIVE' }
    throw "Backend Live falhou por causa diferente de MongoDB ausente. Status: $status. Run $liveId"
  }

  $mongo = $null
  try {
    $mongo = Get-MongoUriAutomatic
    Set-GhSecret $Gh 'MONGODB_URI' $mongo
    Write-Host 'MONGODB_URI provisionada automaticamente e gravada como GitHub Secret.' -ForegroundColor Green
  } finally {
    $mongo = $null
    [GC]::Collect()
  }

  Write-Step 'Repetindo backend live com MongoDB configurado'
  $retryId = Start-AuditAndGetLiveRun $Gh
  [void](Watch-Run $Gh $retryId 'Live Backend Cloudflare + MongoDB E2E')
  return $retryId
}

function Complete-LiveConsumers([string]$Gh, [DateTime]$SinceUtc) {
  Write-Step 'Aguardando consumidores live'
  $accountId = Get-NewRunId $Gh 'account-live-e2e.yml' $SinceUtc 1200
  $gameplayId = Get-NewRunId $Gh 'browser-gameplay-e2e.yml' $SinceUtc 1200
  [void](Watch-Run $Gh $accountId 'Account Live E2E')
  [void](Watch-Run $Gh $gameplayId 'Browser Gameplay E2E')
  return @{ Account = $accountId; Gameplay = $gameplayId }
}

function Complete-FinalReadiness([string]$Gh) {
  Write-Step 'Executando orquestracao final'
  $started = [DateTime]::UtcNow
  & $Gh workflow run final-readiness-orchestration.yml --repo $Repo --ref main
  if ($LASTEXITCODE -ne 0) { throw 'Falha ao disparar Final Readiness Orchestration.' }
  $orchestrationId = Get-NewRunId $Gh 'final-readiness-orchestration.yml' $started 600
  [void](Watch-Run $Gh $orchestrationId 'Final Readiness Orchestration')
  $finalId = Get-NewRunId $Gh 'final-readiness.yml' $started 600
  [void](Watch-Run $Gh $finalId 'Final Readiness')

  $report = $null
  for ($i = 0; $i -lt 90 -and -not $report; $i++) {
    $candidate = Get-RepoJson $Gh 'audit/FINAL-READINESS.json'
    if ($candidate -and [string]$candidate.status -eq 'PASS_FINAL_READINESS' -and $candidate.ok -eq $true) { $report = $candidate; break }
    Start-Sleep -Seconds 2
  }
  if (-not $report) { throw 'FINAL-READINESS.json nao confirmou PASS_FINAL_READINESS.' }
  Write-Host 'PASS_FINAL_READINESS confirmado no repositorio.' -ForegroundColor Green
  return $finalId
}

$gh = Get-GhExecutable
Ensure-GhLogin $gh
$npx = Get-NpxExecutable
$cloudflare = $null
$temporaryCloudflareSecretWritten = $false
try {
  $cloudflare = Get-CloudflareOAuth $npx
  $accountId = Resolve-CloudflareAccount ([string]$cloudflare.Token) $PreferredCloudflareAccountId

  Write-Step 'Gravando credencial Cloudflare temporaria no GitHub'
  Set-GhSecret $gh 'CLOUDFLARE_API_TOKEN' ([string]$cloudflare.Token)
  $temporaryCloudflareSecretWritten = $true
  Set-GhSecret $gh 'CLOUDFLARE_ACCOUNT_ID' $accountId
  Write-Host ("Cloudflare autenticada automaticamente via {0}." -f $cloudflare.Type) -ForegroundColor Green

  $chainStarted = [DateTime]::UtcNow
  $liveRun = Complete-LiveBackend $gh
  Write-Host "Backend Live PASS. Run $liveRun" -ForegroundColor Green
  $consumers = Complete-LiveConsumers $gh $chainStarted
  Write-Host ("Consumidores Live PASS. Account={0} Gameplay={1}" -f $consumers.Account, $consumers.Gameplay) -ForegroundColor Green
  $finalRun = Complete-FinalReadiness $gh
  Write-Host "Final Readiness PASS. Run $finalRun" -ForegroundColor Green
} finally {
  if ($temporaryCloudflareSecretWritten) {
    Write-Step 'Removendo bearer OAuth temporario do GitHub'
    try { Remove-GhSecret $gh 'CLOUDFLARE_API_TOKEN' } catch { Write-Host 'Nao foi possivel remover automaticamente o bearer temporario.' -ForegroundColor Yellow }
  }
  $cloudflare = $null
  [GC]::Collect()
}

Write-Host ''
Write-Host 'PASS_FINAL_READINESS' -ForegroundColor Green
