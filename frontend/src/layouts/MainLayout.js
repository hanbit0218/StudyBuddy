import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';
import StudyPlanPage from '../pages/StudyPlanPage';
import ResourcesPage from '../pages/ResourcesPage';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/study-plan" element={<StudyPlanPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default MainLayout;