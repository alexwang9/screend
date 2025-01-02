#!/bin/bash

# Move into server folder, activate venv, and start Flask in the background
cd server
if [ -d "venv" ]; then
  # For Linux/Mac:
  source venv/bin/activate
  # For Windows (Git Bash):
  # source venv/Scripts/activate
fi
echo "Starting Flask server..."
python app.py &
FLASK_PID=$!

# Move to client folder and start React
cd ../client
echo "Starting React frontend..."
npm start &

# Trap Ctrl+C to kill the Flask process
trap "kill $FLASK_PID" EXIT

# Wait for child processes
wait