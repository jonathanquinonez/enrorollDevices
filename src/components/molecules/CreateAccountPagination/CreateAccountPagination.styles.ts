import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		layout: {
			backgroundColor: colors.GRAY_LIGHT_4,
			borderTopLeftRadius: 40,
			paddingTop: 10,
		},
		shadow: {
			alignSelf: 'center',
			width: '95%',
			height: 30,
			position: 'absolute',
			zIndex: 1,
			borderTopLeftRadius: 60,
		},
		container: {
			marginTop: 24,
		},
		iconButton: {
			position: 'absolute',
			top: -15,
			zIndex: 2,
			right: 20,
		},
		contentContainerScroll: {
			alignItems: 'center',
			width: '100%',
			paddingTop: 15,
		},
		buttonNext: {
			alignItems: 'center',
			marginBottom: 20,
		},
		personalInfo: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
			lineHeight: 22,
			alignSelf: 'flex-start',
			marginLeft: 27,
			color: colors.BLUEDC1,
		},
		dimensions: {
			width: Dimensions.get('window').width,
			alignItems: 'center',
		},
		contentRow: {
			marginTop: 25,
			justifyContent: 'center',
			alignItems: 'center',
			width: '75%',
			flexDirection: 'row',
		},
		text: {
			fontFamily: 'proxima-regular',
			fontSize: 14,
			lineHeight: 17,
			color: colors.GRAYDC1,
		},

		textButton: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
			fontWeight: '600',
			paddingTop: '2%',
			paddingLeft: 8,
			color: '#055293',
		},
	});

export default styles;
