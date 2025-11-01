import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const DataTable = ({
  title,
  columns,
  data,
  loading,
  onRefresh,
  onAdd,
  onEdit,
  onDelete,
  FormComponent,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAdd = () => {
    setDialogMode('add');
    setSelectedRow(null);
    setOpenDialog(true);
  };

  const handleEdit = (row) => {
    setDialogMode('edit');
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await onDelete(id);
        setSnackbar({ open: true, message: 'Deleted successfully!', severity: 'success' });
        onRefresh();
      } catch (error) {
        setSnackbar({ open: true, message: error.message, severity: 'error' });
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (dialogMode === 'add') {
        await onAdd(formData);
        setSnackbar({ open: true, message: 'Added successfully!', severity: 'success' });
      } else {
        await onEdit(selectedRow.id, formData);
        setSnackbar({ open: true, message: 'Updated successfully!', severity: 'success' });
      }
      setOpenDialog(false);
      onRefresh();
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => handleEdit(params.row)}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg) scale(1.2)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDelete(params.row.id)}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg) scale(1.2)',
              boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  };

  const columnsWithActions = [...columns, actionColumn];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
            textShadow: '2px 2px 4px rgba(102, 126, 234, 0.2)',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            sx={{ 
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px) rotate(180deg)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
              },
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
              },
            }}
          >
            ✨ Add New
          </Button>
        </Box>
      </Box>

      <Paper 
        sx={{ 
          height: 600, 
          width: '100%',
          borderRadius: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={data}
          columns={columnsWithActions}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              transition: 'all 0.2s ease',
            },
            '& .MuiDataGrid-row': {
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                transform: 'scale(1.005)',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.1)',
              },
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f7fa',
              borderBottom: '2px solid #667eea',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#1a1a1a',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              color: '#1a1a1a',
            },
          }}
        />
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
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
          }}
        >
          {dialogMode === 'add' ? `✨ Add New ${title.slice(0, -1)}` : `✏️ Edit ${title.slice(0, -1)}`}
        </DialogTitle>
        <DialogContent>
          <FormComponent
            data={selectedRow}
            onSubmit={handleSubmit}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            animation: 'slideIn 0.3s ease',
            '@keyframes slideIn': {
              from: { transform: 'translateX(100%)' },
              to: { transform: 'translateX(0)' },
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DataTable;
