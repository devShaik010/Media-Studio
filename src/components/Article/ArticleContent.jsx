import React from 'react';

const ArticleContent = ({ paragraphs }) => {
  return (
    <article className="prose max-w-none">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-6 leading-relaxed text-gray-700">
          {paragraph}
        </p>
      ))}
    </article>
  );
};

export default ArticleContent;