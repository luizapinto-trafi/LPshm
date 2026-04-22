#!/usr/bin/env bash
# Registra la clave del host de GitHub (evita "Host key verification failed") y
# comprueba acceso. Requiere una llave SSH añadida a tu cuenta de GitHub.
set -euo pipefail

KNOWN="$HOME/.ssh/known_hosts"
mkdir -p -m 700 "$HOME/.ssh"
touch "$KNOWN"
chmod 600 "$KNOWN" 2>/dev/null || true

if ! ssh-keygen -F github.com -f "$KNOWN" >/dev/null 2>&1; then
  echo "Añadiendo clave de host de github.com a $KNOWN ..."
  ssh-keyscan -t ed25519 github.com 2>/dev/null >> "$KNOWN"
  echo "Listo."
else
  echo "github.com ya está en known_hosts."
fi

cd "$(dirname "$0")/.."
echo "Remoto actual:"
git remote -v
echo ""
echo "Llaves en el agente (vacío = añade una con ssh-add):"
ssh-add -l 2>/dev/null || true
echo ""
echo "Probando: git fetch origin"
if git fetch origin; then
  echo "OK: conexión con GitHub funcionando."
  exit 0
fi
echo ""
echo "Si viste 'Host key verification failed' antes, vuelve a correr el script: ya añadimos github.com a known_hosts."
echo "Si viste 'Permission denied (publickey)':"
echo "  1) Genera o usa ~/.ssh/id_ed25519  y añade la pública a GitHub → https://github.com/settings/keys"
echo "  2) En macOS:  ssh-add --apple-use-keychain ~/.ssh/id_ed25519"
echo "O usa HTTPS:  git remote set-url origin https://github.com/trafilea/SHMLandingPages.git  y  gh auth login  (o token)"
exit 1
