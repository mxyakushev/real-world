import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const authTypeGeneralSelector = (state: TypeRootState) => state.auth;
export const authTypeStateSelector = createDraftSafeSelector(
  authTypeGeneralSelector,
  (state) => state.user
);
