import * as Yup from 'yup';


export interface ValidCodeInfoType {
	code: string;
};

export const ValidCodeInfoSchema: Yup.SchemaOf<ValidCodeInfoType> = Yup.object().shape({
	code: Yup.string()
		.required('minCode')
		.min(6, 'minCode')
});

export const DefaultValidCodeInfo: ValidCodeInfoType = {
	code: ''
};
