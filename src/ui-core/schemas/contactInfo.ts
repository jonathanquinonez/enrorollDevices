import * as Yup from 'yup';
import { UserContactMethods } from 'domain/entities/userContactMethods';
//

export const ContactInfoSchema: Yup.SchemaOf<UserContactMethods> = Yup.object().shape({
	contactMethod: Yup.string()
		.nullable()
		.required('required')
		.oneOf(['phone', 'email'], 'required')
});
