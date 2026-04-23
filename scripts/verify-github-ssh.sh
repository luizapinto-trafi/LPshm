#!/usr/bin/env bash
# Comprueba acceso a GitHub según el remoto:
# - HTTPS: opcionalmente enlaza Git con GitHub CLI (gh auth setup-git).
# - SSH: asegura github.com en known_hosts y muestra llaves en el agente.
set -euo pipefail

cd "$(dirname "$0")/.."
echo "Remoto actual:"
git remote -v
echo ""

ORIGIN_URL="$(git config --get remote.origin.url || true)"
USE_SSH=0
case "$ORIGIN_URL" in
  git@github.com:*|ssh://git@github.com/*) USE_SSH=1 ;;
esac

if [[ "$USE_SSH" -eq 1 ]]; then
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
  echo ""
  echo "Llaves en el agente (vacío = añade una con ssh-add):"
  ssh-add -l 2>/dev/null || true
else
  if command -v gh >/dev/null 2>&1; then
    echo "Remoto HTTPS: enlazando credenciales de Git con GitHub CLI..."
    gh auth setup-git
    echo ""
    gh auth status 2>/dev/null || true
  else
    echo "Remoto HTTPS: no se encontró gh en PATH."
    echo "  Instala GitHub CLI (https://cli.github.com/) y ejecuta: gh auth login && gh auth setup-git"
  fi
fi

echo ""
echo "Probando: git fetch origin"
if git fetch origin; then
  echo "OK: conexión con GitHub funcionando."
  exit 0
fi
echo ""
if [[ "$USE_SSH" -eq 1 ]]; then
  echo "Si viste 'Host key verification failed', vuelve a correr el script."
  echo "Si viste 'Permission denied (publickey)':"
  echo "  1) Añade tu clave pública en https://github.com/settings/keys"
  echo "  2) macOS: ssh-add --apple-use-keychain ~/.ssh/id_ed25519"
else
  echo "Si viste 'Repository not found' con HTTPS: inicia sesión y enlaza Git con gh:"
  echo "  gh auth login"
  echo "  gh auth setup-git"
  echo "Comprueba que tu cuenta tenga acceso al repo trafilea/SHMLandingPages."
fi
exit 1
