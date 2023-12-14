import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { buildSelectors } from '@reduxjs/toolkit/dist/query/core/buildSelectors';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			maxWidth: '100%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'wrap',
			paddingHorizontal: 5,
			paddingVertical: 5,
		},
		mainContent: {
			flexDirection: 'row',
			flex: 1,
		},
		iconContainer: {
			height: 35,
			
			width:50
			
		},
		rightIcon: {
			paddingRight: 10,
			paddingLeft: 8,
		},
		title: {
			fontFamily: 'proxima-bold',
			fontSize: 15,
			color: '#012A58',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
			textAlignVertical: 'center',
			lineHeight: 20,
			flex: 1,
			marginHorizontal :20
		},
		submenu: {
			paddingHorizontal: 25,
			paddingBottom: 2,
		},
		divider: {
			borderBottomColor: colors.GRAYDC2,
		},
	});

export default styles;
