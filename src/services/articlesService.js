import { supabase } from '../lib/supabaseClient';

// Generate a slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

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

    // Add slug to each article
    return data.map(article => ({
      ...article,
      slug: `${article.id}-${generateSlug(article.title)}`
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to load articles. Please try again later.');
  }
};

// Fetch single article by ID or slug
export const fetchArticleById = async (idOrSlug) => {
  try {
    // Check if idOrSlug is a number or a slug
    const isNumeric = /^\d+$/.test(idOrSlug);
    let id = idOrSlug;
    
    // If it's a slug, extract the ID from the beginning
    if (!isNumeric) {
      const idMatch = idOrSlug.match(/^(\d+)-/);
      if (idMatch && idMatch[1]) {
        id = idMatch[1];
      } else {
        throw new Error('Invalid article identifier');
      }
    }

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
    
    if (data) {
      // Add slug to the article
      return {
        ...data,
        slug: `${data.id}-${generateSlug(data.title)}`
      };
    }
    
    return null;
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
    
    // Add slug to each article
    return (data || []).map(article => ({
      ...article,
      slug: `${article.id}-${generateSlug(article.title)}`
    }));
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
    
    // Add slug to each article
    return data.map(article => ({
      ...article,
      slug: `${article.id}-${generateSlug(article.title)}`
    }));
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};

// Fetch recent articles, excluding the current article, as a fallback for related articles
export const fetchRelatedArticles = async (currentArticleId, limit = 3) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, thumbnail_url, main_image_url, publish_date') // Fields needed for RelatedArticles component
      .eq('status', 'Published') // Only published articles
      .neq('id', currentArticleId) // Exclude the current article
      .order('publish_date', { ascending: false }) // Get most recent articles
      .limit(limit); // Limit the number of related articles

    if (error) {
      console.error('Supabase error fetching related articles:', error);
      throw new Error('Failed to fetch related articles');
    }
    
    // Add slug to each article
    return (data || []).map(article => ({
      ...article,
      slug: `${article.id}-${generateSlug(article.title)}`
    }));
  } catch (error) {
    console.error('Error fetching related articles:', error);
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
    
    // Add slug to each article
    return data.map(article => ({
      ...article,
      slug: `${article.id}-${generateSlug(article.title)}`
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
