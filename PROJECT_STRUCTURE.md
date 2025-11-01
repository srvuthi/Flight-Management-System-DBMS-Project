# 📁 Project Structure Overview

## Complete File Organization

```
flight/
├── 📄 README.md                    # Complete setup guide
├── 📄 QUICKSTART.md                # 5-minute quick start
├── 📄 COMMANDS.md                  # All terminal commands
├── 📄 SCHEMA_ADJUSTMENT.md         # How to adjust to your schema
├── 🔧 setup.sh                     # Automated setup script
│
├── backend/                        # Node.js/Express Backend
│   ├── 📦 package.json            # Backend dependencies
│   ├── 🔒 .env                    # Database credentials (DO NOT COMMIT!)
│   ├── 📄 .env.example            # Template for .env
│   ├── 🚫 .gitignore              # Git ignore rules
│   ├── 🚀 server.js               # Main server file
│   │
│   ├── config/
│   │   └── 💾 database.js         # MySQL connection pool
│   │
│   └── routes/                    # API endpoints
│       ├── ✈️  flights.js         # Flight CRUD operations
│       ├── 👤 passengers.js       # Passenger CRUD operations
│       ├── 🏢 airlines.js         # Airline CRUD operations
│       ├── 🏛️  airports.js         # Airport CRUD operations
│       ├── 📚 bookings.js         # Booking CRUD operations
│       ├── 👥 crew.js             # Crew CRUD operations
│       ├── 🔧 procedures.js       # Stored procedures/triggers
│       └── 📊 dashboard.js        # Dashboard statistics
│
└── frontend/                       # React Frontend
    ├── 📦 package.json            # Frontend dependencies
    ├── 🚫 .gitignore              # Git ignore rules
    │
    ├── public/
    │   └── 📄 index.html          # HTML template
    │
    └── src/
        ├── 🎨 index.js            # App entry point with theme
        ├── 📱 App.js              # Main app component with routing
        │
        ├── components/            # Reusable components
        │   ├── Layout/
        │   │   ├── 🎯 TopBar.js   # Top navigation bar
        │   │   └── 📋 Sidebar.js  # Side navigation menu
        │   │
        │   └── Common/
        │       └── 📊 DataTable.js # Reusable data table
        │
        ├── pages/                 # Page components
        │   ├── 🏠 Dashboard.js    # Main dashboard with stats
        │   ├── ✈️  Flights.js      # Flights management
        │   ├── 👤 Passengers.js   # Passengers management
        │   ├── 🏢 Airlines.js     # Airlines management
        │   ├── 🏛️  Airports.js     # Airports management
        │   ├── 📚 Bookings.js     # Bookings management
        │   ├── 👥 Crew.js         # Crew management
        │   ├── 🔧 Procedures.js   # Procedures/triggers viewer
        │   └── 📊 AllTables.js    # All tables browser
        │
        └── services/
            └── 🔌 api.js          # API service layer
```

---

## 🎯 Key Files Explained

### Configuration Files

**backend/.env**
- Database credentials
- Server port configuration
- **NEVER commit this file!**

**backend/config/database.js**
- MySQL connection pool setup
- Handles database connections
- Connection testing

**frontend/src/index.js**
- React app initialization
- Material-UI theme configuration
- Global styling

---

### Backend Structure

**server.js**
- Express app setup
- Middleware configuration
- Route registration
- Server startup

