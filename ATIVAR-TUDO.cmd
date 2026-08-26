@echo off
setlocal EnableExtensions DisableDelayedExpansion
title Naruto Shinobi no Sho - Ativacao Live Automatica

if /I "%~1"=="--validate-only" goto :validate

set "SNS_URL=https://raw.githubusercontent.com/kaalflash12/naruto-shinobi-no-sho/main/ATIVAR-CLOUDFLARE-LIVE.ps1"
set "SNS_PS1=%TEMP%\NARUTO-SHINOBI-NO-SHO-ATIVAR-LIVE.ps1"

echo [SNS] Iniciando ativacao live automatica...
echo [SNS] Nenhum token, URI, codigo ou numero de conta precisa ser colado.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing '%SNS_URL%' -OutFile '%SNS_PS1%'; & '%SNS_PS1%'; if ($LASTEXITCODE) { exit $LASTEXITCODE }"
set "SNS_EXIT=%ERRORLEVEL%"

if not "%SNS_EXIT%"=="0" (
  echo.
  echo [SNS] A ativacao terminou com erro %SNS_EXIT%.
  echo [SNS] Esta janela ficara aberta para mostrar o erro real.
  pause
  exit /b %SNS_EXIT%
)

echo.
echo [SNS] Ativacao concluida pelo bootstrap.
exit /b 0

:validate
where powershell.exe >nul 2>nul || exit /b 21
if not defined ComSpec exit /b 22
echo PASS_ONE_CLICK_LIVE_LAUNCHER
exit /b 0
