import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import { useTranslation } from 'react-i18next';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import useStyles from 'hooks/useStyles';
import useToggle from 'hooks/toggle';
import { InputProps as Props } from './Input.types';
import componentStyles from './Input.styles';
import EyeIcon from 'icons/EyeIcon.svg';
import EyeSlashIcon from 'icons/EyeSlashIcon.svg';
import Search from 'icons/search.svg';
import Close from 'icons/CloseX.svg';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import Checkbox from '../Checkbox/Checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Input = (props: Props) => {
	const { placeholder,
		label,
		mask,
		icon,
		name,
		error,
		passwordInput,
		accessibilityHint,
		accessibilityLabel,
		keyboardType,
		isCheckbox,
		valueCheckbox = false,
		colorCheckbox = '#5B5C5B',
		control,
		filterBySearch,
		isActiveSearch,
		setDisabled,
		noShowError,
		multiline = false,
		showPasswordStrength, editable = true } =
		props;
	const { labelStyle, inputStyle, styleIcon, styleError, showStrength, onChangeText, onPressCheckbox, value, clearSearch, style2 } = props;
	const { t } = useTranslation();
	// Hooks
	const { styles, colors } = useStyles(componentStyles);
	const [isVisible, setIsVisible] = useToggle();
	// Component states
	const [activeColor, setActiveColor] = useState('#999999');
	const [isActive, setIsActive] = useState(false);
	const [valueInput, setValue] = useState('');
	const [currentValue, setCurrentValue] = useState<string>('');
	const activeInputStyle = isActive ? styles.inputContainerActive : null;
	/**
	 * Control the active colors for the input.
	 * @since 1.0.0
	 * @param state True if the input is focused.
	 */
	const handleActiveInput = (state: boolean) => {
		setIsActive(state);
		if (state) {
			setActiveColor('#0069A7');
			return;
		}
		setActiveColor('#999999');
	};

	const commonProps = useMemo(
		() => ({
			style: [styles.input, style2, multiline && styles.multilineInput],
			placeholder,
			keyboardType,
			secureTextEntry: !!passwordInput && !isVisible,
		}),
		[styles, placeholder, keyboardType, passwordInput, isVisible],
	);

	const noControlProps = useMemo(() => {
		if (!control) return {};

		return {
			onChangeText: (val: string) => {
				setCurrentValue(val);
				if (onChangeText) onChangeText(val);
			},
			onBlur: () => {
				handleActiveInput(false);
			},
			onFocus: () => handleActiveInput(true),
		};
	}, [control, onChangeText, handleActiveInput, setCurrentValue]);

	return (
		<View>
			{label && <Text style={[styles.label, labelStyle]} maxFontSizeMultiplier={1.3}>{label}</Text>}
			<View style={[styles.inputContainer, error?.type && { borderColor: colors.DANGER }, activeInputStyle, inputStyle]}>
				{isCheckbox && (
					<Checkbox onPress={onPressCheckbox} value={valueCheckbox} colorCheckbox={colorCheckbox} style={{ marginLeft: 11 }} />
				)}
				{icon && (
					<View style={[styles.iconPad, styleIcon]}>
						{React.cloneElement(icon, { fill: activeColor, color: activeColor })}
					</View>
				)}
				{filterBySearch && (
					<TouchableOpacity style={styles.iconPad} onPress={clearSearch} accessibilityRole='button'>
						{isActiveSearch ?
							React.cloneElement(<Close />, { fill: '#dc4e4e', color: '#dc4e4e' }) :
							React.cloneElement(<Search />, { fill: '#999999', color: '#999999' })
						}
					</TouchableOpacity>
				)}
				{control ? (
					<Controller
						control={control}
						name={name}
						defaultValue={value}
						render={({ field: { onChange, onBlur, value } }) =>
							mask ? (
								<MaskedTextInput
									{...props}
									{...(commonProps as any)}
									onChangeText={(val: any) => {
										setValue(val)
										setCurrentValue(val);
										onChange(val);
									}}
									onBlur={() => {
										handleActiveInput(false);
										onBlur();
									}}
									onFocus={() => handleActiveInput(true)}
									value={value}
									maxFontSizeMultiplier={1.3}
									placeholderTextColor="#757575"
								/>
							) : (
								<TextInput
									{...props}
									{...commonProps}
									multiline={multiline}  // Add this prop for multiline input
									numberOfLines={multiline ? 2 : undefined}
									onChangeText={(val) => {
										setValue(val)
										setCurrentValue(val);
										onChange(val);
									}}
									onBlur={() => {
										handleActiveInput(false);
										onBlur();
									}}
									onFocus={() => handleActiveInput(true)}
									value={value}
									maxFontSizeMultiplier={1.3}
									placeholderTextColor="#757575"
								/>
							)
						}
					/>
				) : mask ? (
					<MaskedTextInput {...props} {...(commonProps as any)} {...noControlProps} />
				) : (
					<TextInput  {...props} {...commonProps} {...noControlProps} />
				)}
				{passwordInput && (
					<Pressable accessibilityRole='button' accessibilityHint={accessibilityHint} accessibilityLabel={t('accessibility.seePassword')} style={styles.secondIcon} onPress={setIsVisible}>
						{isVisible ? (
							<EyeSlashIcon />
						) : (
							<EyeIcon />
						)}
					</Pressable>
				)}
			</View>
			{passwordInput && showStrength ? <PasswordStrength value={currentValue || ''} /> : null}

			{error && !noShowError && (
				<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }, styleError]}>
					<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.${error.message}`)}</Text>
				</View>
			)}
			{showPasswordStrength &&
				<PasswordStrength value={valueInput} />
			}
		</View>
	);
};

export default Input;
