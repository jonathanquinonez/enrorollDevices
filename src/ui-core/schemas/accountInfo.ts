import * as Yup from 'yup';
import { AccountInfo } from 'domain/entities/accountInfo';


export const AccountInfoSchema: Yup.SchemaOf<AccountInfo> = Yup.object().shape({
	accountNumber: Yup.string()
		.required('required')
		.max(10, 'max'),
	birthdate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
});
