type EcwGender = 'male' | 'female' | 'unknown';

export interface PersonalInfo {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sex: EcwGender;
	maritalStatus: string;
	employerPhone: string;
};
