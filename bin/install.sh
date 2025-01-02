#!/bin/bash

set -e

echo "==> Setting up Python virtual environment..."

cd server

if [ ! -d "env" ]; then
    echo "Creating a new virtual environment..."
    python3 -m venv env
else
    echo "Virtual environment already exists, skipping creation..."
fi

echo "Activating the virtual environment..."
source env/bin/activate

if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies from requirements.txt..."
    pip install -r requirements.txt
else
    echo "No requirements.txt found. Skipping Python dependency install."
fi

deactivate

cd ..

echo "==> Installing Node dependencies..."

cd client

if [ -f "package.json" ]; then
    echo "Running npm install..."
    npm install
else
    echo "No package.json found. Skipping npm install."
fi

cd ..

echo "==> Setup complete!"