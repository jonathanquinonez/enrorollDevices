import React, { useState, useEffect } from 'react';
import {
	View,
	Modal,
	TouchableOpacity,
	Animated,
	PanResponder,
	PanResponderInstance,
	ScrollView,
} from 'react-native';
// Hooks
import useStyles from 'src/hooks/useStyles';
// Types, Styles
import { BottomSheetProps as Props } from './BottomSheet.types';
import componentStyles from './BottomSheet.styles';

const BottomSheet = (props: Props) => {
	const { height, open = false } = props;
	const { styles } = useStyles(componentStyles);
	const [modalVisible, setModalVisible] = useState(open);
	const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
	const [pan, setPan] = useState(new Animated.ValueXY());
	let panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (e, gestureState) => {
			if (gestureState.dy > 0) {
				Animated.event([null, { dy: pan.y }], {
					useNativeDriver: false,
				})(e, gestureState);
			}
		},
		onPanResponderRelease: (e, gestureState) => {
			const gestureLimitArea = height / 3;
			const gestureDistance = gestureState.dy;
			if (gestureDistance > gestureLimitArea) {
				setModalVisible(false);
			} else {
				Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
			}
		},
	});

	const handlerModalVisible = (visible: boolean) => {
		const { closeFunction, height } = props;
		if (visible) {
			setModalVisible(visible);
			Animated.timing(animatedHeight, {
				toValue:  height,
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

	const {
		children,
		hasDraggableIcon,
		backgroundColor,
		sheetBackgroundColor,
		dragIconColor,
		dragIconStyle,
		draggable = true,
		onRequestClose = () => close(),
		onClose = () => close(),
		radius,
		blockModal
	} = props;

	useEffect(() => {
		handlerModalVisible(open);
	}, [open]);

	const panStyle = {
		transform: pan.getTranslateTransform(),
	};

	if (!modalVisible) return null;

	return (
		<Modal transparent visible={modalVisible} onRequestClose={!blockModal ? onRequestClose : undefined}>
			<View style={[styles.wrapper, { backgroundColor: backgroundColor || '#25252599' }]}>
				<TouchableOpacity style={styles.background} activeOpacity={1} onPress={!blockModal ? onClose : undefined} />
				<Animated.View
					{...(draggable && panResponder.panHandlers)}
					style={[
						panStyle,
						styles.container,
						{
							borderTopRightRadius: radius || 10,
							borderTopLeftRadius: radius || 10,
							backgroundColor: sheetBackgroundColor || '#FFFFFF',
						},
					]}
				>
					{hasDraggableIcon && (
						<View style={styles.draggableContainer}>
							<View
								style={[
									styles.draggableIcon,
									dragIconStyle,
									{
										backgroundColor: dragIconColor || '#A3A3A3',
									},
								]}
							/>
						</View>
					)}
					<View style={styles.body}>
						<View>{children}</View>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default BottomSheet;
