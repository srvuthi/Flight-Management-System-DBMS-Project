const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all flights
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT * FROM Flight 
      ORDER BY Dept_Time DESC
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
      'SELECT * FROM Flight WHERE Flight_No = ?',
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

// Create new flight
router.post('/', async (req, res) => {
  try {
    const { Dept_Time, Arr_Time, Dept_Airport_ID, Arr_Airport_ID } = req.body;
    
    // TRIGGER: Validate Departure time < Arrival time
    if (Dept_Time && Arr_Time) {
      const deptDate = new Date(Dept_Time);
      const arrDate = new Date(Arr_Time);
      if (deptDate >= arrDate) {
        return res.status(400).json({ 
          error: 'Invalid flight times. Departure time must be before arrival time.' 
        });
      }
    }
    
    // TRIGGER: Validate Departure Airport != Arrival Airport
    if (Dept_Airport_ID && Arr_Airport_ID && Dept_Airport_ID === Arr_Airport_ID) {
      return res.status(400).json({ 
        error: 'Invalid airports. Departure and arrival airports must be different.' 
      });
    }
    
    const [result] = await promisePool.query(
      'INSERT INTO Flight SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Flight created successfully',
      id: req.body.Flight_No 
    });
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update flight
router.put('/:id', async (req, res) => {
  try {
    const { Dept_Time, Arr_Time, Dept_Airport_ID, Arr_Airport_ID, Aircraft_ID, Duration } = req.body;
    
    // TRIGGER: Validate Departure time < Arrival time
    if (Dept_Time && Arr_Time) {
      const deptDate = new Date(Dept_Time);
      const arrDate = new Date(Arr_Time);
      if (deptDate >= arrDate) {
        return res.status(400).json({ 
          error: 'Invalid flight times. Departure time must be before arrival time.' 
        });
      }
    }
    
    // TRIGGER: Validate Departure Airport != Arrival Airport
    if (Dept_Airport_ID && Arr_Airport_ID && Dept_Airport_ID === Arr_Airport_ID) {
      return res.status(400).json({ 
        error: 'Invalid airports. Departure and arrival airports must be different.' 
      });
    }
    
    const [result] = await promisePool.query(
      'UPDATE Flight SET Dept_Time = ?, Arr_Time = ?, Dept_Airport_ID = ?, Arr_Airport_ID = ?, Aircraft_ID = ?, Duration = ? WHERE Flight_No = ?',
      [Dept_Time, Arr_Time, Dept_Airport_ID, Arr_Airport_ID, Aircraft_ID, Duration, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight updated successfully' });
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete flight
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Flight WHERE Flight_No = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search flights
router.get('/search/query', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    let query = 'SELECT * FROM Flight WHERE 1=1';
    const params = [];

    if (origin) {
      query += ' AND Dept_Airport_ID = ?';
      params.push(origin);
    }
    if (destination) {
      query += ' AND Arr_Airport_ID = ?';
      params.push(destination);
    }
    if (date) {
      query += ' AND DATE(Dept_Time) = ?';
      params.push(date);
    }

    const [rows] = await promisePool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
