@echo off
title Codegnan LMS Portal
echo ===================================================
echo   Starting Codegnan LMS Portal...
echo ===================================================

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your system PATH.
    echo Please install Node.js from https://nodejs.org/ to run this project.
    pause
    exit /b 1
)

:: Check if node_modules exists in backend folder, if not install dependencies
if not exist "backend\node_modules\" (
    echo [INFO] backend/node_modules folder not found. Installing dependencies...
    cd backend
    call npm install
    cd ..
)

:: Launch the browser automatically
echo [INFO] Starting local Express server at http://localhost:3000...
start "" http://localhost:3000

:: Start the Express application inside the backend directory
cd backend
npm start
cd ..
