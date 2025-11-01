# 🚀 START YOUR APPLICATION - Quick Commands

## ✅ Node.js & npm are now installed!

---

## 📝 IMPORTANT: Backend now uses PORT 5001 (not 5000)
macOS Control Center was using port 5000, so we changed to 5001.

---

## 🎯 TO START YOUR APPLICATION:

### Terminal 1 - Backend Server

```bash
cd ~/Desktop/flight/backend
npm start
```

**✅ Success looks like:**
```
🚀 Server is running on port 5001
📊 API available at http://localhost:5001/api
✅ Successfully connected to MySQL database
```

**Keep this terminal running!**

---

### Terminal 2 - Frontend (Open NEW Terminal Window)

```bash
cd ~/Desktop/flight/frontend
npm start
```

**✅ Success:** Browser opens automatically to http://localhost:3000

**Keep this terminal running too!**

---

## 🎉 YOUR APPLICATION IS NOW RUNNING!

- 🌐 **Frontend:** http://localhost:3000
- 🔌 **Backend:** http://localhost:5001/api
- 💾 **Database:** FL_Management

---

## ⚠️ IMPORTANT NOTES:

1. **Database Name:** Your database is `FL_Management` (not Flight_Management)
2. **Backend Port:** Changed to 5001 (macOS uses 5000 for Control Center)
3. **Both terminals must stay open** while using the app
4. **Press Ctrl+C** in a terminal to stop that server

---

## 🔧 If Backend Shows Error:

**Error: "address already in use"**
```bash
lsof -ti:5001 | xargs kill -9
```

Then restart: `npm start`

---

## 📱 Using Your App:

1. Open http://localhost:3000 in your browser
2. Explore the Dashboard
3. Navigate through all pages using the sidebar
4. Add/Edit/Delete records - all changes save to MySQL!
5. Check "Procedures & Triggers" page for your DB procedures
6. Use "All Tables" to browse any table

---

## 💡 Daily Startup:

You only need these two commands:

**Terminal 1:**
```bash
cd ~/Desktop/flight/backend && npm start
```

**Terminal 2:**
```bash
cd ~/Desktop/flight/frontend && npm start
```

---

**Enjoy your modern Flight Management System! ✈️**
