import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import PeopleIcon from '@mui/icons-material/People';
import AirlinesIcon from '@mui/icons-material/Airlines';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import CodeIcon from '@mui/icons-material/Code';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Flights', icon: <FlightIcon />, path: '/flights' },
  { text: 'Passengers', icon: <PeopleIcon />, path: '/passengers' },
  { text: 'Aircraft', icon: <AirlinesIcon />, path: '/airlines' },
  { text: 'Airports', icon: <LocationOnIcon />, path: '/airports' },
  { text: 'Bookings', icon: <BookIcon />, path: '/bookings' },
  { text: 'Crew', icon: <GroupIcon />, path: '/crew' },
];

const advancedItems = [
  { text: 'Procedures & Triggers', icon: <CodeIcon />, path: '/procedures' },
  { text: 'All Tables', icon: <TableChartIcon />, path: '/tables' },
];

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasFinanceAccess } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        p: 3, 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'rotate 20s linear infinite',
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800,
            mb: 0.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          ✈️ Flight DB
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.95, position: 'relative', zIndex: 1 }}>
          Management System
        </Typography>
        {user && (
          <Box sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
            <Chip 
              label={user.role} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.25)', 
                color: 'white',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }} 
            />
            <Typography variant="caption" display="block" sx={{ mt: 0.8, opacity: 0.9, fontWeight: 600 }}>
              👤 {user.username}
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.1)' }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  transform: 'translateX(4px)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    transform: 'translateX(8px)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    background: 'white',
                    borderRadius: '0 4px 4px 0',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(102, 126, 234, 0.08)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'primary.main',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
          ))}
        </List>
        
        {/* Finance Menu Item - Only visible for CEO and Manager */}
        {hasFinanceAccess() && (
          <>
            <Divider sx={{ mx: 2 }} />
            <List sx={{ px: 1, py: 2 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={location.pathname === '/finance'}
                  onClick={() => {
                    navigate('/finance');
                    if (mobileOpen) handleDrawerToggle();
                  }}
                  sx={{
                    borderRadius: 3,
                    mb: 0.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(56, 239, 125, 0.4)',
                      transform: 'translateX(4px)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0e8578 0%, #2dd46b 100%)',
                        transform: 'translateX(8px)',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(56, 239, 125, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === '/finance' ? 'white' : 'success.main',
                      minWidth: 40,
                    }}
                  >
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Finance"
                    primaryTypographyProps={{
                      fontWeight: location.pathname === '/finance' ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}

        <Divider sx={{ mx: 2 }} />
        <List sx={{ px: 1, py: 2 }}>
          <ListItem>
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Advanced
            </Typography>
          </ListItem>
          {advancedItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(240, 147, 251, 0.4)',
                  transform: 'translateX(4px)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
                    transform: 'translateX(8px)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(240, 147, 251, 0.08)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'secondary.main',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* Logout Button at Bottom */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(102, 126, 234, 0.1)', background: 'rgba(255, 255, 255, 0.5)' }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ 
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'error.main',
            color: 'error.main',
            fontWeight: 700,
            py: 1.2,
            background: 'rgba(244, 67, 54, 0.05)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
              color: 'white',
              borderColor: 'transparent',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(244, 67, 54, 0.35)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
