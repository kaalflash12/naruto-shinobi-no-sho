param(
  [string]$Repo = 'kaalflash12/naruto-shinobi-no-sho',
  [string]$SourceRef = 'main',
  [switch]$ValidateHotfix
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$source = "https://raw.githubusercontent.com/kaalflash12/naruto-shinobi-no-sho/$SourceRef/tools/ATIVAR-CLOUDFLARE-LIVE-V3.ps1?nocache=$([DateTime]::UtcNow.Ticks)"
$target = Join-Path $env:TEMP 'ATIVAR-CLOUDFLARE-LIVE-V3.ps1'

function Replace-Required([string]$Text, [string]$Old, [string]$New, [string]$Label) {
  if ($Text.Contains($New)) { return $Text }
  if (-not $Text.Contains($Old)) { throw "Hotfix $Label nao encontrou o contrato esperado no V3." }
  return $Text.Replace($Old, $New)
}

Write-Host '=== Atualizando bootstrap automatico V3 ===' -ForegroundColor Cyan
Invoke-WebRequest -UseBasicParsing -Uri $source -OutFile $target
$sourceText = Get-Content $target -Raw

$sourceText = Replace-Required $sourceText "    & `$Npx --yes 'wrangler@4.119.0' login --device" "    & `$Npx --yes 'wrangler@4.119.0' login --device | Out-Host" 'wrangler-login-output'
$sourceText = Replace-Required $sourceText "    & `$atlas setup --projectId `$projectId --clusterName `$clusterName --provider AWS --region US_EAST_1 --tier M0 --username `$username --password `$password --accessListIp '0.0.0.0/0' --skipSampleData --connectWith skip --force" "    & `$atlas setup --projectId `$projectId --clusterName `$clusterName --provider AWS --region US_EAST_1 --tier M0 --username `$username --password `$password --accessListIp '0.0.0.0/0' --skipSampleData --connectWith skip --force *> `$null" 'atlas-setup-output'
$sourceText = Replace-Required $sourceText "  & `$Gh run watch `$RunId --repo `$Repo --exit-status" "  & `$Gh run watch `$RunId --repo `$Repo --exit-status | Out-Host" 'watch-run-scalar-output'
$sourceText = Replace-Required $sourceText "  & `$Gh workflow run backend-secret-presence.yml --repo `$Repo --ref main" "  & `$Gh workflow run backend-secret-presence.yml --repo `$Repo --ref main *> `$null" 'audit-dispatch-scalar-output'
$sourceText = Replace-Required $sourceText "  & `$Gh workflow run final-readiness-orchestration.yml --repo `$Repo --ref main" "  & `$Gh workflow run final-readiness-orchestration.yml --repo `$Repo --ref main *> `$null" 'final-dispatch-scalar-output'
$sourceText = Replace-Required $sourceText "`$temporaryCloudflareSecretWritten = `$false" "`$temporaryCloudflareSecretWritten = `$false`n`$finalReadinessPassed = `$false" 'final-readiness-state'
$sourceText = Replace-Required $sourceText "  `$finalRun = Complete-FinalReadiness `$gh" "  `$finalRun = Complete-FinalReadiness `$gh`n  `$finalReadinessPassed = `$true" 'final-readiness-success-state'
$sourceText = Replace-Required $sourceText "  if (`$temporaryCloudflareSecretWritten) {" "  if (`$temporaryCloudflareSecretWritten -and `$finalReadinessPassed) {" 'credential-retention-on-failure'

Set-Content -Path $target -Value $sourceText -Encoding UTF8

$tokens = $null
$errors = $null
[void][System.Management.Automation.Language.Parser]::ParseFile($target, [ref]$tokens, [ref]$errors)
if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Error $_.Message }
  throw "Bootstrap V3 corrigido invalido: $($errors.Count) erro(s) de PowerShell."
}

if ($ValidateHotfix) {
  $patched = Get-Content $target -Raw
  $required = @(
    "run watch `$RunId --repo `$Repo --exit-status | Out-Host",
    "workflow run backend-secret-presence.yml --repo `$Repo --ref main *> `$null",
    "workflow run final-readiness-orchestration.yml --repo `$Repo --ref main *> `$null",
    "login --device | Out-Host",
    "--connectWith skip --force *> `$null",
    "`$temporaryCloudflareSecretWritten -and `$finalReadinessPassed"
  )
  foreach ($needle in $required) {
    if (-not $patched.Contains($needle)) { throw "Hotfix ausente apos transformacao: $needle" }
  }
  Write-Host 'PASS_BOOTSTRAP_SCALAR_OUTPUT_AND_TOKEN_RETENTION'
  exit 0
}

& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $target -Repo $Repo
if ($LASTEXITCODE -ne 0) { throw "Bootstrap V3 terminou com exit code $LASTEXITCODE." }
