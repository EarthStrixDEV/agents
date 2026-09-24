#!/bin/bash
# Double-click launcher for macOS: checks Node.js, then runs the interactive installer.
cd "$(dirname "$0")" || exit 1

pause() {
  echo
  read -n 1 -s -r -p "Press any key to close this window..."
  echo
}

if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  Node.js is not installed."
  echo
  echo "  1. Open https://nodejs.org and download the \"LTS\" version"
  echo "  2. Open the downloaded file and follow the steps until it finishes"
  echo "  3. Double-click install.command again"
  open "https://nodejs.org"
  pause
  exit 1
fi

if ! node -e "process.exit(+process.versions.node.split('.')[0] < 18 ? 1 : 0)"; then
  echo
  echo "  Your Node.js version is too old. Version 18 or newer is required."
  echo "  Download the \"LTS\" version from https://nodejs.org and install it, then try again."
  open "https://nodejs.org"
  pause
  exit 1
fi

node install.mjs "$@"
pause
