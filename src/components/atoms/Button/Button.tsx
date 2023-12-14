import React from 'react';
import { Animated, Pressable, Text, TouchableOpacity, AccessibilityRole } from 'react-native';

// Hooks
import useStyles from 'src/hooks/useStyles';
// Types, Styles
import { ButtonProps as Props } from './Button.types';
import componentStyles from './Button.styles';

/**
 * Render a button.
 * @since 3.0.0
 */
const Button = (props: Props) => {
	const {
		title,
		onPress,
		style,
		textStyle,
		variant = 'Contained',
		icon,
		accessibilityRole = 'button',
		accesibilityLabel,
		numberOfLines,
		accesibilityHint,
		rightIcon,
		disabled = false,
		allowFontScaling,
	} = props;
	const { styles } = useStyles(componentStyles);

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

	return (
		<Pressable
			accessibilityRole={accesibilityLabel ? undefined : accessibilityRole}
			onPressIn={fadeIn}
			onPressOut={fadeOut}
			onPress={onPress}
			disabled={disabled}
			accessibilityHint={accesibilityHint}
			accessibilityLabel={accesibilityLabel}
		>
			{({ pressed }) => (
				<Animated.View
					style={[
						styles.button,
						styles[`button${variant}`],
						{ opacity: animated },
						pressed && variant === "OutlinedFocus" ? styles.pressed : null,
						disabled ? styles.buttonDisabled : null,
						style,
					]}
				>
					{icon}
					<Text
						allowFontScaling={!allowFontScaling}
						numberOfLines={numberOfLines}
						style={[
							styles.text,
							styles[`text${variant}`],
							textStyle,
							disabled ? styles.textDisabled : null,
							pressed && variant === "OutlinedFocus" ? styles.textPressed : null
						]}
						adjustsFontSizeToFit
						maxFontSizeMultiplier={1.3}
					>
						{title}
					</Text>
					{rightIcon}
				</Animated.View>
			)}
		</Pressable>
	);
};

export default Button;
