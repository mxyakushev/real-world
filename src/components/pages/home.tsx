import React, { useState } from 'react';
import { useGetArticlesQuery } from 'app';
import { HomeTemplate } from 'components/templates';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [rangeNumber, setRangeNumber] = useState(5);
  const { data, isLoading, isError, isFetching } = useGetArticlesQuery({ limit: 10, offset });

  return (
    <HomeTemplate
      data={data}
      isFetching={isFetching}
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
