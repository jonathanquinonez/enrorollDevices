import React from 'react';
import { View, Text, TouchableOpacity, AccessibilityRole } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { IconButtonProps as Props } from './IconButton.types';
import componentStyles from './IconButton.styles';

/**
 * Render a IconButton.
 * @since 2.0.0
 */
const IconButton: React.FC<Props> = (props) => {
  const { icon, style, accessibilityLabel, accessibilityHint, accessibilityRole = 'button', onPress, variant = 'Small', disabled = false } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <TouchableOpacity
      accessibilityRole={accessibilityLabel ? undefined : accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={[styles.button, styles[`icon${variant}`], style]}
      onPress={onPress}
      disabled={disabled}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
