import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar 
} from '@mui/material';
import { Person as PersonIcon, SmartToy as BotIcon } from '@mui/icons-material';

function ChatMessage({ text, sender, isLoading = false }) {
  const isUser = sender === 'user';
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      mb: 3,
      maxWidth: '100%'
    }}>
      {!isUser && (
        <Avatar 
          sx={{ 
            mr: 2,
            bgcolor: '#84c0ee',
            width: 44,
            height: 44,
          }}
        >
          <BotIcon />
        </Avatar>
      )}
      
      <Paper sx={{ 
        p: 2.5, 
        maxWidth: '75%',
        backgroundColor: isUser ? '#1a202c' : '#ffffff',
        color: isUser ? '#ffffff' : '#1a202c',
        borderRadius: 3,
        boxShadow: isUser ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : '0px 2px 10px rgba(0, 0, 0, 0.05)',
        border: isUser ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {text}
        </Typography>
        {isLoading && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: isUser ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)' }}>
              Typing...
            </Typography>
          </Box>
        )}
      </Paper>
      
      {isUser && (
        <Avatar 
          sx={{ 
            ml: 2,
            bgcolor: '#909fb5',
            width: 44,
            height: 44,
          }}
        >
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
}

export default ChatMessage;