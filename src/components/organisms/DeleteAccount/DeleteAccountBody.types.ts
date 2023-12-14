import { deleteAccount } from 'domain/entities/deleteAccount';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrorsImpl, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
/**
 * @interface PersonalInfoProps
 * @since 1.0.0
 */

export interface DeleteAccountBodyProps {
	motive: string;
	// other?: string;
}
export interface DeleteAccountBodyProps2 {
	other: string;
}



export const DeleteSchema: Yup.SchemaOf<DeleteAccountBodyProps> = Yup.object().shape({
	motive: Yup.string()
		.required('required')
		.min(3, 'min')
		.max(250, 'max')
		.nullable(),
	/* other: Yup.string()
		.notRequired()
		.min(3, 'min')
		.max(250, 'max'), */
});

export const DeleteSchema2: Yup.SchemaOf<DeleteAccountBodyProps2> = Yup.object().shape({
	other: Yup.string()
		.required('required')
		.min(3, 'min')
		.max(250, 'max')
		.matches(REGEX.lettersChars, 'invalidFormatGeneric'),
});

