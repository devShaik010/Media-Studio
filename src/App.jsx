import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
import Article from '@pages/Article';
import CategoryPage from '@pages/CategoryPage';
import ErrorPage from '@pages/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/article/:id" element={<MainLayout><Article /></MainLayout>} />
        <Route path="/category/:categoryId" element={<MainLayout><CategoryPage /></MainLayout>} />
        <Route path="*" element={<MainLayout><ErrorPage /></MainLayout>} />
      </Route>
    </Routes>
  );
};

export default App;
