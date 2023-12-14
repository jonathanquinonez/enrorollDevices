import { RootState } from 'adapter/store';
import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state: RootState) => state.loader;

export const selectIsLoading = createSelector(
	selectSelf,
	({ loadingActions }) => loadingActions > 0
);
