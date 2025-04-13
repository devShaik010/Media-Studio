import { newsData } from '@data/newsData';

export const findArticleBySlug = (slug) => {
  return newsData.articles.find(article => article.slug === slug);
};

export const getRelatedArticles = (articleIds) => {
  if (!articleIds) return [];
  return newsData.articles.filter(article => articleIds.includes(article.id));
};

export const getArticlesByCategory = (categoryId) => {
  if (!categoryId) return [];
  return newsData.articles.filter(article => 
    article.category.toLowerCase() === categoryId.toLowerCase()
  );
};