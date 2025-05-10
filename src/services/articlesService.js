import { supabase } from '../lib/supabaseClient';

// Fetch all published articles
export const fetchArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        content,
        publish_date,
        main_image_url,
        thumbnail_url,
        status,
        created_at
      `)
      .eq('status', 'Published')
      .order('publish_date', { ascending: false })
      .limit(20); // Limit to most recent 20 articles

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch articles');
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to load articles. Please try again later.');
  }
};

// Fetch single article by ID
export const fetchArticleById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        content,
        publish_date,
        main_image_url,
        thumbnail_url,
        youtube_link,
        status,
        created_at
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Search articles by title or content
export const searchArticles = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, publish_date, thumbnail_url') // Select fields needed for search results
      .eq('status', 'Published') // Only search published articles
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`) // Search in title or content
      .order('publish_date', { ascending: false })
      .limit(10); // Limit number of search results

    if (error) {
      console.error('Supabase search error:', error);
      throw new Error('Failed to search articles');
    }
    return data || [];
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error; // Re-throw to be caught by the caller
  }
};

// Fetch articles by category
export const fetchArticlesByCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};

export const fetchAllArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
