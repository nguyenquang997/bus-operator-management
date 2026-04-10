$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendScript = Join-Path $scriptRoot "run-backend.ps1"
$frontendScript = Join-Path $scriptRoot "run-frontend.ps1"

Start-Process powershell -ArgumentList @("-NoExit", "-ExecutionPolicy", "Bypass", "-File", $backendScript)
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList @("-NoExit", "-ExecutionPolicy", "Bypass", "-File", $frontendScript)

Write-Host "Started backend and frontend in separate PowerShell windows."
