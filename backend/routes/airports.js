const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all airports
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Airport ORDER BY Name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get airport by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Airport WHERE Airport_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching airport:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new airport
router.post('/', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Airport SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Airport created successfully',
      id: req.body.Airport_ID 
    });
  } catch (error) {
    console.error('Error creating airport:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update airport
router.put('/:id', async (req, res) => {
  try {
    const { Name, Location } = req.body;
    const [result] = await promisePool.query(
      'UPDATE Airport SET Name = ?, Location = ? WHERE Airport_ID = ?',
      [Name, Location, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json({ message: 'Airport updated successfully' });
  } catch (error) {
    console.error('Error updating airport:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete airport
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Airport WHERE Airport_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json({ message: 'Airport deleted successfully' });
  } catch (error) {
    console.error('Error deleting airport:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
