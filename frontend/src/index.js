import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
      light: '#8b9bec',
      dark: '#5568d3',
    },
    secondary: {
      main: '#764ba2',
      light: '#9167b8',
      dark: '#5e3c82',
    },
    success: {
      main: '#00e676',
      light: '#69f0ae',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 2px 12px rgba(33, 150, 243, 0.08)',
    '0 4px 16px rgba(33, 150, 243, 0.12)',
    '0 8px 24px rgba(33, 150, 243, 0.15)',
    '0 12px 32px rgba(33, 150, 243, 0.18)',
    '0 16px 40px rgba(33, 150, 243, 0.2)',
    '0 20px 48px rgba(33, 150, 243, 0.22)',
    '0 24px 56px rgba(33, 150, 243, 0.24)',
    ...Array(17).fill('0 24px 56px rgba(33, 150, 243, 0.24)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5568d3 0%, #5e3c82 100%)',
            boxShadow: '0 8px 20px 0 rgba(102, 126, 234, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(33, 150, 243, 0.12)',
          borderRadius: 20,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(33, 150, 243, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
        },
        elevation1: {
          boxShadow: '0 4px 16px rgba(33, 150, 243, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#667eea',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(102, 126, 234, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'rotate(8deg) scale(1.1)',
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
