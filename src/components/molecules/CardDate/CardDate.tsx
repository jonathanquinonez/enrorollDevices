import React from 'react';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './CardDate.styles';
import { CardProps as Props, convertMonth } from './CardDate.types';

import { View, Text, Image, Pressable, Animated } from 'react-native';


import { useTranslation } from 'react-i18next';


/**
 * Render a CardDate.
 * @since 1.0.0
 */
const CardDate = (props: Props) => {
	const { onPress, data } = props;
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
					<Text style={[styles.date, { marginBottom: 13 }]}>{convertMonth(data?.date, t('general.locale'))}</Text>
					<Text style={styles.date}>{new Date(data?.date).getDate()}</Text>
				</View>
				<View style={styles.line} />
				<View style={styles.columnRight}>
					<Text style={styles.label}>{data?.label}</Text>
				</View>
			</View>
		</Animated.View>
	</Pressable>
	);
};

export default CardDate;
