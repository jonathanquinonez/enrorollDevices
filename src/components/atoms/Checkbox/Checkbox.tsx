import React, { useMemo, useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import CheckBox from "expo-checkbox";

import componentStyles from './Checbox.styles';
import useStyles from 'hooks/useStyles';

import { CheckBoxControllerProps, CheckBoxProps as Props } from './Checbox.types';
import useToggle from "hooks/toggle";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

/**
 * Render a Checkbox.
 * @since 1.0.0
 */
const Checkbox = (props: Props) => {
  const {
    style,
    colorCheckbox = '#5B5C5B',
    textStyle,
    onPress,
    value,
    accesibilityLabel,
    accesibilityHint,
    error,
    accessibilityRole,
    text,
    children2,
    children } = props;

  const { styles, colors } = useStyles(componentStyles);
  const [isChecked, toggleCheck] = useState(value);
  const { t } = useTranslation();

  const handleOnPress = (toogle: boolean) => {
    toggleCheck(toogle);
    if (onPress) onPress(toogle);

  };

  return (
    <>
      <View style={[styles.container, style]}>
        <CheckBox
          style={{ padding: 10, marginLeft: 2, borderColor: '#5B5C5B' }}
          accessibilityLabel={accesibilityLabel}
          accessibilityHint={accesibilityHint}
          accessibilityRole={accessibilityRole}
          value={value}
          onValueChange={handleOnPress}
          color={value ? "#4E9D2D" : undefined}
        />
        {text && (
          <>
            <Text style={[styles.text, textStyle]} maxFontSizeMultiplier={1.3}>{text}{children2}</Text>
          </>
        )}
        {children}
      </View>
      {error && (
        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
        </View>
      )}
    </>
  )
}

export const CheckboxController = (props: CheckBoxControllerProps) => {
  const { control, accessibilityRole, name, accesibilityLabel, accesibilityHint, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Checkbox
          {...rest}
          accessibilityRole={accessibilityRole}
          accesibilityLabel={accesibilityLabel}
          accesibilityHint={accesibilityHint}
          value={value}
          onPress={onChange}
        />
      )}
    />
  );
};

export default Checkbox