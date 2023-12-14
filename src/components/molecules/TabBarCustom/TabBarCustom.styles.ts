import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		button: {
			top: -22.5,
			justifyContent: 'center',
			alignItems: 'center',
			width: 50,
			height: 50,
			borderRadius: 27,
		  },
		  buttonIcon: {
			fontSize: 16,
			color: '#F6F7EB'
		  }
	});

export default styles;
