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

Write-Host '=== Atualizando bootstrap automatico V3 canonico ===' -ForegroundColor Cyan
Invoke-WebRequest -UseBasicParsing -Uri $source -OutFile $target

$tokens = $null
$errors = $null
[void][System.Management.Automation.Language.Parser]::ParseFile($target, [ref]$tokens, [ref]$errors)
if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Error $_.Message }
  throw "Bootstrap V3 canonico invalido: $($errors.Count) erro(s) de PowerShell."
}

$canonical = Get-Content $target -Raw
$required = @(
  "login --device | Out-Host",
  "auth login --force --skipConfig --noBrowser",
  'function Test-AtlasAuthenticated([string]$Atlas)',
  'function Invoke-AtlasCli([string]$Atlas, [string[]]$Arguments, [switch]$AllowFailure)',
  "`$project = @(`$projects | Where-Object { ([string]`$_.name) -eq 'naruto-shinobi-no-sho' }) | Select-Object -First 1",
  "`$cluster = @(`$clusters | Where-Object { ([string]`$_.name) -eq 'shinobi-no-sho' }) | Select-Object -First 1",
  "`$temporaryCloudflareSecretWritten -and `$finalReadinessPassed",
  "Write-Host 'PASS_FINAL_READINESS'"
)
foreach ($needle in $required) {
  if (-not $canonical.Contains($needle)) { throw "Contrato obrigatorio ausente no V3 canonico: $needle" }
}

if ($ValidateHotfix) {
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $target -ValidateRunParsing
  if ($LASTEXITCODE -ne 0) { throw "Fixture de regressao do V3 terminou com exit code $LASTEXITCODE." }
  Write-Host 'PASS_BOOTSTRAP_CANONICAL_V3_READY'
  exit 0
}

# O Atlas CLI portatil pode continuar bloqueado por um processo/auth anterior.
# Nao apagamos essa pasta: se o executavel ja existe, colocamos seu diretorio no PATH
# para o V3 reutiliza-lo em vez de tentar Remove-Item no binario em uso.
$portableAtlasRoot = Join-Path $env:TEMP 'shinobi-atlas-portable'
if (Test-Path $portableAtlasRoot) {
  $portableAtlas = Get-ChildItem $portableAtlasRoot -Recurse -Filter atlas.exe -File -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($portableAtlas) {
    $atlasDir = $portableAtlas.Directory.FullName
    $pathParts = @($env:Path -split ';' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
    if ($pathParts -notcontains $atlasDir) {
      $env:Path = "$atlasDir;$env:Path"
    }
    Write-Host ("Reutilizando MongoDB Atlas CLI portatil existente: {0}" -f $portableAtlas.FullName) -ForegroundColor Green
  }
}

& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $target -Repo $Repo
if ($LASTEXITCODE -ne 0) { throw "Bootstrap V3 terminou com exit code $LASTEXITCODE." }
