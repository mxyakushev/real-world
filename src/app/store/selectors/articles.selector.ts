import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const articlesGeneralSelector = (state: TypeRootState) => state.articles;
export const articlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.articles
);

export const articlesFeedStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.articlesFeed
);

export const singleArticleStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.singleArticle
);

export const articleCommentsStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.comments
);

export const errorArticlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.isError
);

export const loadingArticlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.isLoading
);

export const loadingBtnArticlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.buttonLoading
);

export const loadingCommentsArticlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.commentLoading
);

export const errorMessageArticlesStateSelector = createDraftSafeSelector(
  articlesGeneralSelector,
  (state) => state.message
);
