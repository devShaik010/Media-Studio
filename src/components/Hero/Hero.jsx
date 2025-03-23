import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import FeaturedCard from '@components/Cards/FeaturedCard';
import ImageCard from '@components/Cards/ImageCard';

const Hero = () => {
  // Sample data - replace with your actual data
  const featuredNews = {
    imageUrl: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
    title: "Breaking: Major International Development",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "World News",
    time: "2 hours ago"
  };

  const sideNews = [
    {
      imageUrl: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      title: "Economic Summit Brings Global Leaders Together",
      category: "Economy"
    },
    {
      imageUrl: "https://gdb.voanews.com/e1872080-cf3a-46d6-0938-08dd5c8b1668_cx0_cy6_cw0_w1023_r1_s.jpg",
      title: "Technology Breakthrough: New Innovation Revealed",
      category: "Technology"
    }
  ];

  return (
    <Box className="container mx-auto px-4">
      {/* Main container with top padding for navbar */}
      <Box className="pt-20">
        {/* Section Title */}
        <Box className="mb-6 border-b border-[#cbd1d6] pb-1">
          <Typography 
            component="h2" 
            className="text-[26.4px] text-[#4a4a4a] leading-tight font-newsreader-semibold"
          >
            Top Stories
          </Typography>
        </Box>

        {/* News Grid */}
        <Grid container spacing={3}>
          {/* Featured News - Left Side */}
          <Grid item xs={12} md={8}>
            <FeaturedCard 
              {...featuredNews} 
              className="font-newsreader-regular"
            />
          </Grid>

          {/* Side News - Right Side */}
          <Grid item xs={12} md={4}>
            <Box className="flex flex-col gap-3 h-full">
              {sideNews.map((news, index) => (
                <Box key={index} className="flex-1">
                  <ImageCard 
                    {...news} 
                    className="font-newsreader-regular"
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;