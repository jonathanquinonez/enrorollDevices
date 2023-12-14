import { PayloadAction } from '@reduxjs/toolkit';


export const baseActions = <T>() => ({
	setProp: (state: T, action: PayloadAction<{ [K in keyof T]?: T[K] }>) => {
		return { ...state, ...action.payload };
	}
});
