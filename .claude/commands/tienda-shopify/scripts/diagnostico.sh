#!/bin/bash
# Diagnóstico del entorno para la skill tienda-shopify (Mac/Linux)
# Salida pensada para que la lea Claude, no el usuario.
# Uso: bash diagnostico.sh

export PATH="$HOME/.npm-global/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

echo "=== DIAGNOSTICO ENTORNO ($(uname -s)) ==="
sw_vers 2>/dev/null | head -2

check() {
  local name="$1" cmd="$2" args="$3"
  if command -v "$cmd" >/dev/null 2>&1; then
    local ver
    ver=$("$cmd" $args 2>/dev/null | head -1)
    echo "$name: OK - $ver ($(command -v "$cmd"))"
  else
    echo "$name: FALTA"
  fi
}

check "node" "node" "-v"
check "npm" "npm" "-v"
check "shopify-cli" "shopify" "version"
check "brew" "brew" "--version"

# Sesión de Shopify (heurística)
if [ -d "$HOME/.config/shopify" ] || [ -d "$HOME/Library/Application Support/shopify" ]; then
  echo "sesion-shopify: posible sesion previa (verificar con 'shopify theme list --store X')"
else
  echo "sesion-shopify: sin rastro de sesion previa"
fi

# Proyectos existentes
if [ -d "$HOME/tiendas" ]; then
  echo "proyectos-en-tiendas: $(ls -1 "$HOME/tiendas" 2>/dev/null | tr '\n' ', ')"
else
  echo "proyectos-en-tiendas: carpeta no existe"
fi

echo "=== FIN DIAGNOSTICO ==="
