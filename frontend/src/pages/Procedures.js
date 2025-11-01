import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { apiService } from '../services/api';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Procedures = () => {
  const [tabValue, setTabValue] = useState(0);
  const [procedures, setProcedures] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executeDialog, setExecuteDialog] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [procRes, funcRes, trigRes] = await Promise.all([
        apiService.getProcedures(),
        apiService.getFunctions(),
        apiService.getTriggers(),
      ]);
      setProcedures(procRes.data);
      setFunctions(funcRes.data);
      setTriggers(trigRes.data);
    } catch (error) {
      console.error('Error fetching procedures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = (procedure) => {
    setSelectedProcedure(procedure);
    setParameters('');
    setResult(null);
    setExecuteDialog(true);
  };

  const executeProcedure = async () => {
    try {
      const params = parameters.split(',').map(p => p.trim()).filter(p => p);
      const response = await apiService.executeProcedure(selectedProcedure.name, params);
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.response?.data?.error || error.message });
    }
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
        Procedures, Functions & Triggers
      </Typography>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label={`Procedures (${procedures.length})`} />
          <Tab label={`Functions (${functions.length})`} />
          <Tab label={`Triggers (${triggers.length})`} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {procedures.length === 0 ? (
            <Alert severity="info">No stored procedures found</Alert>
          ) : (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {procedures.map((proc, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CodeIcon color="primary" />
                          {proc.name}
                        </Typography>
                        {proc.comment && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {proc.comment}
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleExecute(proc)}
                      >
                        Execute
                      </Button>
                    </Box>
                    {proc.created && (
                      <Typography variant="caption" color="text.secondary">
                        Created: {new Date(proc.created).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {functions.length === 0 ? (
            <Alert severity="info">No functions found</Alert>
          ) : (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {functions.map((func, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CodeIcon color="secondary" />
                      {func.name}
                    </Typography>
                    {func.comment && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {func.comment}
                      </Typography>
                    )}
                    {func.created && (
                      <Typography variant="caption" color="text.secondary">
                        Created: {new Date(func.created).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {triggers.length === 0 ? (
            <Alert severity="info">No triggers found</Alert>
          ) : (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {triggers.map((trigger, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon sx={{ color: '#ed6c02' }} />
                        {trigger.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label={trigger.timing} size="small" color="primary" />
                        <Chip label={trigger.event} size="small" color="secondary" />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Table: <strong>{trigger.table_name}</strong>
                    </Typography>
                    {trigger.created && (
                      <Typography variant="caption" color="text.secondary">
                        Created: {new Date(trigger.created).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </TabPanel>
      </Paper>

      <Dialog open={executeDialog} onClose={() => setExecuteDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Execute Procedure: {selectedProcedure?.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Parameters (comma-separated)"
            placeholder="e.g., 1, 'John', 2023-01-01"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            helperText="Enter parameters separated by commas. Leave empty if no parameters needed."
          />
          {result && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Result:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExecuteDialog(false)}>Close</Button>
          <Button variant="contained" onClick={executeProcedure} startIcon={<PlayArrowIcon />}>
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Procedures;
