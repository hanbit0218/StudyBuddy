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

  const getTypeColor = () => {
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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Chip 
            icon={getTypeIcon()}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            color={getTypeColor()}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          endIcon={<OpenInNewIcon />}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Resource
        </Button>
        <Button 
          size="small"
          onClick={onSave}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
}

export default ResourceCard;