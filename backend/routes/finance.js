const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all finance transactions
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT f.*, p.First_Name, p.Last_Name, t.Class, t.Seat_No
      FROM Finance f
      LEFT JOIN Passenger p ON f.Passenger_ID = p.Passenger_ID
      LEFT JOIN Tickets t ON f.Ticket_ID = t.Ticket_ID
      ORDER BY f.Date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching finance records:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get finance transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT f.*, p.First_Name, p.Last_Name, t.Class, t.Seat_No
       FROM Finance f
       LEFT JOIN Passenger p ON f.Passenger_ID = p.Passenger_ID
       LEFT JOIN Tickets t ON f.Ticket_ID = t.Ticket_ID
       WHERE f.Transaction_ID = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Finance record not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching finance record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new finance transaction
router.post('/', async (req, res) => {
  try {
    const { Transaction_ID, Amount, Date, Transaction_Type, Passenger_ID, Ticket_ID } = req.body;
    
    // TRIGGER: Validate Amount > 0
    if (!Amount || parseFloat(Amount) <= 0) {
      return res.status(400).json({ 
        error: 'Invalid transaction amount. Amount must be greater than 0.' 
      });
    }
    
    const [result] = await promisePool.query(
      'INSERT INTO Finance (Transaction_ID, Amount, Date, Transaction_Type, Passenger_ID, Ticket_ID) VALUES (?, ?, ?, ?, ?, ?)',
      [Transaction_ID, Amount, Date, Transaction_Type, Passenger_ID, Ticket_ID]
    );
    
    res.status(201).json({ 
      message: 'Finance record created successfully',
      id: Transaction_ID 
    });
  } catch (error) {
    console.error('Error creating finance record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update finance transaction
router.put('/:id', async (req, res) => {
  try {
    const { Amount, Date, Transaction_Type, Passenger_ID, Ticket_ID } = req.body;
    
    // TRIGGER: Validate Amount > 0
    if (Amount !== undefined && parseFloat(Amount) <= 0) {
      return res.status(400).json({ 
        error: 'Invalid transaction amount. Amount must be greater than 0.' 
      });
    }
    
    const [result] = await promisePool.query(
      'UPDATE Finance SET Amount = ?, Date = ?, Transaction_Type = ?, Passenger_ID = ?, Ticket_ID = ? WHERE Transaction_ID = ?',
      [Amount, Date, Transaction_Type, Passenger_ID, Ticket_ID, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Finance record not found' });
    }
    
    res.json({ message: 'Finance record updated successfully' });
  } catch (error) {
    console.error('Error updating finance record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete finance transaction
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Finance WHERE Transaction_ID = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Finance record not found' });
    }
    
    res.json({ message: 'Finance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting finance record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get finance statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const [stats] = await promisePool.query(`
      SELECT 
        COUNT(*) as total_transactions,
        SUM(Amount) as total_revenue,
        AVG(Amount) as average_transaction,
        Transaction_Type,
        COUNT(*) as type_count
      FROM Finance
      GROUP BY Transaction_Type
    `);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching finance stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
