import { EmailIdentifier } from './emailIdentifier';

export interface UserIdentifier extends Pick<EmailIdentifier, 'email'> {
	firstName: string;
	lastName: string;
};
