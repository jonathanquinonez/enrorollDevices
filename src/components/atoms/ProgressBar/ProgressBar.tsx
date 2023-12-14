import React from 'react'

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ProgressBarProps as Props } from './ProgressBar.types';
import componentStyles from './ProgressBar.styles';

import Check from 'icons/check.svg';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { t } from 'i18next';

/**
 * Render a ProgressBar.
 * @since 1.0.0
 */
const ProgressBar = (props: Props) => {
  const { position } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View accessibilityLabel={t('accessibility.step')} style={styles.container}>
      <Circle position={position} color='#0071CE' num={1} />
      <Gradient disable={position < 2} colorStart={'#0071CE'} colorEnd={'#0E79B1'} />
      <Circle position={position} color='#0E79B1' num={2} />
      <Gradient disable={position < 3} colorStart={'#0E79B1'} colorEnd={'#228488'} />
      <Circle position={position} color='#228488' num={3} />
      <Gradient disable={position < 4} colorStart={'#228488'} colorEnd={'#358F60'} />
      <Circle position={position} color='#358F60' num={4} />
    </View>
  )
}

const Gradient = (props: { colorStart: string, colorEnd: string, disable: boolean }) => {
  const { colorEnd, colorStart, disable } = props;
  const { styles } = useStyles(componentStyles);
  return (
    <LinearGradient
      colors={[disable ? '#DBDBDB' : colorEnd, disable ? '#DBDBDB' : colorStart]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient} />
  )
}

const Circle = (props: Props & { num: number }) => {
  const { position, color, num } = props;
  const { styles } = useStyles(componentStyles);
  return (
    <View style={[styles.circle, { backgroundColor: position < num ? '#DBDBDB' : color }]}>
      {position <= num ? <Text style={[styles.text, { color: position < num ? '#757575' : '#FFF' }]}>{num}</Text> : <Check />}
    </View>
  )
}

export default ProgressBar