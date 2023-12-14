import appConfig from 'config/index';
import { Dimensions, Platform, PixelRatio } from 'react-native';

export const getConfigValues = ({
	type = 'VIRTUAL_ASSISTANT',
	userData = {},
	lang = 'en',
	token = '',
	userType = 'public'
}: {
	type: 'VIRTUAL_ASSISTANT' | 'SYMPTOM_CHECKER' | 'LIFESTYLE_LIB';
	userData?: any;
	lang?: string;
	token: string;
	userType: string
}) => {
	let userInfo: any = {};
	const { THEME: theme, LAN } = appConfig[type];

	const {
		PROC_ID: procedureId,
		USER: username,
		PASS: password,
	} = !lang || lang !== 'es' ? LAN.EN : LAN.ES;

	if (Object.keys(userData).length) {
		userInfo = {
			usertype: userType,
			memberid: userData.ecwId || '0',
			dob: userData.birthdate,
			gender: userData.sex,
			organization_user_id: userData.authUid,
		};
	}

	switch (type) {
		case 'VIRTUAL_ASSISTANT':
			const { ENV: environment, DIALOG_FLOW: dialogFlowSettings } =
				appConfig['VIRTUAL_ASSISTANT'];
			return {
				theme,
				username,
				password,
				token,
				procedureId,
				lang,
				conversationData: {
					userInfo: {
						...userInfo,
						environment,
						...dialogFlowSettings,
					},
				},
			};
		case 'LIFESTYLE_LIB':
			const { ENV: environment2, DIALOG_FLOW: dialogFlowSettings2 } =
				appConfig['LIFESTYLE_LIB'];
			return {
				theme,
				username,
				password,
				token,
				procedureId,
				lang,
				conversationData: {
					userInfo: {
						...userInfo,
						environment2,
						...dialogFlowSettings2,
					},
				},
			};
		case 'SYMPTOM_CHECKER':
			return {
				theme,
				username,
				password,
				token,
				procedureId,
				lang,
				conversationData: {
					userInfo,
				},
			};
	}
};

export const getFileName = (file: string): string => {
	// Get the file name without the extension
	const fileName = file.split(".")[0];
	// Capitalize the first letter of the file name
	const capitalizedFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
	// Replace underscores with spaces
	const formattedFileName = capitalizedFileName.replace(/_/g, " ");
	return formattedFileName;
}

export const processText = (text: string): string => {
	// Reemplazar espacios por guión bajo
	const textWithoutSpaces = text.replace(/ /g, '_');
	// Cambiar tildes por letras normales
	const textWithoutAccents = textWithoutSpaces
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	// Eliminar caracteres especiales
	const textWithoutSpecialChars = textWithoutAccents.replace(/[^a-zA-Z0-9_]/g, "");
	return textWithoutSpecialChars;
}

export const returnGender = (gender: string) => {
	switch (gender.toLowerCase()) {
		case 'f':
			return 'female'
		case 'm':
			return 'male'
		case 'female':
			return 'female'
		case 'male':
			return 'male'
		default:
			return ''
	}
}

export const filterByDate = (array: Array<{ date: string; data: string }>, today: Date) => {
	const todayDate = new Date(today).toDateString()
	const todayData: Array<{ date: string; data: string }> = [];
	const otherData: Array<{ date: string; data: string }> = [];
	for (const object of array) {
		const date = object.date;
		const dateWithoutTime = new Date(date).toDateString();
		if (dateWithoutTime === todayDate) {
			todayData.push(object);
		} else {
			otherData.push(object);
		}
	}
	return [todayData, otherData];
}