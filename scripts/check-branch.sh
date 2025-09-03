#!/usr/bin/env bash

branch_name="$(git rev-parse --abbrev-ref HEAD)"
pattern='^[a-z0-9._-]+/feat/[a-z0-9._-]+$'

if [[ ! "$branch_name" =~ $pattern ]]; then
  echo "❌ Nome de branch inválido!"
  echo "   Use: <criador>/feat/(oque-foi-feito) — apenas minúsculas, números, ponto, underline ou hífen."
  echo "   Ex.: pedro/feat/ajuste-layout-inicial"
  echo "   Ex.: maria/feat/nova-tela-login"
  exit 1
fi

echo "✅ Nome de branch válido!"
