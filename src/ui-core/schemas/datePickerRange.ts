import * as Yup from 'yup';
import { DatePickerRangeInfo } from 'domain/entities/datePickerRange';

const ValidationsFieldTo = (yearRange, message) => Yup.date()
	.required('required')
	.nullable()
	.min(Yup.ref('from'), 'invalidDateRange')
	.when('from', (from, schema) => {
		return schema.test({
				test: to => {
					const yearAfter = new Date(from);
					yearAfter.setFullYear(yearAfter.getFullYear() + yearRange);
					if (to) {
							return !(to && to >= yearAfter);
					}
					return false;
				},
				message: message
		})
	});

export const DatePickerFieldToShape = ValidationsFieldTo;

export const DatePickerRangeSchema: Yup.SchemaOf<DatePickerRangeInfo> = Yup.object().shape({
	from: Yup.date()
		.required('required'),
	to: Yup.date()
		.required('required')
		.min(Yup.ref('from'), 'invalidDateRange')
});