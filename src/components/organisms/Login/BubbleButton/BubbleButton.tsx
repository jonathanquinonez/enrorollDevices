import React from 'react';
import { stylesLogin } from '../Login.styles';
import { View, Text, Image } from 'react-native';
interface Props {
	source: string;
	text: string;
}

export const IconBubbleButton = ({ source, text }: Props) => {
	return (
		<View style={stylesLogin.Container}>
			<View style={[stylesLogin.ImageStyles]}>
				<Image
					source={source}
					//	resizeMode="contain"
					style={{ height: 50, width: 50, borderRadius: 30 }}
				/>
			</View>
			<Text style={[stylesLogin.TextStyles]}>{text}</Text>
		</View>
	);
};
