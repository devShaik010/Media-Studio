import React from 'react';
import ArticleHeader from '../components/Article/ArticleHeader';
import ArticleMeta from '../components/Article/ArticleMeta';
import ArticleActions from '../components/Article/ArticleActions';
import ArticleContent from '../components/Article/ArticleContent';

const Article = () => {
  const articleData = {
    title: "Title",
    author: "person",
    publishTime: "30 mins ago",
    readTime: "2 min read",
    content: [
      "lore",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat nec ligula facilisis tincidunt. Donec ac nunc id enim facilisis efficitur. Sed euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc."
    ],
    imageUrl: "https://www.figma.com/file/RVxFQ9h8Z8EFmCHy6OTwXI/image/12060daeec36198e2a5221c3871207b1458c723e"
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ArticleHeader imageUrl={articleData.imageUrl} title={articleData.title} />
      
      <div className="mt-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <ArticleMeta 
            author={articleData.author} 
            publishTime={articleData.publishTime} 
            readTime={articleData.readTime} 
          />
          <ArticleActions />
        </div>
        <hr className="my-6 border-gray-200" />
      </div>
      
      <ArticleContent paragraphs={articleData.content} />
    </div>
  );
}

export default Article;