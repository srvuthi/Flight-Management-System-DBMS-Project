import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Alert, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography,
  Divider 
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataTable from '../components/Common/DataTable';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const columns = [
  { field: 'Transaction_ID', headerName: 'Transaction ID', width: 140 },
  { field: 'Amount', headerName: 'Amount ($)', width: 130 },
  { field: 'Date', headerName: 'Date', width: 130 },
  { field: 'Transaction_Type', headerName: 'Payment Type', width: 140 },
  { field: 'Passenger_ID', headerName: 'Passenger ID', width: 130 },
  { field: 'First_Name', headerName: 'First Name', width: 130 },
  { field: 'Last_Name', headerName: 'Last Name', width: 130 },
  { field: 'Ticket_ID', headerName: 'Ticket ID', width: 120 },
];

const FinanceForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    data || {
      Transaction_ID: '',
      Amount: '',
      Date: new Date().toISOString().split('T')[0],
      Transaction_Type: 'Card',
      Passenger_ID: '',
      Ticket_ID: '',
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
        name="Transaction_ID"
        label="Transaction ID"
        value={formData.Transaction_ID}
        onChange={handleChange}
        required
        disabled={!!data}
        helperText={data ? "Transaction ID cannot be changed" : "Enter unique Transaction ID (e.g., F001)"}
      />
      <TextField
        fullWidth
        margin="normal"
        name="Amount"
        label="Amount"
        type="number"
        value={formData.Amount}
        onChange={handleChange}
        required
        helperText="Transaction amount in dollars"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Date"
        label="Transaction Date"
        type="date"
        value={formData.Date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="Transaction_Type"
        label="Payment Type"
        select
        SelectProps={{ native: true }}
        value={formData.Transaction_Type}
        onChange={handleChange}
        required
      >
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        name="Passenger_ID"
        label="Passenger ID"
        value={formData.Passenger_ID}
        onChange={handleChange}
        helperText="Must exist in Passenger table (e.g., P001)"
      />
      <TextField
        fullWidth
        margin="normal"
        name="Ticket_ID"
        label="Ticket ID"
        value={formData.Ticket_ID}
        onChange={handleChange}
        helperText="Must exist in Tickets table (e.g., TKT001)"
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

const Finance = () => {
  const [finance, setFinance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revenueDialog, setRevenueDialog] = useState({ open: false, total: 0, count: 0, breakdown: {} });
  const { hasFinanceAccess, user } = useAuth();

  useEffect(() => {
    if (hasFinanceAccess()) {
      fetchFinance();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotalRevenue = () => {
    const total = finance.reduce((sum, transaction) => {
      return sum + parseFloat(transaction.Amount || 0);
    }, 0);

    // Calculate breakdown by payment type
    const breakdown = finance.reduce((acc, transaction) => {
      const type = transaction.Transaction_Type || 'Unknown';
      acc[type] = (acc[type] || 0) + parseFloat(transaction.Amount || 0);
      return acc;
    }, {});

    setRevenueDialog({
      open: true,
      total: total,
      count: finance.length,
      breakdown: breakdown,
    });
  };

  const fetchFinance = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFinance();
      const financeWithId = response.data.map((record) => ({
        ...record,
        id: record.Transaction_ID,
      }));
      setFinance(financeWithId);
    } catch (error) {
      console.error('Error fetching finance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    await apiService.createFinance(data);
  };

  const handleEdit = async (id, data) => {
    await apiService.updateFinance(id, data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteFinance(id);
  };

  // Check if user has access
  if (!hasFinanceAccess()) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <strong>Access Denied</strong>
          <br />
          Only CEO and Airport Manager roles can access Financial records.
          <br />
          Your current role: <strong>{user?.role || 'Unknown'}</strong>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box />
        <Button
          variant="contained"
          startIcon={<TrendingUpIcon />}
          onClick={calculateTotalRevenue}
          sx={{
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            borderRadius: 2.5,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: '0 4px 14px 0 rgba(0, 230, 118, 0.25)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #00c853 0%, #00a844 100%)',
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 24px 0 rgba(0, 230, 118, 0.35)',
            },
          }}
        >
          💰 Calculate Total Revenue
        </Button>
      </Box>

      <DataTable
        title="Financial Transactions"
        columns={columns}
        data={finance}
        loading={loading}
        onRefresh={fetchFinance}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        FormComponent={FinanceForm}
      />

      <Dialog 
        open={revenueDialog.open} 
        onClose={() => setRevenueDialog({ open: false, total: 0, count: 0, breakdown: {} })}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 230, 118, 0.3)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            pb: 2,
          }}
        >
          💰 Total Revenue Report
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 200, 83, 0.15) 100%)',
              mb: 3,
              border: '2px solid rgba(0, 230, 118, 0.3)',
            }}>
              <Typography variant="caption" sx={{ 
                color: '#00c853',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                mb: 1,
                display: 'block',
              }}>
                Total Revenue
              </Typography>
              <Typography variant="h2" sx={{ 
                fontWeight: 900,
                color: '#00e676',
                mb: 1,
                textShadow: '2px 2px 4px rgba(0, 230, 118, 0.2)',
              }}>
                ${revenueDialog.total.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                From {revenueDialog.count} transactions
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Breakdown by Payment Type
              </Typography>
            </Divider>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
            }}>
              {Object.entries(revenueDialog.breakdown).map(([type, amount]) => (
                <Box 
                  key={type}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#f5f7fa',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#e3f2fd',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoneyIcon sx={{ color: '#00c853' }} />
                    <Typography variant="body1" fontWeight="600">
                      {type}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#00e676',
                  }}>
                    ${amount.toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>

            {revenueDialog.count === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                No transactions found. Add transactions to see revenue data.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={() => setRevenueDialog({ open: false, total: 0, count: 0, breakdown: {} })}
            variant="contained"
            sx={{
              borderRadius: 2.5,
              px: 4,
              background: 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Finance;
