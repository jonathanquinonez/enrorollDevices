import { Colors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = () =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			width: '100%',
			borderRadius: 10,
			paddingHorizontal: 16,
			paddingVertical: 8,
			marginBottom: 10,
			shadowColor: Colors.dark.BLACK,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.35,
			shadowRadius: 6,
			elevation: 5,
			backgroundColor: Colors.light.WHITE,
			justifyContent: 'space-between',
		},
		subContainer: {},
		arrow: {
			alignSelf: 'center',
		},
	});

export default styles;
