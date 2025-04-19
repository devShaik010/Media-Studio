import React, { createContext, useContext, useState, useEffect } from 'react';
import { newsData, urduArticles } from '@data/newsData';
import { useLocation } from 'react-router-dom';

const defaultContext = {
  language: 'ur',
  toggleLanguage: () => {},
  articles: []
};

const LanguageContext = createContext(defaultContext);

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    const path = location.pathname;
    return path.startsWith('/ur') ? 'ur' : 'en';
  });
  
  const [articles, setArticles] = useState(() => {
    const path = location.pathname;
    return path.startsWith('/ur') ? urduArticles.articles : newsData.articles;
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setArticles(lang === 'ur' ? urduArticles.articles : newsData.articles);
  };

  const value = {
    language,
    toggleLanguage,
    articles
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};