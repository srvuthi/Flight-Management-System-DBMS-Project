# Quick Start Guide - Flight Management System

## 🚀 Quick Setup (5 minutes)

### Terminal 1 - Backend

```bash
# Navigate to backend
cd ~/Desktop/flight/backend

# Install dependencies (first time only)
npm install

# Configure database password in .env file
nano .env
# Change: DB_PASSWORD=your_actual_mysql_password

# Start backend server
npm start
```

**✅ Success:** You should see "Successfully connected to MySQL database"

---

### Terminal 2 - Frontend (New Window)

```bash
# Navigate to frontend
cd ~/Desktop/flight/frontend

# Install dependencies (first time only)
npm install

# Start frontend
npm start
```

**✅ Success:** Browser opens automatically at http://localhost:3000

---

## 🎯 That's It!

Your app is running:
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:5000/api
- 💾 Database: MySQL localhost:3306

---

## 🔧 Common Issues

**Backend won't start?**
- Check MySQL is running: `ps aux | grep mysql`
- Verify password in `backend/.env`

**Frontend shows errors?**
- Make sure backend is running first
- Check http://localhost:5000/api/health

**Port already in use?**
```bash
# Kill port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Full Documentation

See [README.md](./README.md) for complete setup guide.

---

**Need Help?** Check terminal output for error messages!
