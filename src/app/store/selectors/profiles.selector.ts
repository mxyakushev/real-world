import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const profilesGeneralSelector = (state: TypeRootState) => state.profiles;

export const profileStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.profile
);

export const profileLoadingStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.isLoading
);
