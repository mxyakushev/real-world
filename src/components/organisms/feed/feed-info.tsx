import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { IArticle } from 'types';
import { ArticleList, Pagination } from 'components';
import { Box } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { getArticlesFeed } from 'app';

interface IProps {
  articles: IArticle[];
  numberOfArticles: number;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  isLoaded: boolean;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
}

export const FeedInfo: FC<IProps> = ({
  articles,
  setOffset,
  offset,
  isLoaded,
  numberOfArticles,
  setRange,
  range,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArticlesFeed({ limit: 10, offset }));
  }, [dispatch, offset]);
  return (
    <Box>
      <ArticleList articles={articles} isLoaded={isLoaded} />
      {isLoaded && (
        <Pagination
          setOffset={setOffset}
          offset={offset}
          numberOfArticles={numberOfArticles}
          setRange={setRange}
          range={range}
        />
      )}
    </Box>
  );
};
