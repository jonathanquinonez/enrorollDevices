export const formatPhone = (value: any): any => {
	if (!value) return value;

	const digits = String(value)
		.replace('+1', '')
		.replace('(', '')
		.replace(')', '')
		.replaceAll('-', '');

	return `(${digits.substring(0, 3)})${digits.substring(3, 6)}-${digits.substring(6, 10)}`;
};