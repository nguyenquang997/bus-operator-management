param(
    [string]$Configuration = "Debug"
)

$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptRoot "..")
$backendRoot = Join-Path $repoRoot "backend"
$apiProject = Join-Path $backendRoot "src/BusOperator.Api/BusOperator.Api.csproj"

Push-Location $backendRoot
try {
    dotnet restore
    dotnet build --configuration $Configuration --no-restore
    dotnet run --project $apiProject --configuration $Configuration --urls "http://localhost:5000"
}
finally {
    Pop-Location
}
