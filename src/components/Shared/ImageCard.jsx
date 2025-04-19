import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ImageCard = ({ imageUrl, title, category, className }) => {
  return (
    <Card 
      className={`relative w-full h-full min-h-[240px] overflow-hidden ${className}`}
    >
      {/* Image Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
      />
      
      {/* Content */}
      <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {category && (
          <Typography 
            variant="caption" 
            // Replaced bg-theme-blue and font-newsreader-medium with Tailwind equivalents
            className="inline-block mb-2 px-2 py-1 bg-blue-600 font-medium text-xs"
          >
            {category}
          </Typography>
        )}
        <Typography 
          variant="h6" 
          // Replaced article-title, hover:text-theme-light-blue, transition-colors and font-newsreader-semibold with Tailwind equivalents
          className="text-lg font-semibold hover:text-blue-300 transition-colors duration-200"
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
