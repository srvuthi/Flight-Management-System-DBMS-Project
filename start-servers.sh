#!/bin/bash

# Flight Management System - Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting Flight Management System..."
echo ""

# Kill any existing processes on ports 5001 and 3000
echo "📋 Cleaning up existing processes..."
lsof -ti:5001 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Start Backend Server
echo "🔧 Starting Backend Server (Port 5001)..."
cd ~/Desktop/flight/backend
nohup npm start > backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
sleep 3

# Check if backend started successfully
if lsof -ti:5001 > /dev/null; then
    echo "   ✅ Backend server started successfully"
else
    echo "   ❌ Backend server failed to start"
    echo "   Check backend.log for errors"
    exit 1
fi

# Start Frontend Server
echo "🎨 Starting Frontend Server (Port 3000)..."
cd ~/Desktop/flight/frontend
nohup npm start > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
sleep 8

# Check if frontend started successfully
if lsof -ti:3000 > /dev/null; then
    echo "   ✅ Frontend server started successfully"
else
    echo "   ❌ Frontend server failed to start"
    echo "   Check frontend.log for errors"
    exit 1
fi

echo ""
echo "✨ Both servers are running!"
echo ""
echo "📊 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5001/api"
echo ""
echo "📝 Logs:"
echo "   Backend:  ~/Desktop/flight/backend/backend.log"
echo "   Frontend: ~/Desktop/flight/frontend/frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   lsof -ti:5001 | xargs kill -9  # Stop backend"
echo "   lsof -ti:3000 | xargs kill -9  # Stop frontend"
echo ""
