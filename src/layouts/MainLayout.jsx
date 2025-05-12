import React from 'react';
import Navbar from '@components/Navigation/Navbar';
import Slider from '@components/Navigation/Slider';
import Footer from '@components/Shared/Footer';
import { useDrawer } from '@context/DrawerContext';

const MainLayout = ({ children }) => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Changed bg-gray-50 to bg-white */}
      <Navbar />
      <main className="flex-grow container mx-auto ">
        {children}
      </main>
      <Footer />
      <Slider open={isOpen} onClose={closeDrawer} />
    </div>
  );
};

export default MainLayout;
