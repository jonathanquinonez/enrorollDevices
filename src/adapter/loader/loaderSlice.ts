import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const findByType = (actionType: string, types: string[]) =>
	types.some((status) => actionType.endsWith(status));

export const LoaderSlice = createSlice({
	name: 'loader',
	initialState: {
		loadingActions: 0
	},
	reducers: {
		setLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
			if (isLoading) state.loadingActions++;
			else state.loadingActions--;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				(action) => findByType(action.type, ['/pending']),
				(state) => { state.loadingActions++; },
			)
			.addMatcher(
				(action) => findByType(action.type, ['/fulfilled', '/rejected']),
				(state) => { state.loadingActions--; },
			);
	}
});

export const loaderActions = { ...LoaderSlice.actions };
export default LoaderSlice.reducer;
