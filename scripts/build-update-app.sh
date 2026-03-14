#!/bin/zsh

set -euo pipefail

REPO_DIR="/Users/superone77/Code/knowledge_base_deployment"
SOURCE_FILE="${REPO_DIR}/app/Vinci Knowledge Base Update.applescript"
OUTPUT_APP="${REPO_DIR}/Vinci Knowledge Base Update.app"

if [[ ! -f "${SOURCE_FILE}" ]]; then
  echo "AppleScript source not found: ${SOURCE_FILE}" >&2
  exit 1
fi

rm -rf "${OUTPUT_APP}"
osacompile -o "${OUTPUT_APP}" "${SOURCE_FILE}"

echo "Built ${OUTPUT_APP}"
