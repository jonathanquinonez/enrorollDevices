import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			width: Dimensions.get('window').width,
			alignItems: 'center',
		},
		text: {
			fontFamily: 'proxima-regular',
			fontSize: 14,
			lineHeight: 17,
			color: '#5B5C5B',
		},
		contentText: {
			paddingHorizontal: 20,
			marginBottom: 24,
		},
		label: {
			marginTop: 31,
			fontFamily: 'proxima-bold',
			lineHeight: 19,
			color: '#055293',
			paddingBottom: 10,
		},
		tittle: {
			color: colors.BLUEDC1,
			fontSize: 16,
			alignItems: 'flex-start',
			fontFamily: 'proxima-bold',
			textAlign: 'left',
			paddingTop: 11,
		},
		button: {
			flexDirection: 'row',
			justifyContent: 'center',
			paddingBottom: 10,
			paddingTop: 10,
		},
		secondaryText: {
			color: '#0069A7',
		},
		optional: {
			color: '#055293',
			fontSize: 12,
			textAlign: 'left',
			paddingTop: 12,
			alignItems: 'flex-start',
		},
		textButton: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
			fontWeight: '600',
			paddingTop: '2%',
			paddingLeft: 8,
			color: '#055293',
		},
		dimensions: {
			width: Dimensions.get('window').width,
			alignItems: 'center',
		},
		contentRow: {
			marginTop: 5,
			justifyContent: 'center',
			alignItems: 'center',
			width: '75%',
			flexDirection: 'row',
		},
		textInfo: {
			fontFamily: 'proxima-regular',
			fontSize: 14,
			lineHeight: 17,
			color: colors.GRAYDC1,
			fontWeight: '600',
		},
	});

export default styles;
