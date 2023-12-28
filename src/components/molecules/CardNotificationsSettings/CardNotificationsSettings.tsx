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
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
// import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { enrollDeviceService } from 'adapter/api/enrollDeviceService';
import { UserNotificationsList } from 'src/screens/Notifications/UtilNotifications';
import UsersService from 'adapter/api/usersService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
/**
 * Render a CardNotificationsSettings.
 * @since 1.0.0
 */
const CardNotificationsSettings = (props: Props) => {
  const { style, data, onChangeData } = props;
  const { styles } = useStyles(componentStyles);
  const [isSelected, setIsSelected] = useState(false)
  const { t } = useTranslation();
  const { setAlertErrorMessage } = useErrorAlert();
  const { closeModal, setModal } = useBottomSheet();
  const { ecwId, ...valueUser } = useAppSelector(userSelectors.selectUser);
  const [createEnrollDevice] = enrollDeviceService.useCreateEnrollDeviceMutation();
  const [getEnrollDeviceByToken] = enrollDeviceService.useGetEnrollDeviceByTokenMutation();
  const [notificationsSetting] = UsersService.useNotificationsSettingMutation();
  const { locationSelected, token } = useAppSelector(userSelectors.selectIsLoggedIn);

  const openModalEnrollDevice = () => {
    setModal({
      render: () => (
        <ModalWarning
          isIconAlert
          styleSubtitle={{
            fontSize: 14,
            color: '#055293',
            marginTop: 10,
            fontFamily: 'Proxima Nova',
            textAlign: 'center',
          }}
          warningText={t('consents.enrollDeviceModal')}
          textButton={t('consents.btnModalEnrollDevice')}
          textButtonCancel={t('modalCheck.close')}
          onPress={async () => {
            modalCreateEnrollDevice();
          }}
          onPressCancel={() => {
            closeModal();
          }}
        />
      ),
      height: 320,
      blockModal: true,
    });
  };

  const modalCreateEnrollDevice = useCallback(async () => {
    try {
      // const token = await messaging().getToken();
      const token = null;
      const version = await DeviceInfo.getSystemVersion();
      const nameDevice = await DeviceInfo.getSystemName();

      const authUid = valueUser.authUid;
      const state = valueUser.state;
      const tokenFCM = token;
      const deviceName = await DeviceInfo.getDeviceName();
      const deviceSOVersion = nameDevice + ' ' + version;
      closeModal();
      await createEnrollDevice({
        authUid,
        state,
        tokenFCM,
        deviceName,
        deviceSOVersion,
      }).unwrap();
    } catch (error) {
    }
  }, []);

  const getNotificationsSettingList = async () => {
		try {
			const res: UserNotificationsList = await notificationsSetting({ state: locationSelected ?? '' }).unwrap();
			return res.notificationList.some(notification =>
				notification.functionality.push === true
			)
		} catch (error) {
			if (error != '2' && error != '3') setAlertErrorMessage(t(`errors.code${error}`));
		}
	}

  const validatePushNotification = async () => {
    // const token = await messaging().getToken();
    const token = null;
    const state = valueUser?.state;
    const newDevice = await getEnrollDeviceByToken({ state, token }).unwrap();
    var notification = await getNotificationsSettingList()
        if (Object.keys(newDevice).length === 0 && !newDevice.some((item: any) => item?.tokenFCM === token || notification)) {
            openModalEnrollDevice();
        }
}


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
  const onChange = useCallback((value: boolean, name: 'email' | 'push' | 'sms')  => {
    try {
      const newData: UserNotifications = {
        ...data, functionality: {
          ...data.functionality,
          [name]: value
        }
      };

      if (
        newData.functionality.push &&
        name === "push" &&
        (newData.name === "new_referral" || newData.name === "annual_wellness_visit")
      ) {
          validatePushNotification()
        }
      onChangeData(newData, value)
    } catch (error) {

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