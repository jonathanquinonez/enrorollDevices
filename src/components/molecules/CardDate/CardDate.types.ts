import { ReactElement } from 'react';
import { Platform, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface CardProps
 * @since 1.0.0
 */
export interface CardProps {
	onPress?: () => void;
	data: Data;
}

interface Data {
	label: string;
	date: Date;
}

export const convertMonth = (date: Date, language: 'es' | 'en') => {
	try {
		if (Platform.OS === 'ios') {
			const month = new Date(date).toLocaleString(language, { month: 'short' });
			const capitalizedMonth = month.substring(0, 1).toUpperCase() + month.substring(1);
			return capitalizedMonth.substring(0, 3);
		} else {
			const month = new Date(date).toLocaleString().split(" ", 2)[1];
			if (language == 'en') return month;
			else switch (month) {
				case 'Jan':
					return 'Ene';
				case 'Apr':
					return 'Abr';
				case 'Aug':
					return 'Ago';
				case 'Dec':
					return 'Dic';
				default:
					return month;
			}
		}
	} catch (error) {
		return ''
	}
};
export const convertMonth2 = (date: string, language: 'es' | 'en') => {
	try {
		return `${getMonthFromDate(date, language)} ${new Date(date).getDate()}${language == 'en' ? 'Th' : ''}, ${new Date(date).getFullYear()}`
	} catch (error) {
		return ''
	}
};

function getMonthFromDate(date: string, language: 'es' | 'en'): string {
	const months = {
		es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	};

	const dateObject = new Date(date);
	const monthIndex = dateObject.getMonth();

	return months[language][monthIndex];
}
