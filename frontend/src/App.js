import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { StudyProvider } from './context/StudyContext';
import { ChatProvider } from './context/ChatContext';

// Create a custom theme with the specified colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#84c0ee', // Light blue
    },
    secondary: {
      main: '#909fb5', // Grey blue
    },
    background: {
      default: '#ffffff', // White
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c', // Dark blue/grey
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#1a202c',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1a202c',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#1a202c',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
      },
    },
  },
  spacing: factor => `${0.75 * factor}rem`, // Increase spacing throughout the app
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StudyProvider>
          <ChatProvider>
            <MainLayout />
          </ChatProvider>
        </StudyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;