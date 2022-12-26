import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import {
  articlesFavoritedStateSelector,
  articlesProfileStateSelector,
  getArticlesFavorited,
  getArticlesProfile,
  getProfile,
  loadingArticlesStateSelector,
  profileLoadingStateSelector,
  profileStateSelector,
} from 'app';
import { Box, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ArticleList, Pagination } from 'components';
import { FollowButton } from '../atoms';

const Profile = () => {
  const [offset, setOffset] = useState(0);
  const [rangeNumber, setRangeNumber] = useState(5);

  const [favoritedOffset, setFavoritedOffset] = useState(0);
  const [rangeNumberFavorited, setRangeNumberFavorited] = useState(5);

  const { username } = useParams();
  const user = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileStateSelector);
  const isLoading = useAppSelector(profileLoadingStateSelector);
  const articles = useAppSelector(articlesProfileStateSelector);
  const articlesFavorited = useAppSelector(articlesFavoritedStateSelector);
  const articlesLoading = useAppSelector(loadingArticlesStateSelector);

  useEffect(() => {
    if (username) {
      dispatch(getProfile(username));
      dispatch(getArticlesProfile({ limit: 10, offset: offset * 10, username }));
      dispatch(getArticlesFavorited({ limit: 10, offset: favoritedOffset * 10, username }));
    }
  }, [dispatch, favoritedOffset, offset, username]);

  if (isLoading && !profile) {
    return <h1>loading</h1>;
  }
  return (
    <Box p={5}>
      <Box display="flex" alignItems="center" mb={4}>
        <Box mr={3} rounded="100%" overflow="hidden">
          <Image src={profile?.profile.image} w={12} />
        </Box>
        <Heading>{profile?.profile.username}</Heading>
        {profile?.profile && profile.profile.username !== user?.user.username && (
          <FollowButton username={profile.profile.username} />
        )}
      </Box>
      <Box>{profile?.profile.bio}</Box>
      <Tabs size="md">
        <TabList w="80vw">
          <Tab>Articles</Tab>
          <Tab>Favourites</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ArticleList articles={articles?.articles} isLoaded />
            {!articlesLoading &&
              articles &&
              articles?.articlesCount > 10 &&
              articles.articles.length !== 0 && (
                <Pagination
                  setOffset={setOffset}
                  offset={offset}
                  setRange={setRangeNumber}
                  range={rangeNumber}
                  maxRangeNumber={Math.ceil(articles.articlesCount / 10) || 0}
                />
              )}
          </TabPanel>
          <TabPanel>
            <ArticleList articles={articlesFavorited?.articles} isLoaded />
            {!articlesLoading &&
              articlesFavorited &&
              articlesFavorited?.articlesCount > 10 &&
              articlesFavorited.articles.length !== 0 && (
                <Pagination
                  setOffset={setFavoritedOffset}
                  offset={favoritedOffset}
                  setRange={setRangeNumberFavorited}
                  range={rangeNumberFavorited}
                  maxRangeNumber={Math.ceil(articlesFavorited.articlesCount / 10) || 0}
                />
              )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Profile;
