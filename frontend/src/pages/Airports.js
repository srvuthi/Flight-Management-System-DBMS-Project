import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const columns = [
  { field: 'Airport_ID', headerName: 'Airport ID', width: 120 },
  { field: 'Name', headerName: 'Airport Name', width: 250 },
  { field: 'Location', headerName: 'Location', width: 200 },
];

const AirportForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Airport_ID: '',
      Name: '',
      Location: '',
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
        name="Airport_ID"
        label="Airport ID"
        value={formData.Airport_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "ID cannot be changed" : "Enter unique Airport ID (e.g., AP001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Name"
        label="Airport Name"
        value={formData.Name}
        onChange={handleChange}
        required
        helperText="e.g., John F. Kennedy International Airport"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Location"
        label="Location"
        value={formData.Location}
        onChange={handleChange}
        required
        helperText="City, Country (e.g., New York, USA)"
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

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAirports();
      const airportsWithId = response.data.map((airport) => ({
        ...airport,
        id: airport.Airport_ID,
      }));
      setAirports(airportsWithId);
    } catch (error) {
      console.error('Error fetching airports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createAirport(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateAirport(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteAirport(id);
  };

  return (
    <DataTable
      title="Airports"
      columns={columns}
      data={airports}
      loading={loading}
      onRefresh={fetchAirports}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={AirportForm}
    />
  );
};

export default Airports;
