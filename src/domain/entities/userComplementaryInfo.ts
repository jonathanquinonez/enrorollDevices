import { UserConfirmCredentials } from "./userConfirmCredentials";

export interface UserComplementaryInfo
	extends Omit<UserConfirmCredentials, 'email' | 'phone' | 'shouldOmitEmail' | 'shouldOmitPhone'> {
	firstName: string;
	lastName: string;
	dateBirth: string;
	eMail: string;
	mobile: string;
	gender: string;
	address?: string;
	address1?: string;
	address2?: string;
	city: string;
	state: string;
	homePhone?: string;
	home?: string;
	ssn?: string | null;
	zipCode: string;
	emergencyName: string;
	emergencyLastName: string;
	emergencyMobile: string;
	emergencyRelationship: string;
	emergencyContact: boolean;
};
