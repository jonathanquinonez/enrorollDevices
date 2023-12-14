import { colorsLight } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			alignContent: 'center',
			alignItems: 'center',
			backgroundColor: colorsLight.WHITE,
			paddingTop: 10,
			height: 82,
			borderRadius: 18,
			shadowColor: colorsLight.BLACK,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.35,
			shadowRadius: 6,
			elevation: 5,
		},
	});

export default styles;
