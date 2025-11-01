# 🎯 COMPLETE TERMINAL COMMANDS - Flight Management System

## ⚡ FASTEST WAY TO START (Recommended)

### Option 1: Automated Setup Script

```bash
# Run the automated setup script
cd ~/Desktop/flight
./setup.sh
```

This will:
- ✅ Check Node.js installation
- ✅ Install all backend dependencies
- ✅ Install all frontend dependencies
- ✅ Create .env file if needed

Then follow the instructions it prints!

---

## 📝 MANUAL SETUP (Step by Step)

### Step 1: Update Database Password

```bash
cd ~/Desktop/flight/backend
nano .env
```

Change this line:
```
DB_PASSWORD=your_password_here
```

Save: `Ctrl+X`, then `Y`, then `Enter`

---

### Step 2: Install Backend Dependencies

```bash
cd ~/Desktop/flight/backend
npm install
```

Wait 1-2 minutes for installation to complete.

---

### Step 3: Start Backend Server

```bash
cd ~/Desktop/flight/backend
npm start
```

**✅ Success looks like:**
```
✅ Successfully connected to MySQL database
🚀 Server is running on port 5000
📊 API available at http://localhost:5000/api
```

**❌ If you see connection error:**
1. Check MySQL is running: `ps aux | grep mysql`
2. Start MySQL: `/usr/local/mysql-9.4.0-macos15-arm64/bin/mysqld_safe &`
3. Verify database exists:
   ```bash
   /usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p -e "SHOW DATABASES;"
   ```

**Keep this terminal open!**

---

### Step 4: Install Frontend Dependencies (New Terminal)

Open a **NEW terminal window**, then:

```bash
cd ~/Desktop/flight/frontend
npm install
```

Wait 2-3 minutes for installation (this one takes longer).

---

### Step 5: Start Frontend Server

```bash
cd ~/Desktop/flight/frontend
npm start
```

**✅ Success:** Browser automatically opens to http://localhost:3000

**Keep this terminal open too!**

---

## 🎉 YOU'RE DONE!

Your application is running:
- 🌐 **Frontend:** http://localhost:3000
- 🔌 **Backend API:** http://localhost:5000/api
- 💾 **Database:** MySQL on localhost:3306

---

## 🔄 Daily Startup Commands

After initial setup, you only need:

### Terminal 1 - Backend
```bash
cd ~/Desktop/flight/backend
npm start
```

### Terminal 2 - Frontend
```bash
cd ~/Desktop/flight/frontend
npm start
```

---

## 🛑 Stopping the Application

To stop either server:
1. Go to the terminal running it
2. Press `Ctrl+C`

---

## 🔧 Troubleshooting Commands

### Check if ports are in use
```bash
# Check backend port
lsof -i :5000

# Check frontend port
lsof -i :3000
```

### Kill processes on ports
```bash
# Kill backend
lsof -ti:5000 | xargs kill -9

# Kill frontend
lsof -ti:3000 | xargs kill -9
```

### Check MySQL status
```bash
ps aux | grep mysql
```

### Start MySQL manually
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysqld_safe &
```

### Access MySQL CLI
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p
```

### Check database exists
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p -e "SHOW DATABASES;"
```

### Test backend API
```bash
curl http://localhost:5000/api/health
```

---

## 📦 What Was Installed?

### Backend Dependencies
- **express** - Web framework for API
- **mysql2** - MySQL database driver
- **cors** - Enable cross-origin requests
- **dotenv** - Environment variable management
- **body-parser** - Parse request bodies

### Frontend Dependencies
- **react** - UI framework
- **@mui/material** - Material-UI components
- **@mui/icons-material** - Material-UI icons
- **@mui/x-data-grid** - Advanced data tables
- **axios** - HTTP client for API calls
- **react-router-dom** - Page routing

---

## 🎨 Application Features

### Pages Available
1. **Dashboard** - Statistics and overview
2. **Flights** - Manage flights (Add/Edit/Delete)
3. **Passengers** - Manage passengers
4. **Airlines** - Manage airlines
5. **Airports** - Manage airports
6. **Bookings** - Manage bookings
7. **Crew** - Manage crew members
8. **Procedures & Triggers** - View and execute database procedures
9. **All Tables** - Browse any database table

### Features
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Real-time database updates
- ✅ Modern Material-UI interface
- ✅ Responsive design (works on mobile)
- ✅ Data tables with sorting and pagination
- ✅ Search and filter capabilities
- ✅ Execute stored procedures
- ✅ View triggers and functions
- ✅ Browse all database tables

---

## 🔐 Important Files

- `backend/.env` - Database credentials (NEVER commit to git!)
- `backend/config/database.js` - Database connection
- `backend/routes/*.js` - API endpoints
- `frontend/src/services/api.js` - API service layer
- `frontend/src/pages/*.js` - Page components

---

## 💡 Pro Tips

1. **Keep both terminals visible** - Use split view or multiple windows
2. **Backend must start first** - Frontend depends on backend API
3. **Check terminals for errors** - Most issues show up there
4. **Use browser console** - Press F12 for frontend debugging
5. **Refresh if data doesn't update** - Use the Refresh button

---

## 🚀 Next Steps

1. ✅ Start both servers (backend and frontend)
2. ✅ Open http://localhost:3000 in browser
3. ✅ Explore the Dashboard
4. ✅ Try adding/editing records
5. ✅ Check "Procedures & Triggers" page
6. ✅ Browse "All Tables" to see your database

---

## 🆘 Quick Help

**Q: Backend won't start?**
A: Check MySQL is running and password in `.env` is correct

**Q: Frontend shows blank page?**
A: Check backend is running first, verify http://localhost:5000/api/health

**Q: "Port already in use" error?**
A: Kill the process with `lsof -ti:[PORT] | xargs kill -9`

**Q: Database connection failed?**
A: Start MySQL server manually with the command above

**Q: Changes not showing in GUI?**
A: Click the "Refresh" button or reload the page

---

## 📞 Support

For detailed information:
- **Full Guide:** [README.md](./README.md)
- **Quick Start:** [QUICKSTART.md](./QUICKSTART.md)

**Check the terminal output first** - it usually shows what's wrong!

---

**Happy coding! ✈️🚀**
