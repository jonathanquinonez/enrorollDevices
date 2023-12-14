import React from 'react';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './Card.styles';
import { CardProps as Props } from './Card.types';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { View, Text, TouchableOpacity, Animated, Pressable } from 'react-native';
import Column from 'src/components/atoms/Column/Column';
import Row from 'src/components/atoms/Row/Row';
import { useTranslation } from 'react-i18next';

/**
 * Render a Card.
 * @since 1.0.0
 */
const Card = (props: Props) => {

	const { icon, title, subtitle, isHorizontal, onPress, style, isCarePrograms, isAvailable, styleTitle, styleSub, styleIcon } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const animated = new Animated.Value(1);
	const fadeIn = () => {
		Animated.timing(animated, {
			toValue: 0.6,
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

	return !isHorizontal ? (
		<Column>
			<Pressable
				accessibilityRole='button'
				onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress} disabled={isCarePrograms && !isAvailable}>
				<Animated.View style={[styles.card_container,
				isCarePrograms ? { padding: 0, paddingTop: 20 } : {},
				isCarePrograms && !isAvailable ? { backgroundColor: colors.GRAY_LIGHT_5 } : {},
					style, { opacity: animated }]}>
					{isCarePrograms && <View style={[
						styles.titleCarePrograms,
						isCarePrograms && !isAvailable ? { backgroundColor: '#3b576f' } : {}
					]}>
						<Text style={styles.textHour} maxFontSizeMultiplier={1.3}>{t('care.available')}</Text>
					</View>}
					{React.cloneElement(icon)}
					<View>
						<Text style={[styles.text_title, styleTitle]} accessibilityRole='header' adjustsFontSizeToFit>{title}</Text>
						{subtitle && <Text style={[styles.text_subtitle, styleSub]} numberOfLines={3}>
							{subtitle}
						</Text>}
					</View>
				</Animated.View>
			</Pressable>
		</Column>
	) : (
		<Column>
			<Pressable onPress={onPress}>
				<Animated.View style={[styles.card_container_horizontal, style, { opacity: animated }]}>
					<Row style={[{ marginRight: 4 }, styleIcon]}>{React.cloneElement(icon)}</Row>
					<Row width={4} >
						<Text accessibilityRole='header' adjustsFontSizeToFit maxFontSizeMultiplier={1.3} style={styles.text_title_horizontal}>
							{title}
						</Text>
						{subtitle ? <Text
							adjustsFontSizeToFit
							maxFontSizeMultiplier={1.3}
							style={styles.text_subtitle_horizontal}
						>
							{subtitle}
						</Text> : <></>}
					</Row>
				</Animated.View>
			</Pressable>
		</Column>
	);
};

export default Card;
