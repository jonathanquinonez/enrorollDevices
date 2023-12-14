import moment from 'moment-timezone';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FORMATS from 'ui-core/utils/formats';

export const isIphone = () => {
	return Platform.OS === 'ios';
};
export const extraScrollHeigth = () => {
	return isIphone() ? 20 : 60;
};

export const isIphoneX = () => {
	const dimen = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimen.height === 780 ||
			dimen.width === 780 ||
			dimen.height === 812 ||
			dimen.width === 812 ||
			dimen.height === 844 ||
			dimen.width === 844 ||
			dimen.height === 852 ||
			dimen.width === 852 ||
			dimen.height === 896 ||
			dimen.width === 896 ||
			dimen.height === 926 ||
			dimen.width === 926 ||
			dimen.height === 932 ||
			dimen.width === 932)
	);
};

export const getHourDifference = () => {
	// Get the current date and time
	const currentDate = new Date();
	// Get the current UTC hour
	const currentUTCHour = currentDate.getUTCHours();
	// Get the current local hour
	const currentLocalHour = currentDate.getHours();
	// Calculate the hour difference
	const hourDifference = currentLocalHour - currentUTCHour;
	return hourDifference;
};

export const getCurrentValidatedTime = (data: { date: string; time: string }): Date | undefined => {
	try {
		// Parse the input date and time strings
		const dateTimeString = `${data.date}T${data.time}`.split('.')[0] + '.000Z';
		const dateTime = new Date(dateTimeString);
		// Check if the parsing was successful
		if (isNaN(dateTime.getTime())) {
			throw new Error('Invalid date or time format');
		}
		return dateTime;
	} catch (error) {
		return undefined;
	}
};
// console.log('---------------------------------------------------------')
// console.log('--currentDate--', moment(dateBackend).format(), currentDate)
// console.log('--startDate--', moment(date_init).format(), startDate)

export const TIMES_ZONES = {
	ET: {
		timeZone: 'America/New_York',
		key: 'ET',
	},
	CT: {
		timeZone: 'America/Chicago',
		key: 'CT',
	},
};

export const checkMaintenanceStatus = (
	date_end: string,
	date_init: string,
	dateBackend: string,
): string => {
	if (!date_end) return 'no';
	if (!date_init) return 'no';
	if (!dateBackend) return 'no';

	const currentDate = new Date(moment(dateBackend).format());
	const startDate = new Date(moment(date_init).format());
	const endDate = new Date(moment(date_end).format());

	// console.log('---------------------------------------------------------')
	// console.log('--currentDate--', moment(dateBackend).format(), currentDate)
	// console.log('--startDate--', moment(date_init).format(), startDate)

	if (currentDate >= startDate && currentDate <= endDate) {
		return 'in_maintenance';
	} else if (currentDate < startDate) {
		return 'upcoming_maintenance';
	} else {
		return 'no';
	}
};

export const ordinalText = (day: number) => {
	if (day % 10 === 1) return 'st';
	if (day === 2 || day === 22) return 'nd';
	if (day === 3 || day === 23) return 'rd';
	if ((day >= 4 && day <= 20) || (day >= 24 && day <= 30)) return 'th';
	return '';
};

interface TimeZone {
	timeZone: string;
	key: string;
}
interface CurrentDateProps {
	date: string;
	timeZone?: TimeZone;
	language?: string;
}

const getMonthName = (date: string, language: string) => {
	const validLanguages = ['es', 'en'];
	if (!validLanguages.includes(language)) {
		throw new Error('Idioma no válido. Use "es" para español o "en" para inglés.');
	}
	moment.locale(language);
	const monthName = moment(date).format('MMMM');
	return monthName;
};

export const getCustomDate = ({
	date,
	timeZone = { timeZone: '', key: '' },
	language = 'en',
}: CurrentDateProps) => {
	let originalDate = new Date(date);
	moment.locale(language);
	const finalDate = moment.tz(originalDate, timeZone.timeZone).format('YYYY, MMMM DD, HH:mm');
	const finalDate2 = moment.tz(originalDate, timeZone.timeZone).format('YYYY, MMMM DD, HH:mm');
	const finalDateSplited = finalDate.replace(',', '').split(' ');
	return {
		date: moment.tz(originalDate, timeZone.timeZone).format('MM/DD/YYYY'),
		time: `${finalDateSplited[3]} ${timeZone.key}`,
		dateToValidate: finalDate2,
	};
};
