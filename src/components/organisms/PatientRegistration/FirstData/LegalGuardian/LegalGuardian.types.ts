import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface LegalGuardianProps
 * @since 1.0.x
 */
export interface LegalGuardianProps {
	handlerNext: () => void;
	setFirstData: (values: any) => void;
	getListOfPharmacies: (values: string) => void;
	listOfPharmacies: any[];
}

export interface LegalGuardianList {
	patient_relationship_to_insured: string;
	guarantorName: string;
	guarantorLast: string;
	guarantorSnn?: string;
	city: string;
	state: string;
	zipCode: string;
	address: string;
	mobile: string;
	homePhone?: string;
	pharmacy: string;
	reason: string;
	guarantorReasonLabel?: string;
	auth: boolean;
	dateOfBirth: Date;
	idFile64?: any;
	idFileName?: any;
	IDFile?: any;
	pharmaCondition?: boolean;
}

export const LegalGuardianYup: Yup.SchemaOf<LegalGuardianList> = Yup.object().shape({
	mobile: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
	homePhone: Yup.string()
		.notRequired()
		.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
	patient_relationship_to_insured: Yup.string().required('required'),
	guarantorReasonLabel: Yup.string().notRequired(),
	guarantorSnn: Yup.string()
		.nullable()
		.notRequired()
		.test('length', 'min', (x = '') => x === null || x === '' || x.length === 11)
		.max(11, 'max'),
	reason: Yup.string().required('required'),
	guarantorName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	pharmaCondition: Yup.boolean(),
	pharmacy: Yup.string().when('pharmaCondition', {
		is: true,
		then: Yup.string().required('required'),
		otherwise: Yup.string(),
	}),
	guarantorLast: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	city: Yup.string().required('required'),
	state: Yup.string().required('required'),
	zipCode: Yup.string().required('required'),
	address: Yup.string().required('required'),
	auth: Yup.boolean().notOneOf([null], 'required').required('required'),
	dateOfBirth: Yup.date().required('required').max(new Date(), 'invalidBirthdate'),
	idFile64: Yup.string().notRequired(),
	idFileName: Yup.string().notRequired(),
	IDFile: Yup.string().notRequired(),
});
