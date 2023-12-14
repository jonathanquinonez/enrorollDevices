import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../types';
import { baseSelectors } from '../../base/baseSelectors';
import { TwoFactorState } from './twoFactorState';


const selectSelf = (state: RootState): TwoFactorState => state.twoFactorLogin;

const selectors = baseSelectors(selectSelf);

const selectVerifyEmailAndMobile = createSelector(
	selectSelf,
	({ email, phone, value }) => ({email, phone, value})
);

const selectRequestCodeEmailMobile = createSelector(
	selectSelf,
	({ idTemp, attemps, isEmail }) => ({idTemp, attemps, isEmail})
);

export const twoFactorSelectors = {
	...selectors,
	selectVerifyEmailAndMobile,
	selectRequestCodeEmailMobile
};

