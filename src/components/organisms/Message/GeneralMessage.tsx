import React, { ReactElement } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import Button from 'src/components/atoms/Button/Button';
import Row from 'src/components/atoms/Row/Row';

interface ITypeMessage {
	icon: ReactElement;
	title?: string;
	message: string;
	title1: string;
	title2?: string;
	submit1: () => void;
	submit2?: () => void;
	isConfirm?: boolean;
	textStyles?: StyleProp<TextStyle>;
}

const GeneralMessage = (props: ITypeMessage) => {
	const {
		icon,
		message,
		title1,
		title2 = '',
		submit1,
		submit2,
		isConfirm = false,
		title,
		textStyles,
	} = props;
	return (

		<View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 30 }}>
			<View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 10 }} >{icon}</View>
			{title ? (
				<View style={{ marginVertical: 10 }}>
					<Text
						style={{
							fontFamily: 'proxima-bold',
							fontSize: 20,
							color: '#002D57',
							textAlign: 'center'
						}}
						maxFontSizeMultiplier={1.3}
					>
						{title}
					</Text>
				</View>
			) : (
				<></>
			)}
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					marginVertical: 10
				}}
			>
				<Text
					style={[{
						fontFamily: 'proxima-regular',
						fontSize: 14,
						color: '#212121'
						,
						textAlign: 'center'

					}, textStyles]}
					maxFontSizeMultiplier={1.3}
				>
					{message}
				</Text>
			</View>
			<View
				style={{
					width: 250,
					height: 50,
					flexDirection: 'row',
					justifyContent: !isConfirm ? 'space-around' : 'center',
					marginBottom:30,
				}}
			>
				{!isConfirm ? (
					<>
						<Button
							title={title1}
							onPress={submit1}
							variant={'Outlined'}
							style={{ width: 100, height: 10, marginTop: 15 }}
						/>
						<Button
							title={title2}
							onPress={submit2}
							style={{ width: 100, height: 30, marginTop: 15 }}
						/>
					</>
				) : (
					<Button title={title1} onPress={submit1} style={{ width: 100, height: 30, marginTop: 15 }} />
				)}
			</View>
		</View>
	);
};

export default GeneralMessage;
