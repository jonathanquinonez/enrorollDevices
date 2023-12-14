import { SerializedError } from "@reduxjs/toolkit";

export interface CaptchaState {
	token?: string;
    test?: boolean;
    error?: SerializedError;
    isLoading: boolean;
};

