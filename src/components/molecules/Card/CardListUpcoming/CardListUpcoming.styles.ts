import { StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = () =>
	StyleSheet.create({
		title1: {
			fontFamily: 'proxima-semibold',
			fontSize: 15,
			color: '#5B5C5B',
			paddingRight: 5,

		},
		subTitle1: {
			fontFamily: 'proxima-regular',
			fontSize: 15,
			color: '#5B5C5B',
			flex: 1,
		},
		container: {
			width: windowDimentions.width * 0.95,
			marginBottom: 30,
			flexDirection: 'row',
			alignItems: 'center',
			paddingTop: 0
		},
		viewElement: {
			alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 18
		},
		flexRow: {
			flexDirection: 'row'
		},
		subTitle: {
			fontFamily: 'proxima-regular',
			fontSize: 15,
			color: '#5B5C5B',
			flex: 1,
		},
		title: {
			fontSize: 18,
			fontFamily: 'proxima-semibold',
			color: '#002E58',
			width: '78%'
		},
		button: {
			marginRight: 60,
			width: 240,
			height: 35,
		},
		textAbailable: {
			width: windowDimentions.width * 0.7,
			textAlign: 'center',
			marginLeft: 10,
			marginTop: 30,
			color: '#055293',
			fontSize: 14,
			fontFamily: 'proxima-bold'
		},
		row: {
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
			elevation: 3,
		},

		view: {
			// flex: 1,
			height: 55,
			justifyContent: 'center',
			alignItems: 'center',
			// marginBottom: 10,
			marginTop: 10
		},
	});

export default styles;
