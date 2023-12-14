import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		centeredView: {
			flex: 1,
		},
		container: {
			flex: 1,
			backgroundColor: 'red',
		},
		box: {
			height: 100,
			width: '100%',
		},
		box1: {
			flex: .5,
		},
		box2: {
			flex: 10, justifyContent: 'center', //backgroundColor: 'yellow',
		},
		box3: {
			flex: .1,
		},
		modal: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: "white",
			width: Dimensions.get('window').width * 0.88,
			paddingHorizontal: 8,
			borderRadius: 15,
			borderWidth: 1,
			borderColor: '#eee',
			alignSelf: 'center'
		},
	});

export default styles;
