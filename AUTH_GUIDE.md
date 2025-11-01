# 🔐 Authentication & Role-Based Access - Quick Guide

## ✅ Implementation Complete!

Your Flight Management System now has a **secure login system** with **role-based access control** for the Financial records.

---

## 🚀 How to Use

### 1. **Start the Application**

Open http://localhost:3000 - you'll see the login screen automatically.

### 2. **Login Credentials**

#### **Employee Access** (No Finance Access)
- **Username**: `emp01`, `emp02`, `emp03`, `emp04`
- **OTP**: `111111`, `222222`, `333333`, `444444`
- **Role**: Select "Employee" from dropdown
- **Access**: All tables EXCEPT Finance

#### **Manager Access** (Finance Access ✅)
- **Username**: `mgr01`, `mgr02`, `mgr03`
- **OTP**: `555555`, `666666`, `777777`
- **Role**: Select "Airport_Manager" from dropdown
- **Access**: All tables INCLUDING Finance

#### **CEO Access** (Finance Access ✅)
- **Username**: `ceo01`, `ceo02`, `ceo03`
- **OTP**: `888888`, `999999`, `000000`
- **Role**: Select "CEO" from dropdown
- **Access**: All tables INCLUDING Finance

---

## 🔒 Finance Table Access Rules

### ✅ Who Can Access Finance:
- **CEO** - Full access (view, add, edit, delete)
- **Airport_Manager** - Full access (view, add, edit, delete)

### ❌ Who CANNOT Access Finance:
- **Employee** - Blocked with error message

When an Employee tries to access `/finance`, they'll see:
```
Access Denied
Only CEO and Airport Manager roles can access Financial records.
Your current role: Employee
```

---

## 📊 Finance Table Details

### Columns:
- **Transaction_ID**: Unique identifier (e.g., F001)
- **Amount**: Transaction amount in dollars
- **Date**: Transaction date
- **Transaction_Type**: Payment method (Card, UPI, Cash)
- **Passenger_ID**: Linked to Passenger table
- **Ticket_ID**: Linked to Tickets table

### Adding Finance Records:
1. Login as CEO or Manager
2. Navigate to "Finance" in sidebar (green icon)
3. Click "+" button
4. Fill in form:
   - Transaction_ID: `F100` (must be unique)
   - Amount: `1500.00`
   - Date: Select date
   - Transaction_Type: Choose from dropdown (Card/UPI/Cash)
   - Passenger_ID: `P001` (must exist)
   - Ticket_ID: `TKT001` (must exist)
5. Click Submit

---

## 🎨 UI Features

### Sidebar Updates:
- **User Badge**: Shows your role and username at the top
- **Finance Menu**: Only visible to CEO and Manager (green colored)
- **Logout Button**: At the bottom of sidebar (red button)

### Login Screen:
- **Modern Design**: Gradient background with clean card layout
- **Role Selection**: Dropdown to choose your role first
- **OTP Field**: Password-protected input for 6-digit OTP
- **Demo Credentials**: Displayed on login page for easy testing
- **Error Messages**: Clear feedback for invalid credentials

### Protected Routes:
- **Auto-redirect**: Unauthenticated users sent to `/login`
- **Session Persistence**: Login state saved in localStorage
- **Logout**: Click logout to clear session and return to login

---

## 🔧 Technical Implementation

### Backend:
✅ `/api/auth/login` - Validates username, OTP, and role against Admin + TwoFA tables
✅ `/api/auth/logout` - Clears session
✅ `/api/finance/*` - Full CRUD endpoints for Finance table

### Frontend:
✅ AuthContext - Manages user state and authentication
✅ ProtectedRoute component - Guards all main routes
✅ Login page - Role-based authentication form
✅ Finance page - Role-restricted with access check
✅ Sidebar - Dynamic menu based on user role

### Database Tables Used:
- **Admin**: Stores Admin_ID, Roles, Username, Password
- **TwoFA**: Stores Admin_ID, Contact_No, OTP
- **Finance**: Financial transaction records

---

## 🧪 Testing the System

### Test Employee Access:
1. Login as `emp01` / `111111` / Employee
2. Try to navigate to Finance - Should see "Access Denied"
3. Access all other tables - Should work normally
4. Logout and try again

### Test Manager Access:
1. Login as `mgr01` / `555555` / Airport_Manager  
2. Navigate to Finance - Should see full access
3. Try adding a transaction
4. Verify it appears in the database

### Test CEO Access:
1. Login as `ceo01` / `888888` / CEO
2. Navigate to Finance - Should see full access
3. Finance menu item should be visible in sidebar
4. Full CRUD operations should work

---

## 📝 Database Verification

Check if login worked:
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p'Pkdelhi007@' FL_Management -e "
SELECT a.Admin_ID, a.Username, a.Roles, t.OTP 
FROM Admin a 
LEFT JOIN TwoFA t ON a.Admin_ID = t.Admin_ID 
WHERE a.Username = 'ceo01';
"
```

Check Finance records:
```bash
/usr/local/mysql-9.4.0-macos15-arm64/bin/mysql -u root -p'Pkdelhi007@' FL_Management -e "
SELECT * FROM Finance ORDER BY Date DESC LIMIT 5;
"
```

---

## 🎯 Key Features Delivered

✅ **Login Screen** - Professional UI with role dropdown
✅ **Role-Based Authentication** - Validates against TwoFA table
✅ **Protected Routes** - All pages require login
✅ **Finance Page** - Visible only to CEO and Manager
✅ **Access Control** - Automatic blocking for Employee role
✅ **Session Management** - Persistent login with localStorage
✅ **Logout Functionality** - Clean session termination
✅ **User Badge** - Shows current user role in sidebar
✅ **Error Messages** - Clear feedback for access denials
✅ **Full CRUD** - Add/Edit/Delete finance records

---

## 🚀 Application URLs

- **Frontend**: http://localhost:3000 (redirects to /login)
- **Login Page**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard (after login)
- **Finance**: http://localhost:3000/finance (CEO/Manager only)
- **Backend API**: http://localhost:5001/api

---

## 💡 Pro Tips

1. **Role matters**: Make sure to select the correct role in the dropdown before entering username
2. **OTP is password**: The 6-digit OTP from TwoFA table acts as the password
3. **Finance visibility**: The Finance menu only appears in sidebar for authorized roles
4. **Session persistence**: Your login persists even if you refresh the page
5. **Logout required**: Use the logout button to switch between different roles

---

## 🎉 You're All Set!

The authentication system is fully functional with role-based access control. Finance data is now protected and only accessible by managers and executives!
