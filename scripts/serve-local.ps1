param(
    [int]$Port = 8000
)

$ErrorActionPreference = 'Stop'

if ($Port -lt 1 -or $Port -gt 65535) {
    throw 'Port must be between 1 and 65535.'
}

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Url = "http://127.0.0.1:$Port/"

Write-Host "Serving workshop from $Root"
Write-Host "Open $Url"
Write-Host "Press Ctrl+C to stop."

$Python = Get-Command python -ErrorAction SilentlyContinue
if ($Python) {
    & $Python.Source -m http.server $Port --bind 127.0.0.1 --directory $Root
    exit $LASTEXITCODE
}

$PyLauncher = Get-Command py -ErrorAction SilentlyContinue
if ($PyLauncher) {
    & $PyLauncher.Source -3 -m http.server $Port --bind 127.0.0.1 --directory $Root
    exit $LASTEXITCODE
}

throw 'Python was not found. Install Python 3, then run this script again.'
