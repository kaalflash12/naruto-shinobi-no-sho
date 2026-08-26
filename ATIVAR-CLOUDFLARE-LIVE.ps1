param(
  [string]$Repo = 'kaalflash12/naruto-shinobi-no-sho'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$source = 'https://raw.githubusercontent.com/kaalflash12/naruto-shinobi-no-sho/main/tools/ATIVAR-CLOUDFLARE-LIVE-V3.ps1'
$target = Join-Path $env:TEMP 'ATIVAR-CLOUDFLARE-LIVE-V3.ps1'

Write-Host '=== Atualizando bootstrap automatico V3 ===' -ForegroundColor Cyan
Invoke-WebRequest -UseBasicParsing -Uri $source -OutFile $target

$tokens = $null
$errors = $null
[void][System.Management.Automation.Language.Parser]::ParseFile($target, [ref]$tokens, [ref]$errors)
if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Error $_.Message }
  throw "Bootstrap V3 invalido: $($errors.Count) erro(s) de PowerShell."
}

& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $target -Repo $Repo
if ($LASTEXITCODE -ne 0) { throw "Bootstrap V3 terminou com exit code $LASTEXITCODE." }
