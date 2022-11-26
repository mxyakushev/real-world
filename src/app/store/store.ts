import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './slices';
import { articleQuery } from './queries';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [articleQuery.reducerPath]: articleQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleQuery.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
