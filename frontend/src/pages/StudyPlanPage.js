import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Timer as TimerIcon,
  Topic as TopicIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

function StudyPlanPage() {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('1 hour');
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);

  const handleAddTopic = () => {
    if (!topic.trim()) return;
    setTopics(prev => [...prev, topic.trim()]);
    setTopic('');
  };

  const handleRemoveTopic = (topicToRemove) => {
    setTopics(prev => prev.filter(t => t !== topicToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTopic();
    }
  };

  const handleGeneratePlan = () => {
    if (!subject.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock response
      const mockPlan = {
        subject: subject,
        duration: duration,
        sections: [
          {
            topic: `Introduction to ${subject}`,
            duration: '15 minutes',
            activities: [
              'Review key concepts and terminology',
              'Read introductory material'
            ]
          },
          {
            topic: `Core principles of ${subject}`,
            duration: '30 minutes',
            activities: [
              'Practice problems',
              'Take detailed notes',
              'Create concept maps'
            ]
          },
          {
            topic: 'Review and synthesis',
            duration: '15 minutes',
            activities: [
              'Summarize what you learned',
              'Create connections with previous knowledge',
              'Quiz yourself on key concepts'
            ]
          }
        ]
      };
      
      setStudyPlan(mockPlan);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Create a Study Plan
        </Typography>
        <Typography variant="body1" paragraph>
          Get a personalized study plan based on your subject, available time, and specific topics.
        </Typography>
        
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Study Details
              </Typography>
              
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                margin="normal"
                required
                helperText="Enter the main subject you want to study"
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="duration-label">Study Duration</InputLabel>
                <Select
                  labelId="duration-label"
                  value={duration}
                  label="Study Duration"
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <MenuItem value="30 minutes">30 minutes</MenuItem>
                  <MenuItem value="1 hour">1 hour</MenuItem>
                  <MenuItem value="2 hours">2 hours</MenuItem>
                  <MenuItem value="3 hours">3 hours</MenuItem>
                  <MenuItem value="4 hours">4 hours</MenuItem>
                </Select>
                <FormHelperText>Select how much time you have available</FormHelperText>
              </FormControl>
              
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Specific Topics (Optional)
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    fullWidth
                    label="Add Topic"
                    variant="outlined"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ mr: 1 }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddTopic}
                    disabled={!topic.trim()}
                  >
                    Add
                  </Button>
                </Box>
                <FormHelperText>Add specific topics you want to focus on</FormHelperText>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {topics.map((t, index) => (
                  <Chip 
                    key={index}
                    label={t}
                    onDelete={() => handleRemoveTopic(t)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                onClick={handleGeneratePlan}
                disabled={!subject.trim() || isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Generate Study Plan'}
              </Button>
            </Paper>
          </Grid>
          
          {/* Results Section */}
          <Grid item xs={12} md={6}>
            {studyPlan ? (
              <Card elevation={3}>
                <CardHeader
                  title={`${studyPlan.subject} Study Plan`}
                  subheader={`Duration: ${studyPlan.duration}`}
                  sx={{ backgroundColor: 'primary.light', color: 'primary.contrastText' }}
                />
                <CardContent>
                  {studyPlan.sections.map((section, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TopicIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">{section.topic}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 1 }}>
                        <TimerIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {section.duration}
                        </Typography>
                      </Box>
                      <List dense sx={{ ml: 4 }}>
                        {section.activities.map((activity, actIndex) => (
                          <ListItem key={actIndex} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: '30px' }}>
                              <AssignmentIcon fontSize="small" color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={activity} />
                          </ListItem>
                        ))}
                      </List>
                      {index < studyPlan.sections.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mt: 2 }}
                  >
                    Save This Plan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <TopicIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Your Study Plan Will Appear Here
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fill out the form and click "Generate Study Plan" to create a personalized plan based on your needs.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default StudyPlanPage;