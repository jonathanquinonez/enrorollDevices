/* eslint-disable arrow-body-style */

export const capitalize = (text: string) => {
	return text.split(' ')
		.map((sub: string) =>
			`${sub.substring(0, 1).toUpperCase()}${sub.substring(1, sub.length).toLowerCase()}`
		).join(' ');
};

export const capitalizeJustFirst = (text: string) => {
	return `${text.substring(0, 1).toUpperCase()}${text.substring(1, text.length).toLowerCase()}`;
};

export const secureEmail = (email: string) => {
	if (!email) return '';
	const [username, domain] = email.split('@');

	return `${username.substr(0, (username.length / 2))}${'*'.repeat(username.length / 2)}@${domain}`;
};

export const securePhone = (phone = '9999999999') => {
	return `******${phone.substring(9, phone.length)}`;
};
