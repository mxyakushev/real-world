import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const profilesGeneralSelector = (state: TypeRootState) => state.profiles;

export const profileStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.profile
);
export const errorProfilesStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.isError
);

export const profileLoadingStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.isLoading
);

export const errorMessageProfilesStateSelector = createDraftSafeSelector(
  profilesGeneralSelector,
  (state) => state.message
);
