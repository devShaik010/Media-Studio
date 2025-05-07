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

// Fetch articles by category
export const fetchArticlesByCategory = async (categoryId) => {
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
      .eq('category_id', categoryId)
      .order('publish_date', { ascending: false })
      .limit(12);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};
