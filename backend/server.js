const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const flightRoutes = require('./routes/flights');
const passengerRoutes = require('./routes/passengers');
const airlineRoutes = require('./routes/airlines');
const airportRoutes = require('./routes/airports');
const bookingRoutes = require('./routes/bookings');
const crewRoutes = require('./routes/crew');
const procedureRoutes = require('./routes/procedures');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const financeRoutes = require('./routes/finance');

// Use routes
app.use('/api/flights', flightRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/airlines', airlineRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/procedures', procedureRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Flight Management API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
