import React from 'react';
import { Text, View } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { BottomNavBarButtonProps as Props } from './BottomNavBarButton.types';
import componentStyles from './BottomNavBarButton.styles';
import DeviceInfo from 'react-native-device-info';

/**
 * Render a bottomNavBarButton.
 * @since 1.0.x
 */
const BottomNavBarButton: React.FC<Props> = (props) => {
  const { text, icon, isFocus, children } = props;
  const { styles, colors } = useStyles(componentStyles);
  const deviceModel = DeviceInfo.getModel();

  return (
    <View style={styles.container}>
      <View style={isFocus && styles.focus_container}>
        {icon ? React.cloneElement(icon) : children}
      </View>
      {text && <Text
        style={[styles.text, isFocus && styles.textSelected]}
        allowFontScaling={false}>{text}</Text>}
    </View>
  );
};

export default BottomNavBarButton;