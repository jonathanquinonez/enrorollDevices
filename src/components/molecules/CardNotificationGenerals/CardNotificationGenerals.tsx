import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CardNotificationGeneralsProps as Props } from './CardNotificationGenerals.types';
import componentStyles from './CardNotificationGenerals.styles';

// Images
import Ellipsis from 'icons/NotificationsIcons/ellipsis.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from 'src/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import IconButton from 'src/components/atoms/IconButton/IconButton';

/**
 * Render a CardNotificationGenerals.
 * @since 1.0.0
 */
const CardNotificationGenerals = (props: Props) => {
  const { style, isNew, text, time, title, icon, onPressOptions, onPressIAlready, onPressStartNow, isAnnualV } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <View style={{
      paddingHorizontal: 10,
      backgroundColor: isNew ? '#D9E0ED' : '#FFF',
      paddingVertical: 10,
      borderRadius: 10,
      marginVertical: 5
    }}>
      <View style={styles.contentRow}>
        <View style={styles.icon}>{icon}</View>
        <View style={{ width: '70%' }}>
          <Text style={styles.title}>{title ?? ''}</Text>
          <Text style={styles.text}>{text ?? ''}</Text>
          <Text style={styles.time}>{time ?? ''}</Text>
        </View>
        <View style={styles.contentText}>
          <IconButton style={{ paddingVertical: 15, paddingHorizontal: 10, backgroundColor: undefined }}
            icon={<Ellipsis />}
            onPress={onPressOptions} />
        </View>
      </View>
      {isAnnualV && <View style={{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10
      }}>
        <Button title={t('notifications.startNow')} onPress={onPressStartNow} />
        <Button
          onPress={onPressIAlready}
          title={t('notifications.iAlready')}
          textStyle={{ fontFamily: 'proxima-bold', fontSize: 16 }}
          variant='Outlined'
          style={{ width: 'auto', backgroundColor: undefined }} />
      </View>}
    </View>
  )
}

export default CardNotificationGenerals