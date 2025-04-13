import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Article from '@pages/Article';
import CategoryPage from '@pages/CategoryPage';
import ErrorPage from '@pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/en" element={<Home />} />
      <Route path="/ur" element={<Home />} />
      {/* Add both language-specific and direct article routes */}
      <Route path="/article/:slug" element={<Article />} />
      <Route path="/:lang/article/:slug" element={<Article />} />
      <Route path="/:lang/category/:categoryId" element={<CategoryPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
