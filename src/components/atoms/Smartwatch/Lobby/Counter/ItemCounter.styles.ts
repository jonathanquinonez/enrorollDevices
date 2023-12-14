import { Colors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {},

		subContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		label: {
			fontFamily: 'proxima-bold',
			fontSize: 28,
			marginLeft: 3,
			marginTop: -2,
		},
		subLabel: {
			fontFamily: 'proxima-regular',
			fontSize: 14,
			color: Colors.light.GRAY_DARK_3,
			marginLeft: 5,
			marginTop: 0,
		},
		date: {
			fontFamily: 'proxima-regular',
			fontSize: 14,
			color: Colors.light.GRAY_DARK_3,
			marginLeft: 4,
			marginTop: -4,
		},
	});

export default styles;
