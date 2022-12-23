import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IArticle, IArticles, IComments } from 'types';
import {
  commentArticle,
  deleteOneComment,
  dislikeArticle,
  getAllArticles,
  getArticlesFeed,
  getCommentsOnArticle,
  getSingleArticle,
  likeArticle,
} from '../thunks';

interface ArticlesState {
  articles: IArticles;
  singleArticle: { article: IArticle } | null;
  articlesFeed: IArticles;
  comments: IComments | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  commentLoading: boolean;
  buttonLoading: boolean;
  message: string;
}

const initialState: ArticlesState = {
  articles: { articles: [], articlesCount: 0 },
  articlesFeed: { articles: [], articlesCount: 0 },
  singleArticle: null,
  comments: { comments: [] },
  isError: false,
  isSuccess: false,
  isLoading: false,
  buttonLoading: false,
  commentLoading: false,
  message: '',
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(createOneArticle.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteArticle.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(getSingleArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticlesFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentArticle.pending, (state) => {
        state.commentLoading = true;
      })
      .addCase(getCommentsOnArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeArticle.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(dislikeArticle.pending, (state) => {
        state.buttonLoading = true;
      })
      // .addCase(deleteArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   const articleIndex = state?.articles?.articles?.findIndex(
      //     (article) => article?.slug === action?.payload?.slug
      //   );
      //   state?.articles?.articles.splice(articleIndex, 1);
      // })
      .addCase(likeArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.buttonLoading = false;
        state.isSuccess = true;
        state.articles.articles = state.articles?.articles?.map((article) => {
          if (article.slug === action.payload.article.slug) {
            state.singleArticle = {
              article: {
                ...article,
                favorited: true,
                favoritesCount: action.payload.article.favoritesCount,
              },
            };
            return {
              ...article,
              favorited: true,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        });
        state.articlesFeed.articles = state.articlesFeed?.articles?.map((article) => {
          if (article.slug === action.payload.article.slug) {
            state.singleArticle = {
              article: {
                ...article,
                favorited: true,
                favoritesCount: action.payload.article.favoritesCount,
              },
            };
            return {
              ...article,
              favorited: true,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        });
      })
      .addCase(dislikeArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.buttonLoading = false;
        state.isSuccess = true;
        state.articles.articles = state.articles?.articles?.map((article) => {
          if (article.slug === action.payload.article.slug) {
            state.singleArticle = {
              article: {
                ...article,
                favorited: false,
                favoritesCount: action.payload.article.favoritesCount,
              },
            };
            return {
              ...article,
              favorited: false,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        });
        state.articlesFeed.articles = state.articlesFeed?.articles?.map((article) => {
          if (article.slug === action.payload.article.slug) {
            state.singleArticle = {
              article: {
                ...article,
                favorited: false,
                favoritesCount: action.payload.article.favoritesCount,
              },
            };
            return {
              ...article,
              favorited: false,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        });
      })
      .addCase(getSingleArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleArticle = action.payload;
      })
      .addCase(commentArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.commentLoading = false;
        state.isSuccess = true;
        state.comments?.comments.push(action.payload);
      })
      .addCase(getAllArticles.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getArticlesFeed.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articlesFeed = action.payload;
      })
      .addCase(getCommentsOnArticle.fulfilled, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(deleteOneComment.fulfilled, (state: ArticlesState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments?.comments.splice(
          state.comments.comments.findIndex(
            (singleArticle) => singleArticle.id === action?.payload
          ),
          1
        );
      })
      .addCase(getSingleArticle.rejected, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCommentsOnArticle.rejected, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(deleteArticle.rejected, (state: ArticlesState, action: AnyAction) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      .addCase(getAllArticles.rejected, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getArticlesFeed.rejected, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(commentArticle.rejected, (state: ArticlesState, action: AnyAction) => {
        state.commentLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(createOneArticle.rejected, (state: ArticlesState, action: AnyAction) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      .addCase(deleteOneComment.rejected, (state: ArticlesState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeArticle.rejected, (state: ArticlesState, action: AnyAction) => {
        state.buttonLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(dislikeArticle.rejected, (state: ArticlesState, action: AnyAction) => {
        state.buttonLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const ArticleReducer = articlesSlice.reducer;
