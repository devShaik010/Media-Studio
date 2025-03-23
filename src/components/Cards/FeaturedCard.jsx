import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FeaturedCard = ({ imageUrl, title, description, category, time, className }) => {
  return (
    <Card className={`relative w-full h-[500px] overflow-hidden ${className}`}>
      {/* Image Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      {/* Content */}
      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <Box className="flex items-center gap-4 mb-3">
          {category && (
            <Typography 
              variant="caption" 
              className="px-2 py-1 bg-theme-blue text-xs font-newsreader-medium"
            >
              {category}
            </Typography>
          )}
          {time && (
            <Typography 
              variant="caption" 
              className="flex items-center text-white/70 text-sm font-newsreader-thin"
            >
              <AccessTimeIcon className="w-4 h-4 mr-1" />
              {time}
            </Typography>
          )}
        </Box>
        <Typography 
          variant="h4" 
          className="font-newsreader-bold mb-3 leading-tight"
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          className="text-white/90 line-clamp-2 font-newsreader-regular"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;