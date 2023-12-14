import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
export interface IUpdateMyInsurance {
	patientId?: string;
	relationshipId?: number;
	insuranceName: string; //company
	memberId: string;
	insuredLastName: string; // lastName
	insuredFirstName: string; // Name primary
	subscriberRelationship: string; // relationShip
	groupId?: string;
	planType?: string;
	companyId: string | number;
	isPrimary?: boolean;
	name_of_insuredH: string;
	lastname_of_insuredH: string;
	dateOfBirthH: Moment | string;
}

export interface IConsultAvility {
	firstName: string;
	lastName: string;
	birthDate: string;
	memberId: string;
	authUid: string;
}

export const ValidateMyInsurance: Yup.SchemaOf<IUpdateMyInsurance> = Yup.object().shape({
	insuranceName: Yup.string().required('required'),
	insuredFirstName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	insuredLastName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	memberId: Yup.string().required('required').max(30, 'max'),
	subscriberRelationship: Yup.string().required('required'),
	groupId: Yup.string().max(30, 'max'),
	patientId: Yup.string(),
	relationshipId: Yup.number(),
	isPrimary: Yup.boolean(),
	companyId: Yup.string(),
	planType: Yup.string(),
	name_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('relationshipId', {
			is: (value: number) => value !== 0 && value !== 1,
			then: Yup.string()
				.required('required')
				.matches(REGEX.lettersChars, 'invalidName')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string(),
		}),
	lastname_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('relationshipId', {
			is: (value: number) => value !== 0 && value !== 1,
			then: Yup.string()
				.required('required')
				.matches(REGEX.lettersChars, 'invalidName')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string(),
		}),
	dateOfBirthH: Yup.date().when('relationshipId', {
		is: (value: number) => value !== 0 && value !== 1,
		then: Yup.date()
			.required('required')
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
		otherwise: Yup.date()
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
	}),
});
