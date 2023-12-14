import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, Pressable } from 'react-native';


// Helpers
import { DEFAULT_VALIDATOR } from './PasswordStrength.helpers';
import { useTranslation } from 'react-i18next';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PasswordStrengthProps as Props } from './PasswordStrength.types';
// Images
import componentStyles from './PasswordStrength.styles';
import ExclamationCircle from 'icons/ExclamationCircle.svg';
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import BlockPassIcon from 'icons/BlockPassIcon.svg';

/**
 * Render a passwordStrength.
 * @since 1.0.x
 */
const PasswordStrength: React.FC<Props> = (props) => {
	const { value, rules = DEFAULT_VALIDATOR } = props;
	// Hooks
	const { styles, colors } = useStyles(componentStyles);
	// Component states
	const [previousRule, setPreviousRule] = useState<string | undefined>(undefined);
	const fadeAnimDanger = useRef(new Animated.Value(0)).current;
	const fadeAnimWarning = useRef(new Animated.Value(0)).current;
	const fadeAnimSuccess = useRef(new Animated.Value(0)).current;
	const { closeModal, setModal } = useBottomSheet();
	const { t } = useTranslation();
	
	const matchingRule = useMemo(
		() => [...rules].reverse().find(({ regex }) => regex.test(value)),
		[value],
	);

	const openModal = () => {
		setModal({
			render: () => (
				<View style={styles.containerModal}>
					<BlockPassIcon />
					<Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t(`forgotPassword.infoPass`)}</Text>
					<Button
						onPress={() => closeModal()}
						title={t('common.accept')}
						style={{ marginBottom: 24 }} />
				</View>
			), height: 330  
		});
	};

	useEffect(() => {
		if (matchingRule && ['DANGER', 'WARNING', 'GREENDC1'].includes(matchingRule.color)) {
			Animated.timing(fadeAnimDanger, {
				toValue: 1,
				duration: 200,
				useNativeDriver: false,
			}).start(() => setPreviousRule('DANGER'));
		} else {
			let delay = 0;
			if (previousRule === 'GREENDC1') delay = 400;
			if (previousRule === 'WARNING') delay = 200;
			Animated.timing(fadeAnimDanger, {
				toValue: 0,
				duration: 200,
				delay,
				useNativeDriver: false,
			}).start(() => setPreviousRule(undefined));
		}

		if (matchingRule && ['WARNING', 'GREENDC1'].includes(matchingRule.color)) {
			Animated.timing(fadeAnimWarning, {
				toValue: 1,
				duration: 200,
				delay: previousRule === undefined ? 200 : 0,
				useNativeDriver: false,
			}).start(() => setPreviousRule('WARNING'));
		} else {
			Animated.timing(fadeAnimWarning, {
				toValue: 0,
				duration: 200,
				delay: previousRule === 'GREENDC1' ? 200 : 0,
				useNativeDriver: false,
			}).start(() => setPreviousRule('DANGER'));
		}

		if (matchingRule && ['GREENDC1'].includes(matchingRule.color)) {
			let delay = 0;
			if (previousRule === 'DANGER') delay = 200;
			if (previousRule === undefined) delay = 400;
			Animated.timing(fadeAnimSuccess, {
				toValue: 1,
				duration: 200,
				delay,
				useNativeDriver: false,
			}).start(() => setPreviousRule('GREENDC1'));
		} else {
			Animated.timing(fadeAnimSuccess, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			}).start(() => setPreviousRule('WARNING'));
		}
	}, [matchingRule]);

	return (
		<View style={styles.container}>
			<Pressable style={styles.titleContainer} onPress={openModal}>

			   <View style={styles.secondIcon} >
					<ExclamationCircle />						
				</View>
				
				<Text style={styles.label} maxFontSizeMultiplier={1.3}>{t('passwordStrength.passwordStrength')}:</Text>
				<Text style={[styles.value, { color: colors[matchingRule?.color || 'GRAYDC1'] }]} maxFontSizeMultiplier={1.3}>
					
					{t(matchingRule?.label || '')}
				</Text>
			</Pressable>
			<View style={styles.indicatorContainer}>
				<View style={[styles.indicatorGray]}>
					<Animated.View
						style={[
							styles.indicator,
							{
								backgroundColor: fadeAnimDanger?.interpolate({
									inputRange: [0, 1],
									outputRange: [
										colors.WHITE_TRANSPARENT,
										colors[matchingRule?.color ?? 'DANGER'],
									],
								}),
								width: fadeAnimDanger?.interpolate({
									inputRange: [0, 1],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
				<View style={[styles.indicatorGray]}>
					<Animated.View
						style={[
							styles.indicator,
							{
								backgroundColor: fadeAnimWarning.interpolate({
									inputRange: [0, 1],
									outputRange: [
										colors.DANGER,
										colors[matchingRule?.color ?? 'WARNING'],
									],
								}),
								width: fadeAnimWarning.interpolate({
									inputRange: [0, 1],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
				<View style={[styles.indicatorGray]}>
					<Animated.View
						style={[
							styles.indicator,
							{
								backgroundColor: fadeAnimSuccess.interpolate({
									inputRange: [0, 1],
									outputRange: [colors.WARNING, colors.GREENDC1],
								}),
								width: fadeAnimSuccess.interpolate({
									inputRange: [0, 1],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
			</View>
		</View>
	);
};

export default PasswordStrength;
