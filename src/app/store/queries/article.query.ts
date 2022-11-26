import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'http';
import { IArticles } from 'types';

export const articleQuery = createApi({
  reducerPath: 'articleQuery',
  tagTypes: ['article'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticles, { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: `articles?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery } = articleQuery;
