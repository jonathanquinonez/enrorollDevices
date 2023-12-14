import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CardNotificationsSettingsProps as Props } from './CardNotificationsSettings.types';
import componentStyles from './CardNotificationsSettings.styles';
import Arrow1 from 'icons/NotificationsIcons/arrow1.svg';
import Arrow2 from 'icons/NotificationsIcons/arrow2.svg';
import Toggle from 'src/components/atoms/Toggle/Toggle';


import Key from 'icons/NotificationsIcons/key.svg';
import Lock from 'icons/NotificationsIcons/lock.svg';
import HouseUser from 'icons/NotificationsIcons/house-user.svg';
import User from 'icons/NotificationsIcons/user.svg';
import Shield from 'icons/NotificationsIcons/shield.svg';
import FolderOpen from 'icons/NotificationsIcons/folder-open.svg';
import HandHoldingMedical from 'icons/NotificationsIcons/folder-open.svg';
import { UserNotifications } from 'src/screens/Notifications/UtilNotifications';
import { useTranslation } from 'react-i18next';
/**
 * Render a CardNotificationsSettings.
 * @since 1.0.0
 */
const CardNotificationsSettings = (props: Props) => {
  const { style, data, onChangeData } = props;
  const { styles } = useStyles(componentStyles);
  const [isSelected, setIsSelected] = useState(false)
  const { t } = useTranslation();


  const dataInfo = {
    change_password: { icon: <Key />, title: t('notifications.change_password') },
    block_account: { icon: <Lock />, title: t('notifications.block_account') },
    log_in: { icon: <HouseUser />, title: t('notifications.log_in') },
    biometrical_login: { icon: <HouseUser />, title: t('notifications.biometrical_login') },
    annual_wellness_visit: { icon: <HandHoldingMedical />, title: t('notifications.annual_wellness_visit') },
    update_insurance_information: { icon: <Shield />, title: t('notifications.update_insurance_information') },
    new_referral: { icon: <FolderOpen />, title: t('notifications.new_referral') },
    edit_profile: { icon: <User />, title: t('notifications.edit_profile') }
  }
  const onChange = useCallback((value: boolean, name: 'email' | 'push' | 'sms') => {
    try {
      const newData: UserNotifications = {
        ...data, functionality: {
          ...data.functionality,
          [name]: value
        }
      };
      onChangeData(newData, value)
    } catch (error) {
      console.log('--error--', error)
    }
  }, [data])

  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
        <View style={styles.contentRow}>
          <View style={styles.icon}>{dataInfo[data.name]?.icon}</View>
          <Text style={styles.title}>{dataInfo[data.name]?.title}</Text>
          <View style={styles.contentText}>
            {isSelected ? <Arrow1 /> : <Arrow2 />}
          </View>
        </View>
      </TouchableOpacity>
      {/* Notifications push */}
      {(isSelected && data?.functionality?.push != null)
        && <Toggle
          initialValue={data?.functionality?.push}
          onChange={(v) => onChange(v, 'push')} text={t('notifications.push')} />}

      {/* Notifications sms */}
      {(isSelected && data?.functionality?.sms != null)
        && <Toggle
          initialValue={data?.functionality?.sms}
          onChange={(v) => onChange(v, 'sms')} text={t('notifications.sms')} />}

      {/* Notifications email */}
      {(isSelected && data?.functionality?.email != null)
        && <Toggle
          initialValue={data?.functionality?.email}
          onChange={(v) => onChange(v, 'email')} text={t('notifications.email')} />}
    </View>
  )
}

export default CardNotificationsSettings