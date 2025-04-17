import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar 
} from '@mui/material';
import { Person as PersonIcon, SmartToy as BotIcon } from '@mui/icons-material';

/**
 * ChatMessage component for displaying a single message in the chat interface
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The message text content
 * @param {string} props.sender - The sender of the message ('user' or 'bot')
 * @param {boolean} props.isLoading - Optional loading state for the message
 */
function ChatMessage({ text, sender, isLoading = false }) {
  const isUser = sender === 'user';
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      mb: 2,
      maxWidth: '100%'
    }}>
      {!isUser && (
        <Avatar 
          sx={{ 
            mr: 1,
            bgcolor: 'primary.main'
          }}
        >
          <BotIcon />
        </Avatar>
      )}
      
      <Paper sx={{ 
        p: 2, 
        maxWidth: '80%',
        backgroundColor: isUser ? 'secondary.light' : 'primary.light',
        color: isUser ? 'secondary.contrastText' : 'primary.contrastText',
        borderRadius: 2
      }}>
        <Typography variant="body1">
          {text}
        </Typography>
        {isLoading && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Typing...
            </Typography>
          </Box>
        )}
      </Paper>
      
      {isUser && (
        <Avatar 
          sx={{ 
            ml: 1,
            bgcolor: 'secondary.main'
          }}
        >
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
}

export default ChatMessage;