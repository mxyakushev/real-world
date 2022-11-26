import React, { FC } from 'react';
import { IArticle } from 'types';
import { Article } from 'components/atoms';

interface IProps {
  articles: IArticle[];
}

export const ArticleList: FC<IProps> = ({ articles }) => {
  console.log(articles);
  if (articles.length === 0) {
    return <div>no elements</div>;
  }
  return (
    <>
      {articles.map((article) => {
        return <Article key={Math.random()} article={article} />;
      })}
    </>
  );
};
