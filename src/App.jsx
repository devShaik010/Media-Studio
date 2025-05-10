import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DrawerProvider, useDrawer } from '@context/DrawerContext';
import ErrorBoundary from '@components/ErrorBoundary';
import Navbar from '@components/Navigation/Navbar';
import Footer from '@components/Shared/Footer';
import Slider from '@components/Navigation/Slider';
import Home from '@pages/Home';
import Article from '@pages/Article';
import CategoryPage from '@pages/CategoryPage';
import ErrorPage from '@pages/ErrorPage';

// New component to contain the main application structure and access useDrawer hook
const AppContent = () => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Combined styles from RootLayout and MainLayout */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-6"> {/* Adjusted padding: py-6 to pt-24 pb-6 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      <Slider open={isOpen} onClose={closeDrawer} />
    </div>
  );
};

const App = () => {
  return (
    <DrawerProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </DrawerProvider>
  );
};

export default App;
