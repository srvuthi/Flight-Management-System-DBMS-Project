import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const columns = [
  { field: 'Passenger_ID', headerName: 'ID', width: 110 },
  { field: 'First_Name', headerName: 'First Name', width: 150 },
  { field: 'Last_Name', headerName: 'Last Name', width: 150 },
  { field: 'Gender', headerName: 'Gender', width: 100 },
  { field: 'Nationality', headerName: 'Nationality', width: 150 },
  { field: 'Contact_No', headerName: 'Contact', width: 150 },
  { field: 'Total_Tickets', headerName: 'Total Tickets', width: 130 },
];

const PassengerForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Passenger_ID: '',
      First_Name: '',
      Last_Name: '',
      Gender: 'M',
      Nationality: '',
      Contact_No: '',
      Total_Tickets: 0,
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
        name="Passenger_ID"
        label="Passenger ID"
        value={formData.Passenger_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "ID cannot be changed" : "Enter unique Passenger ID (e.g., P001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="First_Name"
        label="First Name"
        value={formData.First_Name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Last_Name"
        label="Last Name"
        value={formData.Last_Name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Gender"
        label="Gender"
        select
        SelectProps={{ native: true }}
        value={formData.Gender}
        onChange={handleChange}
        required
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        name="Nationality"
        label="Nationality"
        value={formData.Nationality}
        onChange={handleChange}
        helperText="e.g., American, British, Indian"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Contact_No"
        label="Contact Number"
        value={formData.Contact_No}
        onChange={handleChange}
        required
        helperText="Phone number with country code"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Total_Tickets"
        label="Total Tickets"
        type="number"
        value={formData.Total_Tickets}
        onChange={handleChange}
        helperText="Leave as 0 for new passengers"
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

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    setLoading(true);
    try {
      const response = await apiService.getPassengers();
      const passengersWithId = response.data.map((passenger) => ({
        ...passenger,
        id: passenger.Passenger_ID,
      }));
      setPassengers(passengersWithId);
    } catch (error) {
      console.error('Error fetching passengers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createPassenger(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updatePassenger(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deletePassenger(id);
  };

  return (
    <DataTable
      title="Passengers"
      columns={columns}
      data={passengers}
      loading={loading}
      onRefresh={fetchPassengers}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={PassengerForm}
    />
  );
};

export default Passengers;
