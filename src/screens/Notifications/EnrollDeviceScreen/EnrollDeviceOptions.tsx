import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import componentStyles from './EnrollDevice.styles';
import useStyles from 'hooks/useStyles';
import CardEnrollDevice from 'src/components/molecules/CardNotificationsSettings/CardEnrollDevice';
import MobileScreen from 'icons/NotificationsIcons/mobileScreen.svg';
import DeleteDevice from 'icons/NotificationsIcons/deleteDevice.svg';
import { enrollDeviceService } from 'adapter/api/enrollDeviceService';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { Platform } from 'react-native';
import moment from 'moment';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';

export const EnrollDeviceOption = () => {
	const [getByEnrollDevices] =  enrollDeviceService.useGetByEnrollDevicesMutation();
	const [deleteEnrollDevice] =  enrollDeviceService.useDeleteEnrollDeviceMutation();
	const [getdevice, setGetdevice] = useState<any[]>([]);
	const { ...valueUser } = useAppSelector(userSelectors.selectUser);
	const { closeModal, setModal } = useBottomSheet();

	const getData = async () => {
		const state = valueUser.state; 
	
	
		Promise.all([
			getByEnrollDevices({state}).unwrap(),
		])
		  .then(values => {
			const [
			  device
			] = values;

			setGetdevice(device)

		  }).catch(errors => {

		  });
	
	  };

	  useEffect(() => {
		getData();
	  }, []);

	  const handleIcon2Press = async (state: String, authUid: String, index: number) => {
		try {
			await deleteEnrollDevice({ state, authUid }).unwrap();
		  closeModal();
		  const updatedDevices = [...getdevice];
		  updatedDevices.splice(index, 1);
		  setGetdevice(updatedDevices);
		} catch (error) {
		  console.error(error);
		}
	  };

	  const openModalEnrollDevice = (device: String, index:number) => {
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
					warningText={t('notifications.deleteModalEnrollDevice')}
					textButton={t('common.yes')}
					textButtonCancel={t('common.no')}
					styleBtnCancel={ [t('general.locale') == 'es' ? {width: 83} : {width: 90}]}
					onPress={async () => {
						handleIcon2Press(valueUser.state, device, index)
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
	  
	  


	const { t } = useTranslation();
	const { styles } = useStyles(componentStyles);

	const deviceCards = getdevice?.map((device, index) => (
		<CardEnrollDevice
			key={index}
			icon={<MobileScreen />} 
			onIcon2Press={() => openModalEnrollDevice( device.uuid, index)}
			icon2={<DeleteDevice />}
			title={device.deviceName}
			text={Platform.OS == "android" ? 'Google Inc.' : 'Apple Inc.'}
			text2={device.deviceSOVersion} 
			time={t('notifications.loginDate') + moment(device.registerDate).format('MM/DD/YYYY')}
		/>
	));


	return (
		<>

			<ScrollView>
				<Text accessibilityRole='header' style={styles.title}>{t('notifications.EnrollDevice.titleBody')}</Text>
				{deviceCards}
			</ScrollView>
		</>
	);
};
