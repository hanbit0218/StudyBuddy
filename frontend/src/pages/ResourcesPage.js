import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Chip,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Article as ArticleIcon,
  VideoLibrary as VideoIcon,
  Quiz as QuizIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Predefined popular subjects
  const popularSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Computer Science', 'History', 'Literature', 'Economics'
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock response
      const mockResources = [
        {
          title: `Introduction to ${searchTerm}`,
          description: `A comprehensive introduction to key concepts in ${searchTerm}. Perfect for beginners who want to understand the fundamentals.`,
          type: 'article',
          url: `https://example.com/${searchTerm.toLowerCase().replace(' ', '-')}-intro`,
          imageUrl: 'https://via.placeholder.com/400x200'
        },
        {
          title: `${searchTerm} Video Tutorial Series`,
          description: `Visual explanations of ${searchTerm} concepts with step-by-step examples and demonstrations.`,
          type: 'video',
          url: `https://example.com/${searchTerm.toLowerCase().replace(' ', '-')}-videos`,
          imageUrl: 'https://via.placeholder.com/400x200'
        },
        {
          title: `${searchTerm} Practice Problems`,
          description: `A collection of practice problems with solutions to test your understanding of ${searchTerm}.`,
          type: 'exercises',
          url: `https://example.com/${searchTerm.toLowerCase().replace(' ', '-')}-practice`,
          imageUrl: 'https://via.placeholder.com/400x200'
        },
        {
          title: `Advanced ${searchTerm} Concepts`,
          description: `Dive deeper into advanced topics in ${searchTerm} with detailed explanations and examples.`,
          type: 'article',
          url: `https://example.com/${searchTerm.toLowerCase().replace(' ', '-')}-advanced`,
          imageUrl: 'https://via.placeholder.com/400x200'
        }
      ];
      
      setResources(mockResources);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <ArticleIcon />;
      case 'video':
        return <VideoIcon />;
      case 'exercises':
        return <QuizIcon />;
      default:
        return <ArticleIcon />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article':
        return 'primary';
      case 'video':
        return 'error';
      case 'exercises':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Study Resources
        </Typography>
        <Typography variant="body1" paragraph>
          Find the best learning resources for your subjects. Search for articles, videos, and practice problems.
        </Typography>
        
        {/* Search Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Search for a subject"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isLoading}
              sx={{ height: 56, minWidth: 100 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Popular Subjects
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {popularSubjects.map((subject) => (
                <Chip
                  key={subject}
                  label={subject}
                  onClick={() => {
                    setSearchTerm(subject);
                    // Optional: auto-search when clicking a popular subject
                    // setTimeout(() => handleSearch(), 0);
                  }}
                  clickable
                />
              ))}
            </Box>
          </Box>
        </Paper>
        
        {/* Results Section */}
        {hasSearched && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h2">
                {isLoading ? 'Searching...' : `Resources for "${searchTerm}"`}
              </Typography>
              {resources.length > 0 && !isLoading && (
                <Typography variant="body2" color="text.secondary">
                  Found {resources.length} resources
                </Typography>
              )}
            </Box>
            
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {resources.map((resource, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={resource.imageUrl}
                        alt={resource.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" component="div">
                            {resource.title}
                          </Typography>
                          <Chip 
                            icon={getTypeIcon(resource.type)}
                            label={resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                            color={getTypeColor(resource.type)}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {resource.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          endIcon={<OpenInNewIcon />}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Resource
                        </Button>
                        <Button size="small">Save</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            
            {hasSearched && !isLoading && resources.length === 0 && (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  No resources found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We couldn't find any resources matching your search. Try a different subject or check your spelling.
                </Typography>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default ResourcesPage;