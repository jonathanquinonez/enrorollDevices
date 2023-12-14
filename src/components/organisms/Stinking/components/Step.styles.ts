import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		rootContainer: {
			marginBottom: 50,
		},
		layout: {
			flex: 1,
			backgroundColor: colors.WHITE,
			borderTopLeftRadius: 60,
			borderWidth: 1,
			borderColor: colors.BORDER_GRAY,
			paddingLeft: 35,
			paddingRight: 15,
			paddingBottom: 15,
		},
		titleMentalHealth: {
			width: '100%',//Dimensions.get('window').width * 0.85,
			color: '#002D58',
			marginBottom:'5%',
			fontSize: 20,
			fontFamily: 'proxima-bold',
		},
		iconMentalHealth: {
			alignItems: 'center',
		},
		bodyMentalHealth: {
			width: Dimensions.get('window').width * 0.8,
			borderColor: colors.TEXTCOLORLIGHT,
			fontFamily: 'proxima-regular',
		},
		indicator_container: {
			width: Dimensions.get('window').width,
			alignItems: 'flex-start',
		},
		title_container: {
			width: Dimensions.get('window').width,
			alignItems: 'flex-start',
		},
		actions_container: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		title_font: {
			fontSize: 28,
			color: '#002D57',
			fontFamily: 'proxima-bold',
		},
		title_group: {
			width: Dimensions.get('window').width * 0.9,
			alignContent: 'center',
			alignItems: 'center',
		},
		scroll: {
			width: Dimensions.get('window').width * 0.85,
		},
		text_font: {
			color: colors.TEXTCOLORLIGHT,
			marginVertical: 25,
			fontFamily: 'proxima-regular',
		},
		italic_font: {
			color: colors.primary,
			fontFamily: 'proxima-regular',
            fontStyle: 'normal',
            marginVertical: 10,
            fontSize: 14,
            textAlign: 'center'
		},
		group_button: {
			width: '100%',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
		},
	});

export default styles;
