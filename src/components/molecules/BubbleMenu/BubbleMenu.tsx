import React, { useCallback, useMemo } from 'react'
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { BubbleMenuProps as Props } from './BubbleMenu.types';
import componentStyles from './BubbleMenu.styles';
import { Animated, Pressable, View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import CancelBubble from 'icons/CancelBubble.svg';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/navigation.types';
import analytics from '@react-native-firebase/analytics';
import { t } from 'i18next';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import ModalWarning from '../ModalWarning/ModalWarning';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
/**
 * Render a BubbleMenu.
 * @since 1.0.0
 */
const BubbleMenu = (props: Props) => {
  const { style, isActive = false, onPress, buttons, openwarning, statusMaintenance } = props;
  const { styles } = useStyles(componentStyles);
  const { navigate } = useNavigation();

  /**
   * Navigates to a route
   * @since 1.0.0
   * @param routeItem Route to navigate to
   */
  const navigateTo = (route: string) => {
    if (route) {
      onPress(isActive)
      navigate(route as keyof RootStackParamList)
    };
  };

  let startValue = new Animated.Value(0);
  let endValue = 1;
  const duration = 200;
  useMemo(
    () => {
      if (isActive) {
        endValue = 1;
        startValue = new Animated.Value(0);
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }).start();
      } else {
        startValue = new Animated.Value(1);
        endValue = 0;
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }).start();
      }
    },
    [isActive],
  );

  return (
    <>
      {isActive ?
        <Pressable
          onPress={() => onPress(isActive)}
          style={styles.background} />
        : <></>}

      <Animated.View
        style={[
          styles.container, style,
        ]}
      >
        <Svg
          width={'90%'}
          height={'90%'}
          viewBox="0 0 360 360"
          fill="none">
          <Circle cx="180" cy="180" r="180" fill="#0069A7" />
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.9941 269.85L179 180L335.953 269.942C304.838 323.776 246.649 360 180 360C113.313 360 55.0956 323.735 23.9941 269.85Z" fill="#005486" fill-opacity="0.2" />
          <Path d="M179 180L335.884 270" stroke="white" stroke-width="3" />
          <Path d="M179 0L179 180" stroke="white" stroke-width="3" />
          <Path d="M179 180L24.2309 270" stroke="white" stroke-width="3" />
          <Circle cx="180" cy="180" r="65" fill="white" />
        </Svg>
        <View style={styles.iconCenter}>
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityLabel={t('accessibility.btnAppointment')}
            onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => navigateTo(buttons[0].route)}
            style={styles.pressIconCenter}>
            {buttons[0].icon}
            <Text style={styles.text} maxFontSizeMultiplier={1.3}>{buttons[0].title}</Text>
          </TouchableOpacity>
          <IconButton
            accessibilityLabel={t('accessibility.btnClose')}
            onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => onPress(isActive)}
            icon={<CancelBubble />} />
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityLabel={t('accessibility.btnSupport')}
            onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => navigateTo(buttons[1].route)}
            style={styles.pressIconCenter}>
            {buttons[1].icon}
            <Text style={styles.text} maxFontSizeMultiplier={1.3}>{buttons[1].title}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View >
    </>
  )
}

export default BubbleMenu