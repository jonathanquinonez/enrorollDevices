/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */

import { Dimensions, StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
	Container: {
		display: 'flex',
		width: 100,
		marginHorizontal: Dimensions.get('window').width * 0.035,
		minHeight: 85,
		gap: 4,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	ImageStyles: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: 'transparent',
		marginBottom: 3,
	},
	TextStyles: {
		textAlign: 'center',
		width: '100%',
		fontSize: 11.5,
		fontWeight: '400',
		color: '#004A76',
	},
});
