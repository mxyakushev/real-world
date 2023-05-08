import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const authGeneralSelector = (state: TypeRootState) => state.auth;
export const authStateSelector = createDraftSafeSelector(
  authGeneralSelector,
  (state) => state.user
);
export const loadingAuthStateSelector = createDraftSafeSelector(
  authGeneralSelector,
  (state) => state.isLoading
);
