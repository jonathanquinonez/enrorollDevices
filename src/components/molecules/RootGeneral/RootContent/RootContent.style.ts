import { KeraltyColors } from 'config/theme';
import { Platform, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#F1F1F1',
			borderTopLeftRadius: 40,
			paddingHorizontal: 20,
			paddingBottom: 0,
			paddingTop: 10
		},

		lineGradient: {
			position: 'absolute',
			top: -20,
			right: 50,
			left: 50,
			borderRadius: 5,
			zIndex: 1,
		},
		text: {
			fontFamily: 'proxima-semibold',
			fontSize: 14,
			color: '#5B5C5B',
			alignSelf: 'flex-end',
			paddingRight: 10
		},
		icon: {
			justifyContent: 'center',
			alignItems: 'center',
			width: 44,
			height: 44,
			left: 30,
		},

		button: {
			position: 'absolute',
			zIndex: 2,
			top: -55,
			right: 20,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.29,
			shadowRadius: 4.65,
			elevation: 7,
			backgroundColor: colors.GREENDC1,
			borderRadius: 50,
			width: 54,
			height: 54,

		},
	});

export default styles;
