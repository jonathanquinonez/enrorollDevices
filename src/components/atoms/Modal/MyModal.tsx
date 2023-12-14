import React, { useState, useEffect } from 'react';
import {
	View,
	Modal,
	TouchableOpacity,
	Animated,
	Text
} from 'react-native';
// Hooks
import useStyles from 'src/hooks/useStyles';
// Types, Styles
import { MyModalProps as Props } from './MyModal.type';
import componentStyles from './MyModal.styles';


const MyModal = (props: Props) => {
	const { children, width, height, open = false, onRequestClose = () => close(), onClose = () => close(), } = props;
	const { styles } = useStyles(componentStyles);
	const [modalVisible, setModalVisible] = useState(open);
	const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
	const [pan, setPan] = useState(new Animated.ValueXY());


	useEffect(() => {
		handlerModalVisible(open);
	}, [open]);

	const handlerModalVisible = (visible: boolean) => {
		const { closeFunction, height } = props;
		if (visible) {
			setModalVisible(visible);
			Animated.timing(animatedHeight, {
				toValue: height,
				duration: 200,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.timing(animatedHeight, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			}).start(() => {
				pan.setValue({ x: 0, y: 0 });
				setModalVisible(visible);
				setAnimatedHeight(new Animated.Value(0));
				if (typeof closeFunction === 'function') closeFunction();
			});
		}
	};

	const close = () => {
		setModalVisible(false);
	};

	const panStyle = {
		transform: pan.getTranslateTransform(),
	};

	if (!modalVisible) return null;
	return (
		<Modal transparent visible={modalVisible} onRequestClose={() => onClose()}>
			<View style={[{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#25252589' }]}>
				{/* <TouchableOpacity style={{ height: 10, backgroundColor: 'white', }} activeOpacity={1} onPress={ onClose } /> */}

				<Animated.View
					style={[
						panStyle,
					]}
				>
					<View style={[styles.modal, { height }, width ? { width } : undefined]}>
						<View style={[styles.box, styles.box2]}>
							{children}
						</View>
						<View style={[styles.box, styles.box3]}></View>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default MyModal;