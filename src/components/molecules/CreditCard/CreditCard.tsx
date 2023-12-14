import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CreditCardProps as Props } from './CreditCard.types';
import componentStyles from './CreditCard.styles';

/**
 * Render a CreditCard.
 * @since 1.0.0
 */
const CreditCard = (props: Props) => {
  const { style, cardType, numCard, expiryMonth, expiryYear, isValid } = props;
  const { styles } = useStyles(componentStyles);

  const spin = useSharedValue<number>(0);

  useEffect(() => {
    if (cardType == 'Cvc') spin.value = 1;
    else spin.value = 0;
  }, [cardType])

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
      return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);
  return (
    <View style={styles.content}>
      <Animated.View style={[styles.front, rStyle]}>
        <Image
          source={require(`assets/images/creditCard/front.png`)}
          style={styles.imgContainer} />
        {(cardType == 'CardNumber' && !isValid) && (
          <View style={[styles.lineCard, { width: 200 }]} />
        )}
        {(cardType == 'CardNumber' || isValid) && (
          <Text style={styles.numberCard} maxFontSizeMultiplier={1.3}>{`**** **** **** ${numCard ? numCard : '****'}`}</Text>
        )}

        {(cardType == 'ExpiryDate' && !isValid) && (
          <View style={[styles.lineExpire, { width: 60 }]} />
        )}
        {(cardType == 'ExpiryDate' || isValid) && (
          <>
            <Text style={[styles.expire, { fontFamily: 'IBMPlexSans-SemiBold', bottom: 35, fontSize: 11 }]} maxFontSizeMultiplier={1.3}>Expiry Date</Text>
            <Text style={styles.expire} maxFontSizeMultiplier={1.3}>{`${expiryMonth && expiryMonth <= 9 ? '0' : ''}${expiryMonth ?? '_'}/${expiryYear ?? ''}`}</Text>
          </>
        )}
      </Animated.View>
      <Animated.View style={[styles.back, bStyle]}>
        <Image
          source={require(`assets/images/creditCard/back.png`)}
          style={styles.imgContainer} />
        <View style={[styles.backgroundCvv]} />
        <Text style={[styles.textCvv, { fontFamily: 'IBMPlexSans-SemiBold', fontSize: 11, left: 80, top: 72 }]} maxFontSizeMultiplier={1.3}>CVC</Text>
        <Text style={styles.textCvv} maxFontSizeMultiplier={1.3}>***</Text>
      </Animated.View>
    </View>
  )
}

/* 

<Pressable
        onPress={() => (spin.value = spin.value ? 0 : 1)}
        style={{ marginTop: 30, alignItems: "center" }}
      >
        <Text style={{ fontSize: 16 }}>boton</Text>
      </Pressable>

*/

export default CreditCard