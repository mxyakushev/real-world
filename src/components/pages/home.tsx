import React, { useState } from 'react';
import { HomeTemplate } from 'components/templates';
import { useAppSelector } from 'hooks';
import {
  articlesFeedStateSelector,
  articlesStateSelector,
  errorArticlesStateSelector,
  loadingArticlesStateSelector,
} from 'app';

const Home = () => {
  const [offset, setOffset] = useState(+JSON.parse(sessionStorage.getItem('offset') || '0'));
  const [rangeNumber, setRangeNumber] = useState(
    +JSON.parse(sessionStorage.getItem('range') || '5')
  );
  const data = useAppSelector(articlesStateSelector);
  const dataFeed = useAppSelector(articlesFeedStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);
  const isError = useAppSelector(errorArticlesStateSelector);

  sessionStorage.setItem('offset', JSON.stringify(offset));
  sessionStorage.setItem('range', JSON.stringify(rangeNumber));
  return (
    <HomeTemplate
      data={data}
      dataFeed={dataFeed}
      isLoading={isLoading}
      range={rangeNumber}
      setRange={setRangeNumber}
      isError={isError}
      setOffset={setOffset}
      offset={offset}
    />
  );
};

export default Home;
