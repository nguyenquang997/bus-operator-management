$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptRoot "..")
$backendRoot = Join-Path $repoRoot "backend"
$infraProject = Join-Path $backendRoot "src/BusOperator.Infrastructure/BusOperator.Infrastructure.csproj"
$startupProject = Join-Path $backendRoot "src/BusOperator.Api/BusOperator.Api.csproj"
$toolPath = Join-Path $repoRoot ".tools"
$efTool = Join-Path $toolPath "dotnet-ef.exe"

Push-Location $backendRoot
try {
    dotnet restore

    if (-not (Test-Path $efTool)) {
        New-Item -ItemType Directory -Force $toolPath | Out-Null
        Write-Host "dotnet-ef not found. Installing local tool to $toolPath..."
        dotnet tool install dotnet-ef --tool-path $toolPath
    }

    & $efTool database update --project $infraProject --startup-project $startupProject
    Write-Host "Database migration applied successfully."
}
finally {
    Pop-Location
}
