import React from 'react';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './CardResults.styles';
import { CardProps as Props, convertMonth } from './CardResults.types';

import { View, Text, Image, Pressable, Animated } from 'react-native';

import WavePulse from 'assets/icons/wave-pulse.svg';

import { useTranslation } from 'react-i18next';
import moment from 'moment';


/**
 * Render a CardResults.
 * @since 1.0.0
 */
const CardResults = (props: Props) => {
	const { onPress, date } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const animated = new Animated.Value(1);

	const fadeIn = () => {
		Animated.timing(animated, {
			toValue: 0.7,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(animated, {
			toValue: 1,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};


	return (<Pressable accessibilityRole='button'
		onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
		<Animated.View style={[styles.card_container, { transform: [{ scale: animated }] }]}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.columnLeft}>
					<WavePulse />
				</View>
				<View style={styles.line} />
				<View style={styles.columnRight}>
					<Text style={styles.label}>{moment(date).format('MMMM DD').charAt(0).toUpperCase() + moment(date).format('MMMM DD').slice(1)}</Text>
					<Text style={styles.label2}>{moment(date).format('hh:mm a').toLocaleUpperCase()}</Text>
				</View>
			</View>
		</Animated.View>
	</Pressable>
	);
};

export default CardResults;
