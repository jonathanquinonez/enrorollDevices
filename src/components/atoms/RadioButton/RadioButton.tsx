import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { RadioButtonProps as Props } from './RadioButton.types';
import componentStyles from './RadioButton.styles';
// Images
import RadioEmpty from 'icons/RadioEmpty.svg';
import RadioSelected from 'icons/RadioSelected.svg';

import RadiobuttonGrey from 'icons/radiobuttonGrey.svg';
import RadiobuttonBlue from 'icons/radiobuttonBlue.svg';

/**
 * Render a radioButton.
 * @since 1.0.0
 */
const RadioButton: React.FC<Props> = (props) => {
	const { children,
		accessibilityRole,
		title,
		style,
		textStyle,
		onPress, value,
		isSelected, label,
		accessibilityLabel,
		btnType2,
		accessibilityHint } = props;
	const { labelStyle } = props;
	const { styles } = useStyles(componentStyles);
	const [selected, setSelected] = useState(isSelected);

	const handleOnPress = () => {
		setSelected(!selected);
		if (onPress) {
			onPress(!selected, value);
		}
	};

	return (
		<>
			{label ? <Text style={[styles.label, labelStyle]} maxFontSizeMultiplier={1.3}>{label}</Text> : null}
			<TouchableOpacity accessibilityHint={accessibilityHint} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole} style={[styles.container, style]} onPress={handleOnPress}>
				{isSelected ?? selected ? (
					btnType2 ? <RadiobuttonBlue /> : <RadioSelected />
				) : (
					btnType2 ? <RadiobuttonGrey /> : <RadioEmpty />
				)}
				{title ? <Text style={[styles.text, textStyle, (isSelected ?? selected) && btnType2 && { fontFamily: 'proxima-bold', color: '#002F87' }]} maxFontSizeMultiplier={1.3}>{title}</Text> : null}
				{children}
			</TouchableOpacity>
		</>
	);
};

export default RadioButton;
