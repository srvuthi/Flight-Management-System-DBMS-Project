#!/bin/bash

# Flight Management System - Setup Script
# This script helps you set up the entire application

echo "✈️  Flight Management System - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit backend/.env and add your MySQL password!"
    echo "   Run: nano backend/.env"
fi

if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies (this may take 2-3 minutes)..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

cd ..

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "⚠️  Before starting, make sure:"
echo "   1. MySQL server is running"
echo "   2. You've updated backend/.env with your MySQL password"
echo "   3. Your database 'flight_management' exists"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd ~/Desktop/flight/backend && npm start"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd ~/Desktop/flight/frontend && npm start"
echo ""
echo "📚 For detailed instructions, see README.md or QUICKSTART.md"
echo "=========================================="
