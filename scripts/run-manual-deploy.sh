#!/bin/zsh

set -euo pipefail

REPO_DIR="/Users/superone77/Code/knowledge_base_deployment"
NODE_BIN="/Users/superone77/.nvm/versions/node/v22.22.0/bin/node"
NPM_BIN="/Users/superone77/.nvm/versions/node/v22.22.0/bin/npm"
LOG_DIR="${HOME}/Library/Logs/vinci-knowledge-base"
LOG_FILE="${LOG_DIR}/manual-deploy.log"
LOCK_DIR="/tmp/vinci-knowledge-base-deploy.lock"

mkdir -p "${LOG_DIR}"

timestamp() {
  date "+%Y-%m-%d %H:%M:%S"
}

log() {
  printf "[%s] %s\n" "$(timestamp)" "$1" | tee -a "${LOG_FILE}"
}

cleanup() {
  rmdir "${LOCK_DIR}" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
  log "Skipped deploy because another deploy is already running."
  echo
  echo "Another deploy is already running. Close this window or try again later."
  exit 0
fi

if [[ ! -x "${NODE_BIN}" ]]; then
  log "Failed: node binary not found at ${NODE_BIN}."
  exit 1
fi

if [[ ! -x "${NPM_BIN}" ]]; then
  log "Failed: npm binary not found at ${NPM_BIN}."
  exit 1
fi

export PATH="/Users/superone77/.nvm/versions/node/v22.22.0/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export SITE_URL="https://superone77.github.io"
export KB_SOURCE_DIR="/Users/superone77/Documents/知识库/projects"

cd "${REPO_DIR}"

log "Starting manual Vinci Knowledge Base deploy."

if ! "${NODE_BIN}" -e 'require("node:fs").readdirSync(process.env.KB_SOURCE_DIR);' >/dev/null 2>&1; then
  log "Failed: node cannot access ${KB_SOURCE_DIR}. Run this app once from Terminal and grant Documents access if macOS prompts for it."
  echo
  echo "macOS blocked access to ${KB_SOURCE_DIR}."
  echo "Grant Documents access to Terminal or the node binary if prompted, then run the app again."
  exit 1
fi

"${NPM_BIN}" run deploy | tee -a "${LOG_FILE}"
log "Manual Vinci Knowledge Base deploy completed successfully."

echo
echo "Deploy finished. You can close this Terminal window."
