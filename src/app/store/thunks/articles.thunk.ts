import { createAsyncThunk } from '@reduxjs/toolkit';
import { articleService } from 'services';
import { IPublishArticle } from 'types';

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

export const getArticlesByTag = createAsyncThunk(
  'articles/getArticlesByTag',
  async ({ limit, offset, tag }: { limit: number; offset: number; tag: string }, thunkAPI) => {
    try {
      return await articleService.getArticlesByTag({ limit, offset, tag });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticlesProfile = createAsyncThunk(
  'articles/getArticlesProfile',
  async (
    { limit, offset, username }: { limit: number; offset: number; username: string },
    thunkAPI
  ) => {
    try {
      return await articleService.getArticlesProfile({ limit, offset, username });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getArticlesLiked = createAsyncThunk(
  'articles/getArticlesLiked',
  async (
    { limit, offset, username }: { limit: number; offset: number; username: string },
    thunkAPI
  ) => {
    try {
      return await articleService.getArticlesLiked({ limit, offset, username });
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

export const createOneArticle = createAsyncThunk(
  'articles/createOneArticle',
  async (body: IPublishArticle, thunkAPI) => {
    try {
      return await articleService.createArticle(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editArticle = createAsyncThunk(
  'articles/editArticle',
  async (
    {
      body,
      slug,
    }: {
      body: Omit<IPublishArticle, 'tags'>;
      slug: string;
    },
    thunkAPI
  ) => {
    try {
      return await articleService.editArticle({ body, slug });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (slug: string, thunkAPI) => {
    try {
      return await articleService.deleteArticle(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
