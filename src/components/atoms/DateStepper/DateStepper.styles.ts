import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			backgroundColor: colorsLight.GRAY_MEDIUM_3,
			justifyContent: 'space-around',
			borderRadius: 8,
			padding: 2,
			marginVertical: 15,
		},
	});

export default styles;
