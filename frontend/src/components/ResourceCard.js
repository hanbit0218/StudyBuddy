import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import {
  Article as ArticleIcon,
  VideoLibrary as VideoIcon,
  Quiz as QuizIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

function ResourceCard({ 
  title, 
  description, 
  type, 
  url, 
  imageUrl, 
  onSave = () => {} 
}) {
  // Get the appropriate icon based on resource type
  const getTypeIcon = () => {
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

  // Get the color for the resource type chip
  const getTypeColor = () => {
    switch (type) {
      case 'article':
        return '#84c0ee';
      case 'video':
        return '#f56565';
      case 'exercises':
        return '#68d391';
      default:
        return '#a0aec0';
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: 2,
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#1a202c' }}>
            {title}
          </Typography>
          <Chip 
            icon={getTypeIcon()}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            sx={{ 
              backgroundColor: getTypeColor(),
              color: '#ffffff',
              fontWeight: 500,
              ml: 1
            }}
            size="medium"
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained"
          size="medium" 
          endIcon={<OpenInNewIcon />}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            backgroundColor: '#84c0ee',
            '&:hover': {
              backgroundColor: '#63a9de'
            }
          }}
        >
          Open Resource
        </Button>
        <Button 
          variant="outlined"
          size="medium"
          onClick={onSave}
          sx={{ 
            ml: 1, 
            borderColor: '#909fb5',
            color: '#909fb5',
            '&:hover': {
              borderColor: '#7b8a9a',
              backgroundColor: 'rgba(144, 159, 181, 0.05)'
            }
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
}

export default ResourceCard;