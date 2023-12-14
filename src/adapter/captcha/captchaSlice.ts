import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CaptchaState } from './captchaState';

const initialState: CaptchaState = {
	token: undefined,
	test: false,
	isLoading: false
};

export const CaptchaSlice = createSlice({
	name: 'captcha',
	initialState,
	reducers: {
		setCaptcha: (state, { payload }) => ({ ...state, captcha: payload }),
		setTest: (state, { payload }) => ({ ...state, test: payload })
	},
});

export const captchaActions = { ...CaptchaSlice.actions };
export default CaptchaSlice.reducer;