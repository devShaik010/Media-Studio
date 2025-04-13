import React, { useState } from 'react';
import MainLayout from '@layouts/MainLayout';
import Hero from '@components/News/Hero';
import TopHeadlines from '@components/News/Headlines';
import LatestNews from '@components/News/LatestNews';

function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <MainLayout 
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={handleDrawerToggle}
    >
      <Hero />
      <TopHeadlines />
      <LatestNews />
    </MainLayout>
  );
}

export default Home;