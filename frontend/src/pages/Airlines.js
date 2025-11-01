import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const columns = [
  { field: 'Aircraft_ID', headerName: 'Aircraft ID', width: 120 },
  { field: 'Model', headerName: 'Model', width: 200 },
  { field: 'Capacity', headerName: 'Capacity', width: 120 },
  { field: 'Manufacturer', headerName: 'Manufacturer', width: 200 },
];

const AirlineForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Aircraft_ID: '',
      Model: '',
      Capacity: '',
      Manufacturer: 'Airbus',
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
        name="Aircraft_ID"
        label="Aircraft ID"
        value={formData.Aircraft_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "ID cannot be changed" : "Enter unique Aircraft ID (e.g., AC001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Model"
        label="Aircraft Model"
        value={formData.Model}
        onChange={handleChange}
        required
        helperText="e.g., Boeing 737, Airbus A320"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Capacity"
        label="Capacity"
        type="number"
        value={formData.Capacity}
        onChange={handleChange}
        required
        helperText="Total passenger capacity"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Manufacturer"
        label="Manufacturer"
        select
        SelectProps={{ native: true }}
        value={formData.Manufacturer}
        onChange={handleChange}
        required
      >
        <option value="Airbus">Airbus</option>
        <option value="Boeing">Boeing</option>
        <option value="Embraer">Embraer</option>
        <option value="Comac">Comac</option>
      </TextField>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAirlines();
  }, []);

  const fetchAirlines = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAirlines();
      const airlinesWithId = response.data.map((aircraft) => ({
        ...aircraft,
        id: aircraft.Aircraft_ID,
      }));
      setAirlines(airlinesWithId);
    } catch (error) {
      console.error('Error fetching airlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createAirline(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateAirline(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteAirline(id);
  };

  return (
    <DataTable
      title="Aircraft"
      columns={columns}
      data={airlines}
      loading={loading}
      onRefresh={fetchAirlines}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={AirlineForm}
    />
  );
};

export default Airlines;
