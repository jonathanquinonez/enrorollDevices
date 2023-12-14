import { SerializedError } from "@reduxjs/toolkit";

export interface TwoFactorState {
  error?: SerializedError;
  isLoading: boolean;
	email?: string;
  phone?: string;
  isEmail?: boolean
  idTemp?: string
  attemps?: string,
  value?: any
};

