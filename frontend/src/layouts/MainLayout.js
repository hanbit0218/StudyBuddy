import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  Schedule as ScheduleIcon,
  LibraryBooks as ResourcesIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';
import StudyPlanPage from '../pages/StudyPlanPage';
import ResourcesPage from '../pages/ResourcesPage';

// Drawer width constant
const drawerWidth = 250;

function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Navigation items
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Study Plan', icon: <ScheduleIcon />, path: '/study-plan' },
    { text: 'Resources', icon: <ResourcesIcon />, path: '/resources' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#1a202c',
        }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'block', md: isMobile ? 'block' : 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StudyBuddy AI Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={isMobile ? toggleDrawer : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Toolbar sx={{ height: '70px' }} />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3, 
              color: '#1a202c',
              pl: 1,
            }}
          >
            Menu
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    borderRadius: '8px',
                    py: 1.2,
                    '&:hover': {
                      backgroundColor: 'rgba(132, 192, 238, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#84c0ee', minWidth: '40px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          minHeight: '100vh',
          backgroundColor: '#f7fafc',
          pt: '90px', // Increased padding-top to avoid content being under AppBar
        }}
      >
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/study-plan" element={<StudyPlanPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout;