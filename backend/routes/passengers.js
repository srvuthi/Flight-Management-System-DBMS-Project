const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all passengers
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Passenger ORDER BY Last_Name, First_Name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching passengers:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get passenger by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Passenger WHERE Passenger_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Passenger not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching passenger:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new passenger
router.post('/', async (req, res) => {
  try {
    const { Contact_No, Total_Tickets } = req.body;
    
    // TRIGGER: Validate Contact Number format (10-15 digits)
    if (Contact_No) {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(Contact_No.replace(/[\s\-\+]/g, ''))) {
        return res.status(400).json({ 
          error: 'Invalid contact number. Must be 10-15 digits.' 
        });
      }
    }
    
    // TRIGGER: Validate Total_Tickets >= 0
    if (Total_Tickets !== undefined && parseInt(Total_Tickets) < 0) {
      return res.status(400).json({ 
        error: 'Invalid ticket count. Total tickets cannot be negative.' 
      });
    }
    
    const [result] = await promisePool.query(
      'INSERT INTO Passenger SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Passenger created successfully',
      id: req.body.Passenger_ID 
    });
  } catch (error) {
    console.error('Error creating passenger:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update passenger
router.put('/:id', async (req, res) => {
  try {
    const { First_Name, Last_Name, Gender, Nationality, Contact_No, Total_Tickets } = req.body;
    
    // TRIGGER: Validate Contact Number format (10-15 digits)
    if (Contact_No) {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(Contact_No.replace(/[\s\-\+]/g, ''))) {
        return res.status(400).json({ 
          error: 'Invalid contact number. Must be 10-15 digits.' 
        });
      }
    }
    
    // TRIGGER: Validate Total_Tickets >= 0
    if (Total_Tickets !== undefined && parseInt(Total_Tickets) < 0) {
      return res.status(400).json({ 
        error: 'Invalid ticket count. Total tickets cannot be negative.' 
      });
    }
    
    const [result] = await promisePool.query(
      'UPDATE Passenger SET First_Name = ?, Last_Name = ?, Gender = ?, Nationality = ?, Contact_No = ?, Total_Tickets = ? WHERE Passenger_ID = ?',
      [First_Name, Last_Name, Gender, Nationality, Contact_No, Total_Tickets, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Passenger not found' });
    }
    res.json({ message: 'Passenger updated successfully' });
  } catch (error) {
    console.error('Error updating passenger:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete passenger
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Passenger WHERE Passenger_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Passenger not found' });
    }
    res.json({ message: 'Passenger deleted successfully' });
  } catch (error) {
    console.error('Error deleting passenger:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
