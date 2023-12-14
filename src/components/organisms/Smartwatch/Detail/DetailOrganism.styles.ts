import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			paddingBottom: 50,
		},
		average: {
			color: colorsLight.BLUE2F7,
			marginVertical: 2,
			marginLeft: 4,
		},
	});

export default styles;
