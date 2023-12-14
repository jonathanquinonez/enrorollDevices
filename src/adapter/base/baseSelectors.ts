import { createSelector } from "@reduxjs/toolkit";
import { BaseState } from './baseState';
import { RootState } from '../store';


export const baseSelectors = (selectSelf: (state: RootState) => BaseState) => ({
	selectError: createSelector(selectSelf, ({ error }) => error?.message),
	selectIsLoading: createSelector(selectSelf, ({ isLoading }) => isLoading)
});
