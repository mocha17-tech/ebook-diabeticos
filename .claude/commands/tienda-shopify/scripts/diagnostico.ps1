# Diagnóstico del entorno para la skill tienda-shopify (Windows)
# Salida pensada para que la lea Claude, no el usuario.
# Uso: powershell -ExecutionPolicy Bypass -File diagnostico.ps1

$ErrorActionPreference = "SilentlyContinue"

# Refrescar PATH de la sesión por si acaban de instalarse cosas
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

function Check($name, $cmd, $args) {
    $found = Get-Command $cmd -ErrorAction SilentlyContinue
    if ($found) {
        $ver = & $cmd $args 2>$null | Select-Object -First 1
        Write-Output ("{0}: OK - {1} ({2})" -f $name, $ver, $found.Source)
        return $true
    } else {
        Write-Output ("{0}: FALTA" -f $name)
        return $false
    }
}

Write-Output "=== DIAGNOSTICO ENTORNO (Windows) ==="
Write-Output ("SO: " + [System.Environment]::OSVersion.VersionString)

$node = Check "node" "node" "-v"
$npm  = Check "npm" "npm" "-v"
$cli  = Check "shopify-cli" "shopify" "version"

# winget disponible (para saber qué método de instalación usar)
if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Output "winget: OK"
} else {
    Write-Output "winget: FALTA (usar instalador MSI)"
}

# Rutas directas por si el PATH está roto pero el programa existe
if (-not $node) {
    if (Test-Path "C:\Program Files\nodejs\node.exe") {
        Write-Output "node-instalado-pero-fuera-de-PATH: C:\Program Files\nodejs\node.exe"
    }
}

# Sesión de Shopify iniciada (heurística: existe config del CLI)
$shopifyCfg = Join-Path $env:APPDATA "shopify"
$shopifyCfg2 = Join-Path $env:LOCALAPPDATA "shopify"
if ((Test-Path $shopifyCfg) -or (Test-Path $shopifyCfg2)) {
    Write-Output "sesion-shopify: posible sesion previa (verificar con 'shopify theme list --store X')"
} else {
    Write-Output "sesion-shopify: sin rastro de sesion previa"
}

# Proyectos existentes
if (Test-Path "C:\tiendas") {
    $proyectos = Get-ChildItem "C:\tiendas" -Directory | ForEach-Object { $_.Name }
    Write-Output ("proyectos-en-C-tiendas: " + ($proyectos -join ", "))
} else {
    Write-Output "proyectos-en-C-tiendas: carpeta no existe"
}

Write-Output "=== FIN DIAGNOSTICO ==="
