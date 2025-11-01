# 🔧 Adjusting Backend to Match Your Database Schema

## Overview

The backend API routes are designed to be flexible and work with your existing database structure. However, you may need to adjust field names to match your exact schema.

---

## 📋 How to Match Your Database Schema

### Step 1: Check Your Table Structure

Run this in MySQL:

```sql
USE flight_management;
SHOW TABLES;
DESCRIBE flights;
DESCRIBE passengers;
-- ... check all your tables
```

### Step 2: Compare with Backend Routes

The backend expects these tables and ID fields:
- `flights` - Primary key: `flight_id`
- `passengers` - Primary key: `passenger_id`
- `airlines` - Primary key: `airline_id`
- `airports` - Primary key: `airport_id`
- `bookings` - Primary key: `booking_id`
- `crew` - Primary key: `crew_id`

---

## 🔄 Common Adjustments Needed

### If Your Table Names Are Different

**Example:** You have `flight` instead of `flights`

Edit: `backend/routes/flights.js`

Change:
```javascript
// FROM:
const [rows] = await promisePool.query('SELECT * FROM flights ...');

// TO:
const [rows] = await promisePool.query('SELECT * FROM flight ...');
```

### If Your Column Names Are Different

**Example:** You have `id` instead of `flight_id`

Edit the route files and frontend pages.

In `backend/routes/flights.js`:
```javascript
// Change all instances of 'flight_id' to 'id'
'SELECT * FROM flights WHERE id = ?'
'DELETE FROM flights WHERE id = ?'
```

In `frontend/src/pages/Flights.js`:
```javascript
const flightsWithId = response.data.map((flight) => ({
  ...flight,
  id: flight.id, // Changed from flight.flight_id
}));
```

### If You Have Additional Fields

**Example:** Your `flights` table has `aircraft_type` field

1. Add to columns in `frontend/src/pages/Flights.js`:
```javascript
const columns = [
  // ... existing columns
  { field: 'aircraft_type', headerName: 'Aircraft', width: 150 },
];
```

2. Add to form:
```javascript
const [formData, setFormData] = useState(
  data || {
    // ... existing fields
    aircraft_type: '',
  }
);

// In the form JSX:
<TextField
  fullWidth
  margin="normal"
  name="aircraft_type"
  label="Aircraft Type"
  value={formData.aircraft_type}
  onChange={handleChange}
/>
```

---

## 📁 Files to Modify by Entity

### Flights
- Backend: `backend/routes/flights.js`
- Frontend: `frontend/src/pages/Flights.js`

### Passengers
- Backend: `backend/routes/passengers.js`
- Frontend: `frontend/src/pages/Passengers.js`

### Airlines
- Backend: `backend/routes/airlines.js`
- Frontend: `frontend/src/pages/Airlines.js`

### Airports
- Backend: `backend/routes/airports.js`
- Frontend: `frontend/src/pages/Airports.js`

### Bookings
- Backend: `backend/routes/bookings.js`
- Frontend: `frontend/src/pages/Bookings.js`

### Crew
- Backend: `backend/routes/crew.js`
- Frontend: `frontend/src/pages/Crew.js`

---

## 🎯 Quick Schema Mapping Guide

### If Your Schema Differs from the Template:

1. **Check your actual schema** from your PDF document
2. **Note the differences:**
   - Table names
   - Column names
   - Primary key names
   - Foreign key relationships

3. **Make these changes:**

#### Backend Route Example:
```javascript
// Template assumes:
SELECT * FROM flights WHERE flight_id = ?

// If yours is different, change to:
SELECT * FROM flight WHERE id = ?
```

#### Frontend Page Example:
```javascript
// Template assumes:
id: flight.flight_id

// If yours is different, change to:
id: flight.id
```

---

## 🔍 Testing Your Changes

After making adjustments:

1. **Restart backend server:**
   ```bash
   cd ~/Desktop/flight/backend
   # Press Ctrl+C to stop, then:
   npm start
   ```

2. **Refresh frontend:**
   - Just reload the page in browser
   - No restart needed for backend changes

3. **Test CRUD operations:**
   - Try adding a new record
   - Try editing a record
   - Try deleting a record
   - Check database to confirm changes

4. **Check for errors:**
   - Backend terminal for API errors
   - Browser console (F12) for frontend errors

---

## 📊 Example: Full Custom Schema Adjustment

Let's say your database has:
- Table: `tbl_flights` (not `flights`)
- Primary key: `id` (not `flight_id`)
- Extra field: `gate_number`

### Backend Changes (`backend/routes/flights.js`):

```javascript
// Get all flights
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT * FROM tbl_flights 
      ORDER BY departure_time DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM tbl_flights WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching flight:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update other routes similarly...
```

### Frontend Changes (`frontend/src/pages/Flights.js`):

```javascript
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'flight_number', headerName: 'Flight Number', width: 150 },
  { field: 'gate_number', headerName: 'Gate', width: 100 }, // NEW FIELD
  // ... other columns
];

const FlightForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      flight_number: '',
      gate_number: '', // NEW FIELD
      // ... other fields
    }
  );

  // Add TextField for gate_number in form JSX
  // ...
};

const Flights = () => {
  // ...
  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFlights();
      const flightsWithId = response.data.map((flight) => ({
        ...flight,
        id: flight.id, // Changed from flight.flight_id
      }));
      setFlights(flightsWithId);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };
  // ...
};
```

---

## 🚨 Important Notes

1. **Always restart backend** after changing route files
2. **Clear browser cache** if changes don't appear
3. **Check both terminals** for error messages
4. **Test incrementally** - change one thing at a time
5. **Keep backups** before making major changes

---

## ✅ Verification Checklist

After adjusting for your schema:

- [ ] Backend starts without errors
- [ ] Frontend loads without errors
- [ ] Can view list of records
- [ ] Can add new records
- [ ] Can edit existing records
- [ ] Can delete records
- [ ] Changes appear in database
- [ ] Dashboard shows correct statistics
- [ ] All tables page works
- [ ] Procedures page loads

---

## 🆘 If Something Breaks

1. **Check terminal output** - look for SQL errors
2. **Check browser console** - look for JavaScript errors
3. **Verify table exists:**
   ```bash
   /usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p -e "USE flight_management; SHOW TABLES;"
   ```
4. **Test SQL query directly:**
   ```bash
   /usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p -e "USE flight_management; SELECT * FROM your_table LIMIT 1;"
   ```

---

## 💡 Pro Tip

Use the **"All Tables" page** in the GUI to see exactly what data exists in your database. This helps identify schema mismatches quickly!

---

**Remember:** The code is flexible and designed to be adjusted to your specific database structure. Take your time and test each change!
