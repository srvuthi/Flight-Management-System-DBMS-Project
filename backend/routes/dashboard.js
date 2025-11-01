const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get counts from various tables
    const stats = {};
    
    // Total flights
    const [flightCount] = await promisePool.query('SELECT COUNT(*) as count FROM Flight');
    stats.totalFlights = flightCount[0].count;
    
    // Total passengers
    const [passengerCount] = await promisePool.query('SELECT COUNT(*) as count FROM Passenger');
    stats.totalPassengers = passengerCount[0].count;
    
    // Total bookings
    const [bookingCount] = await promisePool.query('SELECT COUNT(*) as count FROM Tickets');
    stats.totalBookings = bookingCount[0].count;
    
    // Total aircraft (airlines)
    const [airlineCount] = await promisePool.query('SELECT COUNT(*) as count FROM Aircraft');
    stats.totalAirlines = airlineCount[0].count;
    
    // Total airports
    const [airportCount] = await promisePool.query('SELECT COUNT(*) as count FROM Airport');
    stats.totalAirports = airportCount[0].count;
    
    // Total admins (crew)
    const [crewCount] = await promisePool.query('SELECT COUNT(*) as count FROM Admin');
    stats.totalCrew = crewCount[0].count;
    
    // Recent bookings
    const [recentBookings] = await promisePool.query(`
      SELECT t.*, p.First_Name as first_name, p.Last_Name as last_name, t.Flight_No as flight_number
      FROM Tickets t
      LEFT JOIN Passenger p ON t.Passenger_ID = p.Passenger_ID
      ORDER BY t.Booking_Date DESC
      LIMIT 5
    `);
    stats.recentBookings = recentBookings;
    
    // Upcoming flights
    const [upcomingFlights] = await promisePool.query(`
      SELECT *, Flight_No as flight_number, 'Scheduled' as status FROM Flight
      WHERE Dept_Time > NOW()
      ORDER BY Dept_Time ASC
      LIMIT 5
    `);
    stats.upcomingFlights = upcomingFlights;
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all table names in the database
router.get('/tables', async (req, res) => {
  try {
    const [tables] = await promisePool.query(`
      SELECT TABLE_NAME as name, TABLE_ROWS as rows, 
             CREATE_TIME as created, UPDATE_TIME as updated
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
      ORDER BY TABLE_NAME
    `);
    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get data from any table
router.get('/table/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const [rows] = await promisePool.query(`SELECT * FROM ?? LIMIT 1000`, [tableName]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
