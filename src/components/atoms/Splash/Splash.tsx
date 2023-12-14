import React from 'react';
import { View, Image, Animated, Easing } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './Splash.styles';
// Images
const splashImage = require('assets/images/splashScreen.png');

/**
 * Render a splash.
 * @since 1.0.x
 */
const Splash: React.FC<any> = (props) => {
  const { startTime } = props;
  const { styles } = useStyles(componentStyles);

  let spinValue = new Animated.Value(0);
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ).start()

  let opacity = new Animated.Value(0.2);
  Animated.timing(opacity, {
    toValue: 0.9,
    duration: startTime * 1000,
    useNativeDriver: true,
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [startTime, 2],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.shadowImage, { opacity }, { transform: [{ rotate: spin }] }]}
        source={require('assets/images/Sombra.png')} />
      <View style={{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center', alignSelf: 'center'
      }}>
        <Animated.Image
          style={[{
            width: 120,
            height: 135, opacity
          }]}
          source={require('assets/images/LogoSanitasSplash.png')} />
      </View>
    </View>
  );
}

export default Splash;
