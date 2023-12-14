import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

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
			fontSize: 14,
			lineHeight: 20,
			letterSpacing: 0.25,
			color: colors.BLUEDC1,
			marginBottom: 20,
			marginTop: 20,
		},
		tittle: {
			textAlign: 'center',
			fontFamily: 'proxima-bold',
			fontSize: 20,
			lineHeight: 20,
			letterSpacing: 0.25,
			color: '#002D57',
			marginBottom: 7,
			marginTop: 20,
		},
		button: {
			marginBottom: 5,
		},
		secondaryText: {
			color: 'white',
			fontFamily: 'proxima-bold',
			fontSize: 16,
		},
		head: {
			justifyContent: 'center',
			marginTop: 20,
		},
		logo_image: {
			width: 20,
			height: 20,
			justifyContent: 'center',
		},
	});

export default styles;
