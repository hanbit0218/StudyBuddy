import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Container 
} from '@mui/material';
import { 
  Chat as ChatIcon, 
  Schedule as ScheduleIcon, 
  LibraryBooks as ResourcesIcon 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  const features = [
    {
      title: 'Chat with AI',
      description: 'Ask questions about any subject and get instant help from your AI study assistant.',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      link: '/chat'
    },
    {
      title: 'Study Plans',
      description: 'Get personalized study plans tailored to your subjects, goals, and available time.',
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      link: '/study-plan'
    },
    {
      title: 'Learning Resources',
      description: 'Find the best resources for your subjects including articles, videos, and practice problems.',
      icon: <ResourcesIcon sx={{ fontSize: 40 }} />,
      link: '/resources'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            mb: 6,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to StudyBuddy
          </Typography>
          <Typography variant="h5" paragraph>
            Your AI-powered study assistant
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '600px' }}>
            StudyBuddy helps you study smarter, not harder. Get personalized study plans,
            ask questions, and find the best learning resources - all in one place.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
            component={RouterLink}
            to="/chat"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Paper>

        {/* Features Section */}
        <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          How StudyBuddy Can Help You
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={feature.link}
                  >
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;