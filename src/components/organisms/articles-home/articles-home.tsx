import React, { useEffect, useState } from 'react';
import { ArticleList, Pagination } from 'components';
import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  articlesFeedStateSelector,
  articlesStateSelector,
  articlesTagStateSelector,
  getAllArticles,
  getArticlesByTag,
  getArticlesFeed,
  loadingArticlesStateSelector,
} from 'app';
import { useOutletContext, useParams } from 'react-router-dom';

const ArticlesHome = () => {
  const { tabName } = useParams();
  const tag: string = useOutletContext();
  const dispatch = useAppDispatch();
  const globalArticles = useAppSelector(articlesStateSelector);
  const feedArticles = useAppSelector(articlesFeedStateSelector);
  const tagArticles = useAppSelector(articlesTagStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);

  const [globalOffset, setGlobalOffset] = useState(0);
  const [globalRange, setGlobalRange] = useState(5);

  const [feedOffset, setFeedOffset] = useState(0);
  const [feedRange, setFeedRange] = useState(5);

  const [tagOffset, setTagOffset] = useState(0);
  const [tagRange, setTagRange] = useState(5);

  useEffect(() => {
    if (tabName === 'global') {
      dispatch(getAllArticles({ limit: 10, offset: globalOffset * 10 }));
    }
    if (tabName === 'feed') {
      dispatch(getArticlesFeed({ limit: 10, offset: feedOffset * 10 }));
    }
    if (tabName === 'tag') {
      dispatch(getArticlesByTag({ limit: 10, offset: tagOffset * 10, tag }));
    }
  }, [dispatch, feedOffset, globalOffset, tabName, tag, tagOffset]);

  if (tabName === 'global') {
    return (
      <Box>
        <ArticleList articles={globalArticles?.articles} isLoaded={!isLoading} />
        {!isLoading &&
          globalArticles?.articlesCount > 10 &&
          globalArticles?.articles.length !== 0 && (
            <Pagination
              setOffset={setGlobalOffset}
              offset={globalOffset}
              setRange={setGlobalRange}
              range={globalRange}
              maxRangeNumber={Math.ceil(globalArticles.articlesCount / 10)}
            />
          )}
      </Box>
    );
  }

  if (tabName === 'feed') {
    return (
      <Box>
        <ArticleList articles={feedArticles?.articles} isLoaded={!isLoading} />
        {!isLoading && feedArticles?.articlesCount > 10 && feedArticles?.articles.length !== 0 && (
          <Pagination
            setOffset={setFeedOffset}
            offset={feedOffset}
            setRange={setFeedRange}
            range={feedRange}
            maxRangeNumber={Math.ceil(feedArticles.articlesCount / 10)}
          />
        )}
      </Box>
    );
  }
  return (
    <Box>
      <ArticleList articles={tagArticles?.articles} isLoaded={!isLoading} />
      {!isLoading && tagArticles?.articlesCount > 10 && tagArticles?.articles.length !== 0 && (
        <Pagination
          setOffset={setTagOffset}
          offset={tagOffset}
          setRange={setTagRange}
          range={tagRange}
          maxRangeNumber={Math.ceil(tagArticles.articlesCount / 10)}
        />
      )}
    </Box>
  );
};

export default ArticlesHome;
