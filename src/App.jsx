import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@pages/Home';
import Article from '@pages/Article';
import CategoryPage from '@pages/CategoryPage';
import ErrorPage from '@pages/ErrorPage';
import { DrawerProvider } from '@context/DrawerContext';

function App() {
  return (
    <DrawerProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/ur" replace />} />
        <Route path="/ur" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/:lang/article/:slug" element={<Article />} />
        <Route path="/:lang/category/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DrawerProvider>
  );
}

export default App;
