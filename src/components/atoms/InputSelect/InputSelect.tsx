/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { InputSelectProps as Props } from './InputSelect.types';
import componentStyles from './InputSelect.styles';
// Images
import ArrowDownIcon from 'icons/ArrowDownIcon.svg';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/**
 * Render a inputSelect.
 * @since 2.0.0
 */
const InputSelect: React.FC<Props> = (props) => {
	const {
		icon,
		items,
		onChange,
		placeholder,
		value,
		label,
		error,
		control,
		name,
		disabled = false,
	} = props;
	const { labelStyle, style, inputStyle } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [activeColor] = useState('#999999');
	const [statusValue, setStatusValue] = useState(undefined);

	const handleOnChange = (pickedValue: any, index: number) => {
		setStatusValue(pickedValue);
		if (onChange) onChange(pickedValue, index);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={() => (
				<View style={[{ width: '90%' }, style]}>
					{label && (
						<Text style={[styles.label, labelStyle]} maxFontSizeMultiplier={1.3}>
							{label}
						</Text>
					)}
					<View style={[styles.container, inputStyle]}>
						{icon && (
							<View style={styles.iconContainer}>
								{React.cloneElement(icon, {
									fill: activeColor,
									color: activeColor,
								})}
							</View>
						)}

						<RNPickerSelect
							disabled={disabled}
							useNativeAndroidPickerStyle={false}
							onValueChange={handleOnChange}
							Icon={() => (
								<ArrowDownIcon
									style={[
										styles.icon,
										icon ? styles.pickerWithIcon : styles.pickerNoIcon,
									]}
									fill={activeColor}
								/>
							)}
							touchableWrapperProps={{
								style: [styles.pickerContainer],
							}}
							// textInputProps={{ multiline: true }}
							pickerProps={{ numberOfLines: 4 }}
							style={pickerSelectStyles}
							placeholder={{ label: placeholder, color: '#757575' }}
							itemKey="key"
							items={items}
							value={value}
						/>
					</View>
					{error && !statusValue && (
						<View style={{ marginBottom: 10 }}>
							<Text
								style={{
									color: colors.DANGER,
									fontFamily: 'proxima-regular',
									fontSize: 12,
								}}
								maxFontSizeMultiplier={1.3}
							>
								{t(`errors.required`)}
							</Text>
						</View>
					)}
				</View>
			)}
		/>
	);
};

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		color: '#757575',
		paddingRight: '15%',
	},
	inputAndroid: {
		fontSize: 14,
		color: '#757575',
		paddingRight: 30,
		width: '80%',
	},
});

export default InputSelect;
