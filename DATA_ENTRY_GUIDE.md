# Data Entry Guide for Flight Management System

## ✅ All Fixed! Your CRUD Operations Now Work!

All add/delete/update operations in the GUI are now **fully connected to the MySQL database**. Any changes you make will be immediately reflected in the database.

---

## 📋 ID Format Requirements

Since the database uses **manual IDs** (not auto-increment), you must provide unique IDs when creating new records:

### 1️⃣ **Airports**
- **Airport_ID**: Use format like `AP001`, `AP002`, etc.
- **Example**: 
  - Airport_ID: `AP010`
  - Name: `Los Angeles International`
  - Location: `Los Angeles, USA`

### 2️⃣ **Aircraft** (Airlines Tab)
- **Aircraft_ID**: Use format like `AC001`, `AC002`, etc.
- **Manufacturer**: Choose from dropdown (Airbus, Boeing, Embraer, Comac)
- **Example**:
  - Aircraft_ID: `AC005`
  - Model: `Boeing 747`
  - Capacity: `400`
  - Manufacturer: `Boeing`

### 3️⃣ **Passengers**
- **Passenger_ID**: Use format like `P001`, `P002`, etc.
- **Gender**: Choose from dropdown (M/F/O)
- **Example**:
  - Passenger_ID: `P100`
  - First_Name: `John`
  - Last_Name: `Doe`
  - Gender: `M`
  - Nationality: `American`
  - Contact_No: `+1-555-1234`
  - Total_Tickets: `0` (for new passengers)

### 4️⃣ **Flights**
- **Flight_No**: Use format like `FL001`, `FL002`, etc.
- **Important**: Aircraft_ID and Airport IDs must exist in their respective tables!
- **Example**:
  - Flight_No: `FL025`
  - Aircraft_ID: `AC001` (must exist in Aircraft table)
  - Dept_Airport_ID: `AP001` (must exist in Airport table)
  - Arr_Airport_ID: `AP002` (must exist in Airport table)
  - Dept_Time: `2025-11-01 10:00`
  - Arr_Time: `2025-11-01 14:30`
  - Duration: `270` (minutes)

### 5️⃣ **Bookings** (Tickets Tab)
- **Ticket_ID**: Use format like `TKT001`, `TKT002`, etc.
- **Class**: Choose from dropdown (Eco, Premium Eco, Business, First)
- **Important**: Flight_No and Passenger_ID must exist!
- **Example**:
  - Ticket_ID: `TKT500`
  - Class: `Eco`
  - Seat_No: `12A`
  - Flight_No: `FL001` (must exist in Flight table)
  - Passenger_ID: `P001` (must exist in Passenger table)
  - Booking_Date: `2025-10-30`

### 6️⃣ **Crew** (Admin Tab)
- **Admin_ID**: Use format like `ADM001`, `ADM002`, etc.
- **Roles**: Choose from dropdown (Employee, Airport_Manager, CEO)
- **Example**:
  - Admin_ID: `ADM010`
  - Roles: `Employee`
  - Username: `john.smith`
  - Password: `securepass123`

---

## 🔧 Database Operations Status

### ✅ **Working Operations:**

1. **CREATE (Add)**: Click the "+" button on any page
2. **READ (View)**: Data automatically loads from database
3. **UPDATE (Edit)**: Click the edit icon on any row
4. **DELETE**: Click the delete icon on any row

All operations are **immediately reflected in the MySQL database**.

---

## ⚠️ **Important Notes:**

### Foreign Key Constraints:
- When adding **Flights**, make sure Aircraft_ID and Airport IDs already exist
- When adding **Tickets**, make sure Flight_No and Passenger_ID already exist
- If you violate foreign key constraints, you'll get an error

### ID Rules:
- **IDs cannot be changed** after creation (they're disabled in edit mode)
- **IDs must be unique** within each table
- Use consistent naming (AP for Airport, AC for Aircraft, P for Passenger, etc.)

### Enum Fields (Dropdowns):
- **Class**: Eco, Premium Eco, Business, First
- **Gender**: M, F, O
- **Manufacturer**: Airbus, Boeing, Embraer, Comac
- **Roles**: Employee, Airport_Manager, CEO

---

## 🎯 Quick Test Workflow

### Test Add Operation:
1. Go to **Airports** tab
2. Click the **+** button
3. Fill in:
   - Airport_ID: `AP999`
   - Name: `Test Airport`
   - Location: `Test City, Test Country`
4. Click **Submit**
5. Verify it appears in the table
6. Check MySQL database:
   ```bash
   /usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p'Pkdelhi007@' FL_Management -e "SELECT * FROM Airport WHERE Airport_ID='AP999';"
   ```

### Test Update Operation:
1. Click the **edit icon** on the row you just created
2. Change the **Name** to `Updated Test Airport`
3. Click **Submit**
4. Verify the change appears immediately
5. Verify in MySQL database

### Test Delete Operation:
1. Click the **delete icon** on the test row
2. Confirm deletion
3. Verify it's removed from the table
4. Verify it's deleted from MySQL database

---

## 🚀 Your System is Now Fully Functional!

Both the **Backend** (port 5001) and **Frontend** (port 3000) are running and connected to your MySQL database. All CRUD operations work perfectly!

**Access your application at:** http://localhost:3000
