@echo off
rem Double-click launcher for Windows: checks Node.js, then runs the interactive installer.
chcp 65001 >nul
cd /d "%~dp0"
title Agent Templates Installer

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js is not installed.
  echo.
  echo   1. Open https://nodejs.org and download the "LTS" version
  echo   2. Run the downloaded file and click Next until it finishes
  echo   3. Double-click install.cmd again
  echo.
  start "" https://nodejs.org
  pause
  exit /b 1
)

node -e "process.exit(+process.versions.node.split('.')[0] < 18 ? 1 : 0)"
if errorlevel 1 (
  echo.
  echo   Your Node.js version is too old. Version 18 or newer is required.
  echo   Download the "LTS" version from https://nodejs.org and install it, then try again.
  echo.
  start "" https://nodejs.org
  pause
  exit /b 1
)

node install.mjs %*
echo.
pause
