import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'http';
import { IArticle, IArticles, IComments } from 'types';

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
    getArticleSlug: builder.query<{ article: IArticle }, { slug: string }>({
      query: ({ slug }) => ({
        url: `articles/${slug}`,
      }),
    }),
    getCommentSlug: builder.query<IComments, { slug: string }>({
      query: ({ slug }) => ({
        url: `articles/${slug}/comments`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleSlugQuery, useGetCommentSlugQuery } = articleQuery;
