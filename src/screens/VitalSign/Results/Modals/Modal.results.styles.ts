import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			alignItems: 'center',
			paddingHorizontal: 15,
		},
		text: {
			textAlign: 'center',
			fontFamily: 'proxima-regular',
			fontSize: 18,
			color: colors.BLUEDC1,
			marginBottom: 20,
			marginTop: 25,
		},
		title: {
			textAlign: 'center',
			fontFamily: 'proxima-bold',
			fontSize: 18,
			marginTop: 15,
			lineHeight: 20,
			color: colors.BLUEDC1,
		},
		button: {
			marginBottom: 5,
		},
		head: {
			justifyContent: 'center',
			flex: 1,
			marginTop: 20,
		},
		secondaryText: {
			color: 'white',
			fontFamily: 'proxima-bold',
			fontSize: 16,
		},
		obj_success: {
			backgroundColor: '#008767',
			borderTopLeftRadius: 5,
			borderBottomLeftRadius: 5,
			margin: 1,
			width: 75,
			height: 10,
		},
		obj_warning: {
			backgroundColor: '#E7A304',
			margin: 1,
			width: 75,
			height: 10,
		},
		obj_error: {
			backgroundColor: '#B50303',
			borderTopRightRadius: 5,
			borderBottomRightRadius: 5,
			margin: 1,
			width: 75,
			height: 10,
		},
		mode_row: {
			flexDirection: 'row',
		},
		spacing: {
			paddingBottom: 5,
		},
		text_body: {
			fontSize: 14,
			fontFamily: 'proxima-regular',
			lineHeight: 14,
		},
	});

export default styles;
