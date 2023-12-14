import React from 'react'
import { View, Text, Image } from 'react-native';


// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CardTempProps as Props } from './CardTemp.types';
import componentStyles from './CardTemp.styles';

/**
 * Render a CardTemp.
 * @since 1.0.0
 */
const CardTemp = (props: Props) => {
  const { subTitleA, subTitleB, textFloat, title } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.textFloat} maxFontSizeMultiplier={1.3}>
        {textFloat}
      </Text>
      <Image source={require(`assets/images/TempChat.png`)} style={{ position: 'absolute' }} />
      <Text style={styles.title} maxFontSizeMultiplier={1.3}>{title}</Text>
      <Text style={styles.subA} maxFontSizeMultiplier={1.3}>{subTitleA}</Text>
      <Text style={styles.subB} maxFontSizeMultiplier={1.3}>{subTitleB}</Text>
    </View>
  )
}

export default CardTemp