**routes/*.js**
- RESTful API endpoints
- CRUD operations for each entity
- Database queries
- Error handling

---

### Frontend Structure

**App.js**
- Main application component
- React Router setup
- Layout structure

**components/Layout/**
- TopBar: Navigation header
- Sidebar: Side navigation menu
- Responsive design

**components/Common/**
- DataTable: Reusable table with CRUD
- Shared functionality

**pages/*.js**
- Individual page components
- Form handling
- API integration

**services/api.js**
- Centralized API calls
- Axios configuration
- Service layer abstraction

---

## 🔄 Data Flow

```
User Interaction (Frontend)
        ↓
    React Page Component
        ↓
    API Service (api.js)
        ↓
    HTTP Request
        ↓
    Backend Route
        ↓
    Database Query
        ↓
    MySQL Database
        ↓
    Response sent back
        ↓
    Frontend updates UI
```

---

## 🎨 Component Hierarchy

```
App
├── TopBar
├── Sidebar
└── Main Content
    └── Routes
        ├── Dashboard
        ├── Flights (uses DataTable)
        ├── Passengers (uses DataTable)
        ├── Airlines (uses DataTable)
        ├── Airports (uses DataTable)
        ├── Bookings (uses DataTable)
        ├── Crew (uses DataTable)
        ├── Procedures
        └── AllTables
```

---

## 📦 Dependencies

### Backend (Node.js)
```json
{
  "express": "^4.18.2",        // Web framework
  "mysql2": "^3.6.5",          // MySQL driver
  "cors": "^2.8.5",            // CORS middleware
  "dotenv": "^16.3.1",         // Environment variables
  "body-parser": "^1.20.2"     // Request body parser
}
```

### Frontend (React)
```json
{
  "react": "^18.2.0",                    // React library
  "react-dom": "^18.2.0",                // React DOM
  "react-router-dom": "^6.20.1",         // Routing
  "@mui/material": "^5.14.19",           // Material-UI
  "@mui/icons-material": "^5.14.19",     // Icons
  "@mui/x-data-grid": "^6.18.3",         // Data tables
  "axios": "^1.6.2"                      // HTTP client
}
```

---

## 🔐 Security Files

**.gitignore**
- Prevents committing sensitive files
- Excludes node_modules
- Excludes .env files

**.env**
- Contains sensitive credentials
- Never share or commit
- Use .env.example as template

---

## 🚀 Startup Files

**setup.sh**
- Automated setup script
- Checks dependencies
- Installs packages
- Creates .env if needed

---

## 📊 API Endpoints

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get single flight
- `POST /api/flights` - Create flight
- `PUT /api/flights/:id` - Update flight
- `DELETE /api/flights/:id` - Delete flight
- `GET /api/flights/search/query` - Search flights

### Similar endpoints for:
- `/api/passengers`
- `/api/airlines`
- `/api/airports`
- `/api/bookings`
- `/api/crew`

### Advanced Endpoints
- `GET /api/procedures/procedures` - Get stored procedures
- `GET /api/procedures/functions` - Get functions
- `GET /api/procedures/triggers` - Get triggers
- `POST /api/procedures/execute` - Execute procedure
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/tables` - List all tables
- `GET /api/dashboard/table/:name` - Get table data

---

## 🎨 UI Pages

1. **Dashboard** (`/`)
   - Statistics cards
   - Recent bookings
   - Upcoming flights

2. **Flights** (`/flights`)
   - Data table with all flights
   - Add/Edit/Delete operations
   - Search functionality

3. **Passengers** (`/passengers`)
   - Passenger management
   - Full CRUD operations

4. **Airlines** (`/airlines`)
   - Airline management
   - Full CRUD operations

5. **Airports** (`/airports`)
   - Airport management
   - Full CRUD operations

6. **Bookings** (`/bookings`)
   - Booking management
   - Full CRUD operations

7. **Crew** (`/crew`)
   - Crew member management
   - Full CRUD operations

8. **Procedures & Triggers** (`/procedures`)
   - View stored procedures
   - View functions
   - View triggers
   - Execute procedures

9. **All Tables** (`/tables`)
   - Browse all database tables
   - View any table data
   - Dynamic column generation

---

## 💡 File Modification Guide

### To add a new entity:

1. **Backend:** Create `backend/routes/your_entity.js`
2. **Backend:** Register in `backend/server.js`
3. **Frontend:** Create `frontend/src/pages/YourEntity.js`
4. **Frontend:** Add route in `frontend/src/App.js`
5. **Frontend:** Add menu item in `frontend/src/components/Layout/Sidebar.js`
6. **Frontend:** Add API methods in `frontend/src/services/api.js`

### To modify an existing entity:

1. **Backend:** Edit route file in `backend/routes/`
2. **Frontend:** Edit page file in `frontend/src/pages/`
3. Restart backend if routes changed
4. Refresh browser for frontend changes

---

## 🔧 Development Workflow

1. **Make changes** to code files
2. **Backend changes:** Restart backend server (Ctrl+C, then npm start)
3. **Frontend changes:** Just reload browser (hot reload enabled)
4. **Test changes** in browser
5. **Check terminals** for any errors
6. **Verify in database** that data is correct

---

## 📚 Documentation Files

- **README.md** - Comprehensive setup guide
- **QUICKSTART.md** - Fast 5-minute setup
- **COMMANDS.md** - All terminal commands reference
- **SCHEMA_ADJUSTMENT.md** - How to adjust to your schema
- **PROJECT_STRUCTURE.md** - This file!

---

**Pro Tip:** Keep this file open as a reference while developing! 🚀
