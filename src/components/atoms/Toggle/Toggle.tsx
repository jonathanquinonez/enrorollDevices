import React, { useState } from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ToggleProps as Props } from './Toggle.types';
import componentStyles from './Toggle.styles';
import ToggleInactive from 'icons/NotificationsIcons/toggleInactive.svg';
import ToggleActive from 'icons/NotificationsIcons/toggleActive.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Render a Toggle.
 * @since 1.0.0
 */
const Toggle = (props: Props) => {
  const { style, initialValue, onChange, text } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View style={styles.content}>
      <View style={styles.contentRow}>
        <TouchableOpacity style={styles.touch} onPress={() => {
          onChange(!initialValue);
        }}>
          {initialValue ? <ToggleActive /> : <ToggleInactive />}
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  )
}

export default Toggle