import { DarkTheme } from '@react-navigation/native';
import { KeraltyColors } from '.';

export const colorsDark: KeraltyColors = {
  // DEFAULT COLORS
	primary: '#0069A7',
	background: '#F8F8F8',
	card: '#F8F8F8',
	text: '#00AEC9',
	border: '#1877F2',
	notification: '#004444',
	// CUSTOM COLORS
	WHITE: '#FFFFFF',
	WHITE_TRANSPARENT: '#FFFFFF80',
	BLACK: '#000000',
	BLACK3: '#FFF',
	DARKBLUE: '#002D57',
	BLUE288: '#022F57',
	BLUE306: '#00b2e3',
	BLUE307: '#0069A7',
	BLUEDC1: '#055293',
	BLUE001: '#00B4E3',
	BLUE07F: '#004B7F',
	BLUE268: '#034268',
	BLUE8AF: '#00578A',
	GREEN362: '#4C9C2E',
	GREEN376: '#80bc00',
	GREENDC1: '#3CA70D',
	GREEN001: '#61B73A',
	TEXTCOLORLIGHT: '#212121',
	TEXTCOLORDARK: '#757575',
	BLACK_TRANSPARENT: '#00000080',
	// ACTIONS
	DANGER: '#D74840',
	WARNING: '#EDC536',
	SUCCESS: '#3adb76',
	ALERT: '#cc4b37',
	// GRAYSCALE
	GRAY_LIGHT: '#e6e6e6',
	GRAY_LIGHT_2: '#EEEDED',
	GRAY_LIGHT_3: '#D5D5D5',
	GRAY_LIGHT_4: '#F1F1F1',
	GRAY_LIGHT_5: '#DBDBDB',
	GRAY_MEDIUM: '#cacaca',
	GRAY_MEDIUM_2: '#C2C1C1',
	GRAY_MEDIUM_3: '#c4c4c4',
	GRAY_MEDIUM_4: '#656568',
	GRAY_DARK: '#8a8a8a',
	GRAY_DARK_2: '#999999',
	GRAYD8: '#D8D8D8',
	GRAYDC1: '#5B5C5B',
	GRAYDC2: '#E5E5E5',
	GRAYDC1_TRANSPARENT: '#5B5C5B80',
	GRAY: '#B4B4B4',
	BORDER_GRAY: '#d9d9d9',
	BACKGROUND_GRAY: '#F5F5F5'
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...colorsDark,
  },
};
