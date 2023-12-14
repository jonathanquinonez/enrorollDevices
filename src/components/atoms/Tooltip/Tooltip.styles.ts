import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			backgroundColor: colorsLight.WHITE,
			borderRadius: 10,
			padding: 16,
			marginBottom: 10,
			shadowColor: colorsLight.BLACK,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.35,
			shadowRadius: 6,
			elevation: 5,
		},
		title: {
			fontFamily: 'proxima-bold',
			fontWeight: '700',
			fontSize: 16,
			color: colorsLight.GRAY_MEDIUM_4,
		},
		description: {
			fontFamily: 'proxima-regular',
			fontWeight: '400',
			color: colorsLight.TEXTCOLORDARK,
		},
	});

export default styles;
