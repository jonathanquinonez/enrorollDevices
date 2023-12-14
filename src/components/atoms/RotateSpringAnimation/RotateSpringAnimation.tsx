import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { RotateSpringAnimationProps as Props } from './RotateSpringAnimation.types';
import componentStyles from './RotateSpringAnimation.styles';

/**
 * Render a rotateSpringAnimation.
 * @since 1.0.x
 */
const RotateSpringAnimation: React.FC<Props> = (props) => {
  const { children, animate, degrees, tension = 200 } = props;
  const { styles } = useStyles(componentStyles);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) {
      Animated.spring(animation, {
        toValue: 0,
        tension,
        friction: 10,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.spring(animation, {
      toValue: 1,
      tension,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [animate]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${degrees}deg`],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default RotateSpringAnimation;
