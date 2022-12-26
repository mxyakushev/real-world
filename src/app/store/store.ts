import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer, TagsReducer, ArticleReducer, ProfilesReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tags: TagsReducer,
    articles: ArticleReducer,
    profiles: ProfilesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
