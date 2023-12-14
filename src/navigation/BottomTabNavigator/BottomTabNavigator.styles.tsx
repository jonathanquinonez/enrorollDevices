import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flex: 1
		},
		navigatorContainer: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,
		},
		navigator: {
			borderTopWidth: 0,
			elevation: 30
		},
		xFillLine: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
		  }
	});

export default styles;
