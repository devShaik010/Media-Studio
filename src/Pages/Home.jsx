import React, { useState } from 'react';
import Navbar from '@components/Navbar/Navbar';
import Slider from '@components/Drawer/Slider';
import Hero from '@components/Hero/Hero';

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
    </div>
  );
}

export default Home;