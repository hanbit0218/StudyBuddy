import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Container,
  Avatar,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon, SmartToy as BotIcon } from '@mui/icons-material';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      text: "Hi there! I'm your StudyBuddy AI assistant. How can I help you with your studies today?", 
      sender: 'bot' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: message, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Clear input field
    setMessage('');
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate AI response (this will be replaced with actual API call)
    setTimeout(() => {
      // Mock response based on user input
      let responseText = "I'm here to help with your studies. Could you tell me what subject you're working on?";
      
      if (message.toLowerCase().includes('math')) {
        responseText = "Mathematics is a great subject! What specific topic in math are you studying?";
      } else if (message.toLowerCase().includes('science')) {
        responseText = "Science is fascinating! Are you focused on biology, chemistry, physics, or another area?";
      } else if (message.toLowerCase().includes('help')) {
        responseText = "I'd be happy to help! I can assist with study plans, answer questions, or recommend resources. What do you need?";
      }
      
      const botMessage = { text: responseText, sender: 'bot' };
      setChatHistory(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat with StudyBuddy
        </Typography>
        
        {/* Chat history */}
        <List sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          mb: 2, 
          p: 2, 
          backgroundColor: '#f5f5f5',
          borderRadius: 1
        }}>
          {chatHistory.map((chat, index) => (
            <ListItem 
              key={index}
              sx={{ 
                flexDirection: 'column', 
                alignItems: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'flex-start',
                maxWidth: '80%'
              }}>
                <Avatar 
                  sx={{ 
                    mr: chat.sender === 'user' ? 1 : 0,
                    ml: chat.sender === 'bot' ? 0 : 1,
                    order: chat.sender === 'user' ? 0 : 1,
                    bgcolor: chat.sender === 'user' ? 'secondary.main' : 'primary.main'
                  }}
                >
                  {chat.sender === 'user' ? <PersonIcon /> : <BotIcon />}
                </Avatar>
                <Paper sx={{ 
                  p: 2, 
                  backgroundColor: chat.sender === 'user' ? 'secondary.light' : 'primary.light',
                  color: chat.sender === 'user' ? 'secondary.contrastText' : 'primary.contrastText',
                  borderRadius: 2
                }}>
                  <ListItemText primary={chat.text} />
                </Paper>
              </Box>
            </ListItem>
          ))}
          
          {isLoading && (
            <ListItem 
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                mb: 2
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '80%'
              }}>
                <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                  <BotIcon />
                </Avatar>
                <CircularProgress size={24} sx={{ ml: 2 }} />
              </Box>
            </ListItem>
          )}
        </List>
        
        {/* Message input */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ChatPage;