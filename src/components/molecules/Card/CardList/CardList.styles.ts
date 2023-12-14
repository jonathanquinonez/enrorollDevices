import { StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = () =>
	StyleSheet.create({
		container: {
			width: windowDimentions.width * 0.7,
			marginBottom: 30,
			flexDirection: 'row',
			alignItems: 'center',
			paddingTop:0,
		},
		title: {
			fontSize: 18,
			fontFamily: 'proxima-semibold',
			color: '#002E58',
			width: windowDimentions.width * 0.6
		},
		button: {
			width: 240,
			height: 35,
		},
		textAbailable: {
			width: windowDimentions.width * 0.6,
			textAlign: 'center',
			marginLeft: 10,
			marginTop: 30,
			color: '#055293',
			fontSize: 14,
			fontFamily: 'proxima-bold'
		},
		row: {
			width: windowDimentions.width * 0.9,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'white',
			borderRadius: 20,
			marginBottom: 20,
			shadowColor: '#333333',
			shadowOffset: {
				width: 0,
				height: 1,
			},
			paddingBottom: 0,
			shadowOpacity: 0.22,
			shadowRadius: 2.22,
			elevation: 3
		},

		view: {
			height: 55,
			justifyContent: 'center',
			alignItems: 'center',
			// marginBottom: 10,
			marginTop: 10,
		},
	});

export default styles;
