import { SerializedError } from '@reduxjs/toolkit';

export interface BaseState {
	isLoading: boolean;
	error?: SerializedError;
};
