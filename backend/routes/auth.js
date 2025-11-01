const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Login endpoint - validates username and OTP against Admin and TwoFA tables
router.post('/login', async (req, res) => {
  try {
    const { username, otp, role } = req.body;

    if (!username || !otp || !role) {
      return res.status(400).json({ 
        error: 'Username, OTP, and role are required' 
      });
    }

    // Get admin details by username and role
    const [adminRows] = await promisePool.query(
      'SELECT Admin_ID, Roles, Username FROM Admin WHERE Username = ? AND Roles = ?',
      [username, role]
    );

    if (adminRows.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid username or role' 
      });
    }

    const admin = adminRows[0];

    // Verify OTP from TwoFA table
    const [twoFARows] = await promisePool.query(
      'SELECT OTP FROM TwoFA WHERE Admin_ID = ?',
      [admin.Admin_ID]
    );

    if (twoFARows.length === 0) {
      return res.status(401).json({ 
        error: 'Two-factor authentication not set up for this user' 
      });
    }

    const storedOTP = twoFARows[0].OTP;

    if (storedOTP !== otp) {
      return res.status(401).json({ 
        error: 'Invalid OTP' 
      });
    }

    // Login successful
    res.json({
      message: 'Login successful',
      user: {
        adminId: admin.Admin_ID,
        username: admin.Username,
        role: admin.Roles
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify session endpoint
router.get('/verify', async (req, res) => {
  try {
    // In a real app, you'd verify a session token/JWT here
    // For now, we'll just return success
    res.json({ valid: true });
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
