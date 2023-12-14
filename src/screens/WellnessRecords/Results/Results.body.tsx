import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import React from 'react';

export const VitalSignResultBody = (props: any) => {
	return (
		<ScrollView
			style={{ flex: 1, marginHorizontal: 'auto', width: '100%', alignContent: 'center' }}
		>
			<Text>Hola</Text>
		</ScrollView>
	);
};
