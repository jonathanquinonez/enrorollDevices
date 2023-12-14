import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		button: {
			width: 64,
			height: 26,
			backgroundColor: colorsLight.WHITE,
			justifyContent: 'center',
			borderRadius: 6.5,
			margin: 2,
		},
		label: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontFamily: 'proxima-bold',
		},
	});

export default styles;
