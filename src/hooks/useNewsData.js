import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Use lib/supabaseClient
import { fetchArticles, fetchArticleById } from '../services/articlesService'; // Import fetchArticles

export const useNewsData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroArticle, setHeroArticle] = useState(null);
  const [topStories, setTopStories] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [moreStories, setMoreStories] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const articles = await fetchArticles();

        if (articles.length > 0) {
          setHeroArticle(articles[0]);
          setTopStories(articles.slice(1, 4)); // Assuming top stories are the next 3
          setLatestNews(articles.slice(4, 10)); // Assuming latest news are the next 6
          setMoreStories(articles.slice(10)); // The rest are more stories
        } else {
          setHeroArticle(null);
          setTopStories([]);
          setLatestNews([]);
          setMoreStories([]);
        }
      } catch (err) {
        console.error('Error loading news data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []); // Empty dependency array means this effect runs once on mount

  const getArticleById = async (id) => {
    try {
      // This function might not be needed here if articles are pre-fetched,
      // but keeping it for now based on original code structure.
      // Consider if this should fetch from the state or re-fetch from service.
      // For now, let's use the service to ensure latest data if needed elsewhere.
      setLoading(true); // This might interfere with the main loading state
      const article = await fetchArticleById(id);
      return article;
    } catch (err) {
      console.error('Error fetching article by ID:', err);
      setError(err.message); // This might overwrite the main error state
      return null;
    } finally {
      setLoading(false); // This might interfere with the main loading state
    }
  };


  return {
    heroArticle,
    topStories,
    latestNews,
    moreStories,
    getArticleById,
    loading,
    error
  };
};
