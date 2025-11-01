const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all bookings (tickets)
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT t.*, p.First_Name, p.Last_Name, f.Dept_Time, f.Arr_Time
      FROM Tickets t
      LEFT JOIN Passenger p ON t.Passenger_ID = p.Passenger_ID
      LEFT JOIN Flight f ON t.Flight_No = f.Flight_No
      ORDER BY t.Booking_Date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT t.*, p.First_Name, p.Last_Name, f.Dept_Time, f.Arr_Time
       FROM Tickets t
       LEFT JOIN Passenger p ON t.Passenger_ID = p.Passenger_ID
       LEFT JOIN Flight f ON t.Flight_No = f.Flight_No
       WHERE t.Ticket_ID = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { Seat_No, Flight_No, Passenger_ID } = req.body;
    
    // TRIGGER: Validate Seat Number format (e.g., 12A, 5B)
    if (Seat_No) {
      const seatRegex = /^\d{1,3}[A-F]$/i;
      if (!seatRegex.test(Seat_No)) {
        return res.status(400).json({ 
          error: 'Invalid seat number format. Must be in format like 12A, 5B, etc.' 
        });
      }
    }
    
    // TRIGGER: Check for duplicate seat booking on same flight
    if (Seat_No && Flight_No) {
      const [existing] = await promisePool.query(
        'SELECT Ticket_ID FROM Tickets WHERE Seat_No = ? AND Flight_No = ?',
        [Seat_No, Flight_No]
      );
      if (existing.length > 0) {
        return res.status(400).json({ 
          error: 'This seat is already booked for this flight.' 
        });
      }
    }
    
    const [result] = await promisePool.query(
      'INSERT INTO Tickets SET ?',
      [req.body]
    );
    res.status(201).json({ 
      message: 'Ticket created successfully',
      id: req.body.Ticket_ID 
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const { Class, Seat_No, Flight_No, Passenger_ID, Booking_Date } = req.body;
    
    // TRIGGER: Validate Seat Number format (e.g., 12A, 5B)
    if (Seat_No) {
      const seatRegex = /^\d{1,3}[A-F]$/i;
      if (!seatRegex.test(Seat_No)) {
        return res.status(400).json({ 
          error: 'Invalid seat number format. Must be in format like 12A, 5B, etc.' 
        });
      }
    }
    
    // TRIGGER: Check for duplicate seat booking on same flight (excluding current ticket)
    if (Seat_No && Flight_No) {
      const [existing] = await promisePool.query(
        'SELECT Ticket_ID FROM Tickets WHERE Seat_No = ? AND Flight_No = ? AND Ticket_ID != ?',
        [Seat_No, Flight_No, req.params.id]
      );
      if (existing.length > 0) {
        return res.status(400).json({ 
          error: 'This seat is already booked for this flight.' 
        });
      }
    }
    
    const [result] = await promisePool.query(
      'UPDATE Tickets SET Class = ?, Seat_No = ?, Flight_No = ?, Passenger_ID = ?, Booking_Date = ? WHERE Ticket_ID = ?',
      [Class, Seat_No, Flight_No, Passenger_ID, Booking_Date, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Tickets WHERE Ticket_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
