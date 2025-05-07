import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useArticles = (language) => {
  const [articles, setArticles] = useState({
    heroArticle: null,
    topStories: [],
    latestNews: [],
    moreStories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Fetch complete articles data
        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            author:authors(
              id,
              name,
              role,
              avatar_url
            ),
            category:categories(
              id,
              name,
              description
            )
          `)
          .eq('language', language)
          .eq('status', 'Published')
          .order('publish_date', { ascending: false });

        if (error) throw error;

        // Organize articles
        const organizedArticles = organizeArticles(data || []);
        setArticles(organizedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  const organizeArticles = (data) => {
    if (!data.length) {
      return {
        heroArticle: null,
        topStories: [],
        latestNews: [],
        moreStories: []
      };
    }

    // Select the first article with all required fields as hero
    const heroArticle = data.find(article => 
      article.title && 
      article.content && 
      (article.main_image_url || article.thumbnail_url)
    ) || data[0];

    const remainingArticles = data.filter(article => article.id !== heroArticle.id);

    return {
      heroArticle,
      topStories: remainingArticles.slice(0, 3),
      latestNews: remainingArticles.slice(3, 7),
      moreStories: remainingArticles.slice(7)
    };
  };

  return { ...articles, loading, error };
};