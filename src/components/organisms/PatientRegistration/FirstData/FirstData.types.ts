import { CreateUser } from 'domain/entities/createUser';
import { TempFormUser } from 'domain/entities/tempFormUser';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface FirstProps
 * @since 1.0.x
 */
export interface FirstProps {
	handlerNext: () => void;
	setFirstData: React.Dispatch<React.SetStateAction<{}>>
}

export interface FirstList {
	zip2: string,
};

export const FirstInfo: Yup.SchemaOf<FirstList> = Yup.object().shape({
	zip2: Yup.string()
		.required('required')
		.max(12, 'max')
		.min(5, 'min')
		.matches(REGEX.zipcode, 'invalidFormatGeneric'),
});
