import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  articlesFavoritedStateSelector,
  articlesProfileStateSelector,
  getArticlesFavorited,
  getArticlesProfile,
  loadingArticlesStateSelector,
} from 'app';
import { Box, Heading } from '@chakra-ui/react';
import { ArticleList } from '../article-list';
import { Pagination } from '../../molecules';

const ArticlesProfile = () => {
  const { tabName } = useParams();
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const profileArticles = useAppSelector(articlesProfileStateSelector);
  const favoritedArticles = useAppSelector(articlesFavoritedStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);

  const [profileOffset, setProfileOffset] = useState(0);
  const [profileRange, setProfileRange] = useState(5);

  const [favoritedOffset, setFavoritedOffset] = useState(0);
  const [favoritedRange, setFavoritedRange] = useState(5);

  useEffect(() => {
    if (tabName === 'articles' && username) {
      dispatch(getArticlesProfile({ limit: 10, offset: profileOffset * 10, username }));
    }
    if (tabName === 'favorited' && username) {
      dispatch(getArticlesFavorited({ limit: 10, offset: favoritedOffset * 10, username }));
    }
  }, [dispatch, favoritedOffset, profileOffset, tabName, username]);

  if (tabName === 'articles') {
    return (
      <Box>
        {profileArticles?.articlesCount > 0 ? (
          <ArticleList articles={profileArticles?.articles} isLoaded={!isLoading} />
        ) : (
          <Heading textAlign="center">no articles</Heading>
        )}
        {!isLoading &&
          profileArticles?.articlesCount > 10 &&
          profileArticles?.articles.length !== 0 && (
            <Pagination
              setOffset={setProfileOffset}
              offset={profileOffset}
              setRange={setProfileRange}
              range={profileRange}
              maxRangeNumber={Math.ceil(profileArticles.articlesCount / 10)}
            />
          )}
      </Box>
    );
  }

  return (
    <Box>
      {favoritedArticles?.articlesCount > 0 ? (
        <ArticleList articles={favoritedArticles?.articles} isLoaded={!isLoading} />
      ) : (
        <Heading textAlign="center">no articles</Heading>
      )}
      {!isLoading &&
        favoritedArticles?.articlesCount > 10 &&
        favoritedArticles?.articles.length !== 0 && (
          <Pagination
            setOffset={setFavoritedOffset}
            offset={favoritedOffset}
            setRange={setFavoritedRange}
            range={favoritedRange}
            maxRangeNumber={Math.ceil(favoritedArticles.articlesCount / 10)}
          />
        )}
    </Box>
  );
};

export default ArticlesProfile;
