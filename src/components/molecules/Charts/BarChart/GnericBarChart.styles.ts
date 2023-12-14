import { StyleSheet } from 'react-native';
import { colorsLight } from 'config/theme';

const styles = () =>
	StyleSheet.create({
		container: {
			marginVertical: 10,
			borderWidth: 2,
			borderColor: colorsLight.GRAY_MEDIUM_3,
		},
	});

export default styles;
