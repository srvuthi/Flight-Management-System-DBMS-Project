import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const columns = [
  { field: 'Admin_ID', headerName: 'Admin ID', width: 120 },
  { field: 'Roles', headerName: 'Roles', width: 200 },
  { field: 'Username', headerName: 'Username', width: 200 },
];

const CrewForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Admin_ID: '',
      Roles: 'Employee',
      Username: '',
      Password: '',
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
        name="Admin_ID"
        label="Admin ID"
        value={formData.Admin_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "ID cannot be changed" : "Enter unique Admin ID (e.g., ADM001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Roles"
        label="Role"
        select
        SelectProps={{ native: true }}
        value={formData.Roles}
        onChange={handleChange}
        required
      >
        <option value="Employee">Employee</option>
        <option value="Airport_Manager">Airport Manager</option>
        <option value="CEO">CEO</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        name="Username"
        label="Username"
        value={formData.Username}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Password"
        label="Password"
        type="password"
        value={formData.Password}
        onChange={handleChange}
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

const Crew = () => {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrew();
  }, []);

  const fetchCrew = async () => {
    setLoading(true);
    try {
      const response = await apiService.getCrew();
      const crewWithId = response.data.map((admin) => ({
        ...admin,
        id: admin.Admin_ID,
      }));
      setCrew(crewWithId);
    } catch (error) {
      console.error('Error fetching crew:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createCrewMember(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateCrewMember(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteCrewMember(id);
  };

  return (
    <DataTable
      title="Crew"
      columns={columns}
      data={crew}
      loading={loading}
      onRefresh={fetchCrew}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={CrewForm}
    />
  );
};

export default Crew;
