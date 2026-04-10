# restart-api.ps1 (chạy trong d:\NhaXeKimHoang\SuorceCode\api)
$ErrorActionPreference = "Stop"

$projectPath = "src/BusOperator.Api/BusOperator.Api.csproj"
$processName = "BusOperator.Api"

# kill instance cũ nếu có
Get-Process -Name $processName -ErrorAction SilentlyContinue | Stop-Process -Force

# build 1 lần
dotnet build $projectPath --no-restore

# run không build lại để tránh kẹt ở "Building"
dotnet run --no-build --project $projectPath
