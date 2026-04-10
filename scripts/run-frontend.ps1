$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Resolve-Path (Join-Path $scriptRoot "..")
$frontendRoot = Join-Path $repoRoot "frontend"

Push-Location $frontendRoot
try {
    npm install
    npm run dev
}
finally {
    Pop-Location
}
