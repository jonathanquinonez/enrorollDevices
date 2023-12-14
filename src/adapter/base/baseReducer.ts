import { SerializedError } from '@reduxjs/toolkit';
import { BaseState } from './baseState';

const baseReducer = {
	pending: (state: BaseState) => {
		state.isLoading = true;
		state.error = undefined;
	},
	fullfilled: (state: BaseState) => {
		state.isLoading = false;
		state.error = undefined;
	},
	rejected: (state: BaseState, action: { error: SerializedError }) => {
		state.isLoading = false;
		state.error = action.error;
	}
};

export default baseReducer;
