import React from 'react';
import Navbar from '@components/Navigation/Navbar';
import Slider from '@components/Navigation/Slider';
import { useDrawer } from '@context/DrawerContext';

const MainLayout = ({ children }) => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Slider open={isOpen} onClose={closeDrawer} />
    </div>
  );
};

export default MainLayout;
