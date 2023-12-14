import React from 'react'
import { View, Text, TouchableOpacity  } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CardEnrollDeviceProps as Props } from '../CardNotificationsSettings/CardEnrollDevice.types';
import componentStyles from '../CardNotificationsSettings/CardEnrollDevice.styles';

// Images
import { useTranslation } from 'react-i18next';

/**
 * Render a CardNotificationGenerals.
 * @since 1.0.0
 */
const CardEnrollDevice = (props: Props) => {
  const { style, text, text2, time, title, icon, icon2, onIcon2Press } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <View style={{
      paddingHorizontal: 16,
      backgroundColor: '#FFF',
      paddingVertical: 8,
      borderRadius: 10,
      marginBottom:8
    }}>
      <View style={styles.contentRow}>
        <View style={[styles.icon]}>{icon}</View>
        <View style={{ width: '70%', paddingLeft: 16 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.text}>{text2}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        <TouchableOpacity style={[styles.icon]} onPress={onIcon2Press}>
          {icon2}
        </TouchableOpacity>
      </View>
      <View style={{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
      </View>
    </View>
  )
}

export default CardEnrollDevice