# ✈️ Flight Management System - Complete Setup Guide

## 🎯 Overview
A modern, full-stack Flight Management System with React frontend and Node.js backend, connected to MySQL database. Features include CRUD operations for all entities, stored procedures/trigger management, and a beautiful Material-UI interface.

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8 or higher) - Already installed at `/usr/local/mysql-9.4.0-macos15-arm64/`
- **Terminal** access (zsh for macOS)

---

## 🚀 Step-by-Step Setup

### Step 1: Verify Node.js Installation

```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

---

### Step 2: Navigate to Project Directory

```bash
cd ~/Desktop/flight
```

---

### Step 3: Backend Setup

#### 3.1 Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express (REST API framework)
- mysql2 (MySQL database driver)
- cors (Cross-origin resource sharing)
- dotenv (Environment variables)
- body-parser (Parse request bodies)

#### 3.2 Configure Database Connection

Edit the `.env` file in the `backend` folder:

```bash
nano .env
```

Update with your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_ROOT_PASSWORD
DB_NAME=flight_management
DB_PORT=3306
PORT=5000
```

**Important:** Replace `YOUR_MYSQL_ROOT_PASSWORD` with your actual MySQL root password!

Press `Ctrl+X`, then `Y`, then `Enter` to save.

#### 3.3 Start MySQL Server

```bash
# Start MySQL server
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysqld_safe &

# Or use macOS System Preferences if you have MySQL installed there
```

#### 3.4 Create Database (if not exists)

```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p
```

Enter your password, then run:

```sql
CREATE DATABASE IF NOT EXISTS flight_management;
USE flight_management;

-- Your existing tables, triggers, functions, and procedures should already be here
-- If not, import your SQL file

exit;
```

#### 3.5 Start Backend Server

```bash
# Make sure you're in the backend directory
cd ~/Desktop/flight/backend

# Start the server
npm start

# For development with auto-reload (optional)
npm run dev
```

You should see:
```
✅ Successfully connected to MySQL database
🚀 Server is running on port 5000
📊 API available at http://localhost:5000/api
```

**Keep this terminal open!**

---

### Step 4: Frontend Setup

Open a **NEW terminal window** (keep backend running):

#### 4.1 Install Frontend Dependencies

```bash
cd ~/Desktop/flight/frontend
npm install
```

This will install:
- react & react-dom (UI framework)
- @mui/material (Material-UI components)
- @mui/icons-material (Material-UI icons)
- @mui/x-data-grid (Advanced data tables)
- axios (HTTP client)
- react-router-dom (Routing)

This may take 2-3 minutes.

#### 4.2 Start Frontend Development Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

You should see:
```
Compiled successfully!
You can now view flight-management-frontend in the browser.
  Local:            http://localhost:3000
```

**Keep this terminal open too!**

---

## 🎉 You're Done!

Your application is now running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Database:** MySQL on localhost:3306

---

## 📱 Using the Application

### Navigation
- **Dashboard** - Overview with statistics and recent activity
- **Flights** - Manage flight information
- **Passengers** - Manage passenger records
- **Airlines** - Manage airline information
- **Airports** - Manage airport data
- **Bookings** - Manage flight bookings
- **Crew** - Manage crew members
- **Procedures & Triggers** - View and execute stored procedures, functions, and triggers
- **All Tables** - Browse all database tables

### CRUD Operations
Each entity page supports:
- ➕ **Add New** - Create new records
- ✏️ **Edit** - Update existing records (click edit icon)
- 🗑️ **Delete** - Remove records (click delete icon)
- 🔄 **Refresh** - Reload data from database

All changes are **immediately reflected in your MySQL database!**

---

## 🔧 Troubleshooting

### Backend won't start

**Error:** `Error connecting to MySQL database`

**Solution:**
1. Check if MySQL is running:
   ```bash
   ps aux | grep mysql
   ```
2. Verify your password in `backend/.env`
3. Ensure database exists:
   ```bash
   /usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p -e "SHOW DATABASES;"
   ```

**Error:** `Port 5000 already in use`

**Solution:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Then restart backend
npm start
```

### Frontend won't start

**Error:** `Port 3000 already in use`

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Then restart frontend
npm start
```

**Error:** `Cannot connect to backend`

**Solution:**
1. Ensure backend is running (check terminal)
2. Check backend is on port 5000: http://localhost:5000/api/health

### Database Connection Issues

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
Reset MySQL password:
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p
```
Then update `backend/.env` with correct password

---

## 🛠️ Development Commands

### Backend Commands
```bash
cd ~/Desktop/flight/backend

# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

### Frontend Commands
```bash
cd ~/Desktop/flight/frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 🎨 Customization

### Change Theme Colors

Edit `frontend/src/index.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this color
    },
    secondary: {
      main: '#dc004e', // Change this color
    },
  },
});
```

### Add New Entity

1. Create route in `backend/routes/yourEntity.js`
2. Add to `backend/server.js`
3. Create page in `frontend/src/pages/YourEntity.js`
4. Add route in `frontend/src/App.js`
5. Add menu item in `frontend/src/components/Layout/Sidebar.js`

---

## 📊 Database Schema

The application expects these tables (adjust according to your PDF):
- `flights` (flight_id, flight_number, airline_id, origin_airport_id, destination_airport_id, departure_time, arrival_time, status)
- `passengers` (passenger_id, first_name, last_name, email, phone, passport_number, date_of_birth, nationality)
- `airlines` (airline_id, airline_name, airline_code, country, headquarters)
- `airports` (airport_id, airport_name, airport_code, city, country)
- `bookings` (booking_id, passenger_id, flight_id, booking_date, seat_number, class, price, status)
- `crew` (crew_id, first_name, last_name, role, airline_id, hire_date)

**Note:** Adjust table names and columns to match your actual database schema!

---

## 🔒 Security Notes

- Never commit `.env` files to version control
- Change default passwords in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement authentication for production use

---

## 📦 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Serve with Backend
Update `backend/server.js` to serve static files:
```javascript
app.use(express.static(path.join(__dirname, '../frontend/build')));
```

---

## 💡 Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check browser console** for frontend errors (F12)
3. **Check terminal** for backend errors
4. **Use Refresh button** if data doesn't update
5. **Procedures page** - Execute stored procedures with parameters
6. **All Tables page** - Browse any table in your database

---

## 🆘 Still Need Help?

1. Check terminal output for error messages
2. Verify database connection in backend terminal
3. Check browser console (F12) for frontend errors
4. Ensure all dependencies are installed
5. Verify MySQL server is running

---

## 🎓 Next Steps

- Customize the UI to match your preferences
- Add authentication/authorization
- Implement role-based access control
- Add data validation
- Create reports and analytics
- Deploy to cloud (AWS, Heroku, etc.)

---

**Enjoy your modern Flight Management System! ✈️🚀**
