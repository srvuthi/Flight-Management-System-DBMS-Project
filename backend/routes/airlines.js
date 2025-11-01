const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all aircraft (airlines)
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Aircraft ORDER BY Model');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get aircraft by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Aircraft WHERE Aircraft_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new aircraft
router.post('/', async (req, res) => {
  try {
    const { Capacity } = req.body;
    
    // TRIGGER: Validate Capacity > 0
    if (!Capacity || parseInt(Capacity) <= 0) {
      return res.status(400).json({ 
        error: 'Invalid capacity. Aircraft capacity must be greater than 0.' 
      });
    }
    
    // TRIGGER: Validate Capacity is reasonable (1-1000)
    if (parseInt(Capacity) > 1000) {
      return res.status(400).json({ 
        error: 'Invalid capacity. Aircraft capacity cannot exceed 1000 passengers.' 
      });
    }
    
    const [result] = await promisePool.query(
      'INSERT INTO Aircraft SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Aircraft created successfully',
      id: req.body.Aircraft_ID 
    });
  } catch (error) {
    console.error('Error creating aircraft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update aircraft
router.put('/:id', async (req, res) => {
  try {
    const { Model, Capacity, Manufacturer } = req.body;
    
    // TRIGGER: Validate Capacity > 0
    if (Capacity !== undefined && parseInt(Capacity) <= 0) {
      return res.status(400).json({ 
        error: 'Invalid capacity. Aircraft capacity must be greater than 0.' 
      });
    }
    
    // TRIGGER: Validate Capacity is reasonable (1-1000)
    if (Capacity !== undefined && parseInt(Capacity) > 1000) {
      return res.status(400).json({ 
        error: 'Invalid capacity. Aircraft capacity cannot exceed 1000 passengers.' 
      });
    }
    
    const [result] = await promisePool.query(
      'UPDATE Aircraft SET Model = ?, Capacity = ?, Manufacturer = ? WHERE Aircraft_ID = ?',
      [Model, Capacity, Manufacturer, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json({ message: 'Aircraft updated successfully' });
  } catch (error) {
    console.error('Error updating aircraft:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete aircraft
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Aircraft WHERE Aircraft_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json({ message: 'Aircraft deleted successfully' });
  } catch (error) {
    console.error('Error deleting aircraft:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
