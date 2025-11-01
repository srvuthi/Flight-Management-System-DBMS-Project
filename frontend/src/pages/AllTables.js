import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TableChartIcon from '@mui/icons-material/TableChart';
import { apiService } from '../services/api';

const AllTables = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await apiService.getTables();
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName) => {
    setDataLoading(true);
    try {
      const response = await apiService.getTableData(tableName);
      const data = response.data;
      
      if (data.length > 0) {
        // Generate columns from first row
        const cols = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          width: 150,
          flex: 1,
        }));
        setColumns(cols);

        // Add id field for DataGrid
        const dataWithId = data.map((row, index) => ({
          ...row,
          id: row[Object.keys(row).find(k => k.includes('_id'))] || index,
        }));
        setTableData(dataWithId);
      } else {
        setColumns([]);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    fetchTableData(table.name);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        All Database Tables
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 200px)' }}>
        {/* Table List */}
        <Paper sx={{ width: 300, overflow: 'auto' }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Tables ({tables.length})</Typography>
          </Box>
          <List>
            {tables.map((table, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedTable?.name === table.name}
                    onClick={() => handleTableSelect(table)}
                  >
                    <ListItemIcon>
                      <TableChartIcon color={selectedTable?.name === table.name ? 'primary' : 'action'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={table.name}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                          <Chip label={`${table.rows || 0} rows`} size="small" />
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {index < tables.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Table Data */}
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {!selectedTable ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Alert severity="info">Select a table to view its data</Alert>
            </Box>
          ) : (
            <>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">{selectedTable.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total rows: {selectedTable.rows || 0}
                  {selectedTable.created && ` • Created: ${new Date(selectedTable.created).toLocaleDateString()}`}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                {dataLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ) : tableData.length === 0 ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Alert severity="info">No data in this table</Alert>
                  </Box>
                ) : (
                  <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25, 50, 100]}
                    disableSelectionOnClick
                    sx={{ border: 'none' }}
                  />
                )}
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AllTables;
