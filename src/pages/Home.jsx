import React from 'react';
import MainLayout from '@layouts/MainLayout';
import Hero from '@components/News/Hero';
import TopHeadlines from '@components/News/Headlines';
import LatestNews from '@components/News/LatestNews';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MainLayout>
        <Hero />
        <TopHeadlines />
        <LatestNews />
      </MainLayout>
    </div>
  );
};

export default Home;