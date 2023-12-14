import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		card: {
			width: Dimensions.get('window').width * 0.87,
			backgroundColor: 'white',
			height: 220,
			marginTop: 20,
			marginBottom: 60,
			borderRadius: 15,
			flex: 1,
			paddingVertical: 15,
            paddingHorizontal: 5
		},
		cardbtn: {
			marginHorizontal: 50,
			marginVertical: 25,
		},
		phoneText: {
			color: '#002E58',
			fontSize: 14,
			fontFamily: 'proxima-bold',
			width: Dimensions.get('window').width * 0.68
		},
		websiteText: {
			fontFamily: 'proxima-bold',
			fontSize: 14,
			textAlign: 'center'
		},
		shadow: {
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5,
		},
		website: {
			textDecorationLine: 'underline',
			fontFamily: 'proxima-bold',
			fontSize: 14,
			color: colors.BLUE307,
			lineHeight: 17,
		},
	});

export default styles;
