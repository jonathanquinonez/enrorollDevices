import { StyleSheet } from 'react-native';
import { isIphone } from 'src/utils/devices';

const styles = () =>
	StyleSheet.create({
		containerRow: {
			paddingHorizontal: 30,
			paddingVertical: 10,
		},

		title: {
			fontFamily: 'proxima-bold',
			lineHeight: 24,
			fontSize: isIphone() ? 23 : 21,
			color: 'white',
		},
		subtitle: {
			marginTop: 5,
			fontFamily: 'proxima-regular',
			fontSize: isIphone() ? 16 : 14,
			color: 'white',
			marginBottom:25
		},
	});

export default styles;
