import React, { useState } from 'react';
import Navbar from '@components/Navbar/Navbar';
import Slider from '@components/Drawer/Slider';
import Hero from '@components/Hero/Hero';
import Footer from '@components/Footer/Footer';
import TopHeadlines from '@components/TopHeadlines/Headlines';
import LatestNews from '@components/LatestNews/LatestNews';

function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Navbar 
        onDrawerToggle={handleDrawerToggle} 
        isDrawerOpen={isDrawerOpen} 
      />
      <Hero />
      <Slider 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
      {/* Footer */}
      <TopHeadlines />
      <LatestNews />
      <Footer/>
    </div>
  );
}

export default Home;