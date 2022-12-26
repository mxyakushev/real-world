import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { IArticle } from 'types';
import { ArticleList, Pagination } from 'components';
import { Box } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { getAllArticles, getArticlesByTag, getArticlesFeed } from 'app';

type ArticlesType = 'global' | 'your' | 'tag';

interface IProps {
  articles: IArticle[];
  numberOfArticles: number;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  isLoaded: boolean;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
  tag?: string;
  articlesType: ArticlesType;
  maxRangeNumber: number;
}

export const ArticlesHome: FC<IProps> = ({
  articles,
  setOffset,
  offset,
  isLoaded,
  numberOfArticles,
  setRange,
  range,
  tag,
  articlesType,
  maxRangeNumber,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (articlesType === 'global') {
      dispatch(getAllArticles({ limit: 10, offset: offset * 10 }));
    }
    if (articlesType === 'your') {
      dispatch(getArticlesFeed({ limit: 10, offset: offset * 10 }));
    }
    if (articlesType === 'tag' && tag) {
      dispatch(getArticlesByTag({ limit: 10, offset: offset * 10, tag }));
    }
  }, [articlesType, dispatch, offset, tag]);
  return (
    <Box>
      <ArticleList articles={articles} isLoaded={isLoaded} />
      {isLoaded && numberOfArticles > 10 && articles.length !== 0 && (
        <Pagination
          setOffset={setOffset}
          offset={offset}
          setRange={setRange}
          range={range}
          maxRangeNumber={maxRangeNumber}
        />
      )}
    </Box>
  );
};
