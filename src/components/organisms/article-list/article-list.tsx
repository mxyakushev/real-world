import React, { FC } from 'react';
import { IArticle } from 'types';
import { Article } from 'components';
import { Box } from '@chakra-ui/react';

interface IProps {
  articles: IArticle[];
  isLoaded: boolean;
}

export const ArticleList: FC<IProps> = ({ articles, isLoaded }) => {
  return (
    <Box>
      {articles.map((article) => {
        return <Article key={Math.random()} article={article} isLoaded={isLoaded} />;
      })}
    </Box>
  );
};
