import { RootState } from '../types';
import { baseSelectors } from '../base/baseSelectors';
import { createSelector } from '@reduxjs/toolkit';
import { CaptchaState } from './captchaState';

const selectSelf = (state: RootState): CaptchaState => state.captcha;

const selectors = baseSelectors(selectSelf);

const selectCaptchaToken = createSelector(selectSelf, ({ token }) => ({
	token
}));


export const captchaSelectors = {
	...selectors,
	selectCaptchaToken
};
