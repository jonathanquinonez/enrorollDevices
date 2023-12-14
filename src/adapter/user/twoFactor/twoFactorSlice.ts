import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const TwoFactorSlice = createSlice({
	name: 'loader',
	initialState: {
    email: '',
    phone: '',
		isEmail: undefined,
		idTemp: '',
		attemps: '',
		value: {}
	},
	reducers: {
		setVerifyEmailAndMobile: (state, { payload }) => ({ ...state, email: payload.email, phone: payload.phone, value: payload.value }),
		setIdTempAndAttemps:(state, {payload}) => ({ ...state, idTemp: payload.idTemp, attemps: payload.attemps, isEmail: payload.isEmail }),
	}
});

export const twoFactorActions = { ...TwoFactorSlice.actions };
export default TwoFactorSlice.reducer;
