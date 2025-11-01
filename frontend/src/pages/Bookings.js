import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const columns = [
  { field: 'Ticket_ID', headerName: 'Ticket ID', width: 120 },
  { field: 'Class', headerName: 'Class', width: 120 },
  { field: 'Seat_No', headerName: 'Seat Number', width: 120 },
  { field: 'Flight_No', headerName: 'Flight No', width: 120 },
  { field: 'Passenger_ID', headerName: 'Passenger ID', width: 120 },
  { field: 'Booking_Date', headerName: 'Booking Date', width: 180 },
];

const BookingForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Ticket_ID: '',
      Class: 'Eco',
      Seat_No: '',
      Flight_No: '',
      Passenger_ID: '',
      Booking_Date: new Date().toISOString().split('T')[0],
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        name="Ticket_ID"
        label="Ticket ID"
        value={formData.Ticket_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "ID cannot be changed" : "Enter unique Ticket ID (e.g., TKT001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Class"
        label="Class"
        select
        SelectProps={{ native: true }}
        value={formData.Class}
        onChange={handleChange}
        required
      >
        <option value="Eco">Economy</option>
        <option value="Premium Eco">Premium Economy</option>
        <option value="Business">Business</option>
        <option value="First">First Class</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        name="Seat_No"
        label="Seat Number"
        value={formData.Seat_No}
        onChange={handleChange}
        required
        helperText="e.g., 12A, 25B"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Flight_No"
        label="Flight Number"
        value={formData.Flight_No}
        onChange={handleChange}
        required
        helperText="e.g., FL01"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Passenger_ID"
        label="Passenger ID"
        value={formData.Passenger_ID}
        onChange={handleChange}
        required
        helperText="e.g., P001"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Booking_Date"
        label="Booking Date"
        type="date"
        value={formData.Booking_Date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await apiService.getBookings();
      const bookingsWithId = response.data.map((ticket) => ({
        ...ticket,
        id: ticket.Ticket_ID,
      }));
      setBookings(bookingsWithId);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createBooking(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateBooking(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteBooking(id);
  };

  return (
    <DataTable
      title="Bookings"
      columns={columns}
      data={bookings}
      loading={loading}
      onRefresh={fetchBookings}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={BookingForm}
    />
  );
};

export default Bookings;
