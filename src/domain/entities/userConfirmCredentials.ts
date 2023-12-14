import { UserCredentials } from './userCredentials';

export interface UserConfirmCredentials extends UserCredentials {
	confirmPassword: string;
	terms: boolean;
	shouldOmitEmail?: boolean;
	shouldOmitPhone?: boolean;
	pass : string;
	policy: boolean
};
