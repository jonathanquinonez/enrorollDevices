import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			marginHorizontal: 6,
			alignSelf: 'center',
		},
		bottomLabel: {
			fontFamily: 'Open Sans',
			fontWeight: '400',
			fontSize: 12,
			textAlign: 'center',
			color: colorsLight.BLUE307,
		},
	});

export default styles;
