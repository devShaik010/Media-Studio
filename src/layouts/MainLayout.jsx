import React from 'react';
import Navbar from '@components/Navigation/Navbar';
import Footer from '@components/Shared/Footer';
import Slider from '@components/Navigation/Slider';
import ErrorBoundary from '@components/Shared/ErrorBoundary';
import './MainLayout.css';

const MainLayout = ({ children, isDrawerOpen, onDrawerToggle }) => {
  return (
    <div className="main-layout">
      <Navbar 
        onDrawerToggle={onDrawerToggle}
        isDrawerOpen={isDrawerOpen}
      />
      <ErrorBoundary>
        <main className="main-content">
          {children}
        </main>
      </ErrorBoundary>
      <Slider 
        open={isDrawerOpen}
        onClose={() => onDrawerToggle(false)}
      />
      <Footer />
    </div>
  );
};

export default MainLayout;