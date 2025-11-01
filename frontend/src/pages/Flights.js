import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [durationDialog, setDurationDialog] = useState({ open: false, duration: null, flightNo: '' });

  const calculateDuration = (deptTime, arrTime) => {
    const dept = new Date(deptTime);
    const arr = new Date(arrTime);
    const diffMs = arr - dept;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return { total: diffMins, hours, minutes };
  };

  const handleCalculateDuration = (row) => {
    const duration = calculateDuration(row.Dept_Time, row.Arr_Time);
    setDurationDialog({
      open: true,
      duration: duration,
      flightNo: row.Flight_No,
      deptTime: row.Dept_Time,
      arrTime: row.Arr_Time,
    });
  };

  const columns = [
    { field: 'Flight_No', headerName: 'Flight Number', width: 150 },
    { field: 'Aircraft_ID', headerName: 'Aircraft', width: 130 },
    { field: 'Dept_Airport_ID', headerName: 'Origin', width: 110 },
    { field: 'Arr_Airport_ID', headerName: 'Destination', width: 130 },
    { field: 'Dept_Time', headerName: 'Departure', width: 180 },
    { field: 'Arr_Time', headerName: 'Arrival', width: 180 },
    { 
      field: 'calculate', 
      headerName: 'Calculate Duration', 
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleCalculateDuration(params.row)}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2) rotate(15deg)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            },
          }}
        >
          <CalculateIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFlights();
      const flightsWithId = response.data.map((flight) => ({
        ...flight,
        id: flight.Flight_No,
      }));
      setFlights(flightsWithId);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createFlight(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateFlight(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteFlight(id);
  };

  return (
    <>
      <DataTable
        title="Flights"
        columns={columns}
        data={flights}
        loading={loading}
        onRefresh={fetchFlights}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        FormComponent={FlightForm}
      />

      <Dialog 
        open={durationDialog.open} 
        onClose={() => setDurationDialog({ open: false, duration: null, flightNo: '' })}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
            minWidth: '400px',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            pb: 1,
          }}
        >
          ⏱️ Flight Duration Calculator
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
              Flight {durationDialog.flightNo}
            </Typography>
            
            <Box sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              mb: 2,
            }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                color: '#667eea',
                mb: 1,
              }}>
                {durationDialog.duration?.hours}h {durationDialog.duration?.minutes}m
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Total: {durationDialog.duration?.total} minutes
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              p: 2,
              borderRadius: 2,
              bgcolor: '#f5f7fa',
            }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  🛫 Departure
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  {durationDialog.deptTime ? new Date(durationDialog.deptTime).toLocaleString() : ''}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  🛬 Arrival
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  {durationDialog.arrTime ? new Date(durationDialog.arrTime).toLocaleString() : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={() => setDurationDialog({ open: false, duration: null, flightNo: '' })}
            variant="contained"
            sx={{
              borderRadius: 2.5,
              px: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const FlightForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Flight_No: '',
      Aircraft_ID: '',
      Dept_Airport_ID: '',
      Arr_Airport_ID: '',
      Dept_Time: '',
      Arr_Time: '',
      Duration: '',
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
        name="Flight_No"
        label="Flight Number"
        value={formData.Flight_No}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "Flight Number cannot be changed" : "Enter unique Flight Number (e.g., FL001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Aircraft_ID"
        label="Aircraft ID"
        value={formData.Aircraft_ID}
        onChange={handleChange}
        required
        helperText="Must exist in Aircraft table (e.g., AC001)"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Dept_Airport_ID"
        label="Departure Airport ID"
        value={formData.Dept_Airport_ID}
        onChange={handleChange}
        required
        helperText="Must exist in Airport table (e.g., AP001)"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Arr_Airport_ID"
        label="Arrival Airport ID"
        value={formData.Arr_Airport_ID}
        onChange={handleChange}
        required
        helperText="Must exist in Airport table (e.g., AP002)"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Dept_Time"
        label="Departure Time"
        type="datetime-local"
        value={formData.Dept_Time}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Arr_Time"
        label="Arrival Time"
        type="datetime-local"
        value={formData.Arr_Time}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Duration"
        label="Duration (minutes)"
        type="number"
        value={formData.Duration}
        onChange={handleChange}
        required
        helperText="Flight duration in minutes"
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

export default Flights;
