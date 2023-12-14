/* eslint-disable prefer-destructuring */
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from './translations';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { Alert } from 'react-native';

const resources = { ...translations };

i18n.use(initReactI18next)
	.use({
		type: 'languageDetector',
		async: true,
		init: () => {},
		detect: async (callback: (lng: string) => void) => {
			// let lng = await AsyncStorage.getItem(ASYNC_STORAGE.LANGUAGE);
			let lng = 'en';

			// if (!lng) {
			//Lee el idioma del dispositivo
			lng = Localization.locale;
			//Si viene un idioma diferente de ingles o espanol, dejar ingles por defecto.
			if (!lng.startsWith('en') && !lng.startsWith('es')) {
				lng = 'en';
			} else {
				lng = lng.split('-')[0];
			}

			AsyncStorage.setItem(ASYNC_STORAGE.LANGUAGE, lng);
			// }

			callback(lng);
		},

		cacheUserLanguage: (lng: any) => {},
	})
	.init({
		compatibilityJSON: 'v3',
		resources,
		fallbackLng: 'en',
	});

export default i18n;
