#!/bin/bash

# Flight Management System - Stop Script
# This script stops both backend and frontend servers

echo "🛑 Stopping Flight Management System..."
echo ""

# Stop Backend Server
echo "🔧 Stopping Backend Server (Port 5001)..."
if lsof -ti:5001 > /dev/null 2>&1; then
    lsof -ti:5001 | xargs kill -9 2>/dev/null
    echo "   ✅ Backend server stopped"
else
    echo "   ℹ️  Backend server was not running"
fi

# Stop Frontend Server
echo "🎨 Stopping Frontend Server (Port 3000)..."
if lsof -ti:3000 > /dev/null 2>&1; then
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    echo "   ✅ Frontend server stopped"
else
    echo "   ℹ️  Frontend server was not running"
fi

echo ""
echo "✨ All servers stopped!"
echo ""
