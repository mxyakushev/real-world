import { createAsyncThunk } from '@reduxjs/toolkit';
import { articleService } from 'services';

export const getAllArticles = createAsyncThunk(
  'articles/getArticles',
  async ({ limit, offset }: { limit: number; offset: number }, thunkAPI) => {
    try {
      return await articleService.getArticles({ limit, offset });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticlesFeed = createAsyncThunk(
  'articles/getArticlesFeed',
  async ({ limit, offset }: { limit: number; offset: number }, thunkAPI) => {
    try {
      return await articleService.getArticlesFeed({ limit, offset });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleArticle = createAsyncThunk(
  'articles/getSingleArticle',
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.getArticleSlug(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCommentsOnArticle = createAsyncThunk(
  'articles/getCommentOnArticle',
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.getCommentsOnArticle(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentArticle = createAsyncThunk(
  'articles/commentArticle',
  async ({ slug, body }: { slug: string; body: string }, thunkAPI) => {
    try {
      return await articleService.commentArticle({ slug, body });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOneComment = createAsyncThunk(
  'articles/deleteOneComment',
  async ({ slug, id }: { slug: string; id: number }, thunkAPI) => {
    try {
      return await articleService.commentDelArticle({ slug, id });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.likeArticle(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dislikeArticle = createAsyncThunk(
  'articles/dislikeArticle',
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.dislikeArticle(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
