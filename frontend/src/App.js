import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Passengers from './pages/Passengers';
import Airlines from './pages/Airlines';
import Airports from './pages/Airports';
import Bookings from './pages/Bookings';
import Crew from './pages/Crew';
import Procedures from './pages/Procedures';
import AllTables from './pages/AllTables';
import Finance from './pages/Finance';

const drawerWidth = 260;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(41, 182, 246, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(102, 187, 106, 0.2) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite',
      },
      '@keyframes float': {
        '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
        '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
        '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
      },
    }}>
      <TopBar 
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle} 
      />
      <Sidebar 
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/passengers" element={<Passengers />} />
                <Route path="/airlines" element={<Airlines />} />
                <Route path="/airports" element={<Airports />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/crew" element={<Crew />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/procedures" element={<Procedures />} />
                <Route path="/tables" element={<AllTables />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
