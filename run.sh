#!/bin/bash
echo "==================================================="
echo "  Starting Codegnan LMS Portal..."
echo "==================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed or not in your system PATH."
    echo "Please install Node.js from https://nodejs.org/ to run this project."
    exit 1
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "backend/node_modules" ]; then
    echo "[INFO] backend/node_modules folder not found. Installing dependencies..."
    cd backend
    npm install
    cd ..
fi

# Launch the browser automatically
echo "[INFO] Starting local Express server at http://localhost:3000..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000 &
elif command -v open &> /dev/null; then
    open http://localhost:3000 &
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    start http://localhost:3000
fi

# Start the Express application inside backend
cd backend
npm start
cd ..
