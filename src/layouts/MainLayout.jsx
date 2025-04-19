import React from 'react';
import Navbar from '@components/Navigation/Navbar';
import Footer from '@components/Shared/Footer';
import Slider from '@components/Navigation/Slider';
import ErrorBoundary from '@components/Shared/ErrorBoundary';
import { useDrawer } from '@context/DrawerContext';

const MainLayout = ({ children }) => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ErrorBoundary>
        <main className="flex-1  bg-gray-50">
          {children}
        </main>
      </ErrorBoundary>
      <Slider open={isOpen} onClose={closeDrawer} />
      <Footer />
    </div>
  );
};

export default MainLayout;
