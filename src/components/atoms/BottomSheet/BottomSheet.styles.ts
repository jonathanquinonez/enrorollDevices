import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		wrapper: {
			flex: 1,
			justifyContent: 'flex-end',
		},
		background: {
			flex: 1,
			backgroundColor: 'transparent',
		},
		container: {
			width: '100%',
			overflow: 'hidden',
			borderTopRightRadius: 14,
			borderTopLeftRadius: 14,
		},
		body: {
			padding: 10,
			justifyContent: 'center',
			width: '100%',
			alignContent: 'center',
			alignItems: 'center',
			flex: 0,
			flexDirection: 'column',
		},
		draggableContainer: {
			width: '100%',
			alignItems: 'center',
			backgroundColor: 'transparent',
		},
		draggableIcon: {
			width: 40,
			height: 6,
			borderRadius: 3,
			margin: 10,
			marginBottom: 0,
		},
	});

export default styles;
