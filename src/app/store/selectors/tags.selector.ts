import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { TypeRootState } from '../store';

export const tagsGeneralSelector = (state: TypeRootState) => state.tags;
export const tagsStateSelector = createDraftSafeSelector(
  tagsGeneralSelector,
  (state) => state.tags
);

export const tagSelectedStateSelector = createDraftSafeSelector(
  tagsGeneralSelector,
  (state) => state.selectedTag
);
