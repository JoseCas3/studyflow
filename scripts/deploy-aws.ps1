param(
    [string]$Profile = 'studyflow',
    [string]$Region = 'us-east-2',
    [string]$FunctionName = 'studyflow-web',
    [switch]$Create
)
$ErrorActionPreference = 'Stop'
$projectPath = Split-Path $PSScriptRoot -Parent
$artifactPath = Join-Path ([IO.Path]::GetTempPath()) ('studyflow-aws-' + [guid]::NewGuid())
$awsCommand = Get-Command aws -ErrorAction SilentlyContinue
if ($awsCommand) { $awsPath = $awsCommand.Source }
else { $awsPath = Join-Path $env:LOCALAPPDATA 'Programs\Amazon\AWSCLIV2\aws.exe' }
if (-not (Test-Path -LiteralPath $awsPath)) { throw 'Instala AWS CLI v2 e inicia sesión antes de desplegar.' }
Push-Location $projectPath
try {
    docker build --platform linux/arm64 -f Dockerfile.aws --output "type=local,dest=$artifactPath" .
    if ($LASTEXITCODE -ne 0) { throw 'Falló la compilación Linux arm64.' }
    $deployArgs = @('lambda-web','deploy','--name',$FunctionName,'--code',$artifactPath,
        '--profile',$Profile,'--region',$Region,'--endpoint-type','HomeRegion',
        '--auth-type','ApplicationManaged','--endpoint-name','public',
        '--max-environments','2','--rate-limit','100','--timeout-seconds','30',
        '--include-hidden-files','--env','NODE_ENV=production',
        '--env','NEXT_TELEMETRY_DISABLED=1','--output','json')
    if ($Create) { $deployArgs += '--create' }
    & $awsPath @deployArgs
    if ($LASTEXITCODE -ne 0) { throw 'AWS no completó el despliegue.' }
} finally { Pop-Location }
