import React, { Dispatch, FC, SetStateAction } from 'react';
import { IArticle } from 'types';
import { ArticleList, Pagination } from 'components';
import { Box } from '@chakra-ui/react';

interface IProps {
  articles: IArticle[];
  numberOfArticles: number;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  isLoaded: boolean;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
}

export const GlobalInfo: FC<IProps> = ({
  articles,
  setOffset,
  offset,
  isLoaded,
  numberOfArticles,
  setRange,
  range,
}) => {
  return (
    <Box>
      <ArticleList articles={articles} isLoaded={isLoaded} />
      <Pagination
        setOffset={setOffset}
        offset={offset}
        numberOfArticles={numberOfArticles}
        setRange={setRange}
        range={range}
      />
    </Box>
  );
};
