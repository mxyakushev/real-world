import React, { FC } from 'react';
import { IArticle } from 'types';
import { Article } from 'components';
import { Box, Spinner } from '@chakra-ui/react';

interface IProps {
  articles: IArticle[];
  isLoaded: boolean;
}

export const ArticleList: FC<IProps> = ({ articles, isLoaded }) => {
  if (articles.length === 0 && !isLoaded) {
    return (
      <Box display="flex" justifyContent="center" h="70vh" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box px={4}>
      {articles.map((article) => {
        return <Article key={Math.random()} article={article} isLoaded={isLoaded} />;
      })}
    </Box>
  );
};
