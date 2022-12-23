import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer, TagsReducer, ArticleReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tags: TagsReducer,
    articles: ArticleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
