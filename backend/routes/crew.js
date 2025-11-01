const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all admin members (crew)
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Admin ORDER BY Username');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get admin member by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Admin WHERE Admin_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new admin member
router.post('/', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Admin SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Admin created successfully',
      id: req.body.Admin_ID 
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update admin member
router.put('/:id', async (req, res) => {
  try {
    const { Roles, Username, Password } = req.body;
    const [result] = await promisePool.query(
      'UPDATE Admin SET Roles = ?, Username = ?, Password = ? WHERE Admin_ID = ?',
      [Roles, Username, Password, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete admin member
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Admin WHERE Admin_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
