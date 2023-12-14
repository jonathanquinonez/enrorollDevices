import { StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = () =>
	StyleSheet.create({
		container: {
			width: windowDimentions.width * 0.95,
			marginBottom: 30,
			flexDirection: 'row',
			alignItems: 'center',
			paddingTop:0
		},
		title: {
			fontSize: 18,
			fontFamily: 'proxima-semibold',
			color: '#055293',
			width:'78%'
		},
		button: {
			marginRight: 60,
			width: 240,
			height: 35,
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
