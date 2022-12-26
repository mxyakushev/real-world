import React from 'react';
import { HomeTemplate } from 'components/templates';
import { useAppSelector } from 'hooks';
import {
  articlesFeedStateSelector,
  articlesStateSelector,
  articlesTagStateSelector,
  errorArticlesStateSelector,
  loadingArticlesStateSelector,
} from 'app';

const Home = () => {
  const data = useAppSelector(articlesStateSelector);
  const dataFeed = useAppSelector(articlesFeedStateSelector);
  const dataTags = useAppSelector(articlesTagStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);
  const isError = useAppSelector(errorArticlesStateSelector);

  return (
    <HomeTemplate
      data={data}
      dataFeed={dataFeed}
      dataTags={dataTags}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default Home;
