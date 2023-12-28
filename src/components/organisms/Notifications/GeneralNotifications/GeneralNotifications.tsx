//Components
import { View, Text, ScrollView, Pressable } from 'react-native';

//Types | Styles
import { GeneralNotificationsProps as Props } from './GeneralNotifications.types';
import componentStyles from './GeneralNotifications.styles';

//Hooks
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';

// Images
import Gear from 'icons/NotificationsIcons/gear.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardNotificationGenerals from 'src/components/molecules/CardNotificationGenerals/CardNotificationGenerals';

import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useNavigation } from '@react-navigation/native';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
	NotificationsGeneral,
	removeObjectByUuid,
} from 'src/screens/Notifications/UtilNotifications';
import moment from 'moment';
import UsersService from 'adapter/api/usersService';
import IconAnualVis from 'icons/NotificationsIcons/iconAnualVis.svg';
import Clock from 'icons/NotificationsIcons/clock.svg';
import Trash from 'icons/NotificationsIcons/Trash.svg';
import Button from 'src/components/atoms/Button/Button';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import MessageCheck from 'icons/message-check.svg';
import EmptyCurrent from 'icons/NotificationsIcons/Empty_Current.svg';
import { userActions } from 'adapter/user/userSlice';
import AuthService from 'adapter/api/authService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import Global from '../../../../config/constants/Global';

const GeneralNotifications: React.FC<Props> = (props) => {
	const { style } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { closeModal, setModal } = useBottomSheet();
	const navigation = useNavigation();
	const [listNew, setlistNew] = useState<NotificationsGeneral[]>([]);
	const [listPrevious, setlistPrevious] = useState<NotificationsGeneral[]>([]);
	const [remindLater] = UsersService.useRemindLaterMutation();
	const [deleteNotification] = UsersService.useDeleteNotificationMutation();
	const [notificationApp] = UsersService.useNotificationAppMutation();
	const [notificationViewAll] = UsersService.useNotificationViewAllMutation();
	const dispatch = useAppDispatch();
	const { ecwId } = useAppSelector(userSelectors.selectUser);
	const { notificationsList, tempDeleteNotification } = useAppSelector(
		userSelectors.selectNotificationsList,
	);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const [updateAnnualVisitCode] = AuthService.useUpdateAnnualVisitCodeMutation();
	const { setAlertErrorMessage } = useErrorAlert();

	const TIME_TO_CLOSE_NOTIFICATION_ALERT = 3000;

	const post_remindLater = useCallback(
		async (value: NotificationsGeneral) => {
			try {
				await remindLater({
					id: value?.uuid ?? '',
					state: locationSelected || 'FL',
				}).unwrap();
				dispatch(
					userActions.setTempDeleteNotification({ type: 'remindLater', data: value }),
				);
				setAlertErrorMessage(
					t('notifications.textAlertremindLater'),
					'successNotification',
				);
				setlistNew(removeObjectByUuid(listNew, value.uuid));
				setlistPrevious(removeObjectByUuid(listPrevious, value.uuid));
				// setModal({
				// 	render: () => (
				// 		<ModalWarning
				// 			icon={<MessageCheck />}
				// 			warningText={t('notifications.remindLaterTitleModal')}
				// 			textButton={t('common.close')}
				// 			onPress={closeModal}
				// 		/>
				// 	),
				// });

				closeModal();

				setTimeout(() => {
					setAlertErrorMessage(null);
				}, TIME_TO_CLOSE_NOTIFICATION_ALERT);
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`));
			}
		},
		[remindLater, listNew, listPrevious],
	);

	const post_deleteNotification = useCallback(
		async (value: NotificationsGeneral) => {
			try {
				await deleteNotification({
					id: value?.uuid ?? '',
					state: locationSelected || 'FL',
				}).unwrap();
				dispatch(userActions.setTempDeleteNotification({ type: 'delete', data: value }));
				setAlertErrorMessage(t('notifications.textAlertdelete'), 'successNotification');
				setlistNew(removeObjectByUuid(listNew, value.uuid));
				setlistPrevious(removeObjectByUuid(listPrevious, value.uuid));
				// setModal({
				// 	render: () => (
				// 		<ModalWarning
				// 			icon={<MessageCheck />}
				// 			warningText={t('notifications.deleteNotifModal')}
				// 			textButton={t('common.close')}
				// 			onPress={closeModal}
				// 		/>
				// 	),
				// });

				closeModal();

				setTimeout(() => {
					setAlertErrorMessage(null);
				}, TIME_TO_CLOSE_NOTIFICATION_ALERT);
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`));
			}
		},
		[deleteNotification, listNew, listPrevious],
	);

	const updateAnnualVisit = useCallback(
		async (value: NotificationsGeneral) => {
			try {
				if (ecwId) {
					//Actualizamos el estado
					await updateAnnualVisitCode({
						code: ecwId,
						state: locationSelected || '',
					}).unwrap();

					//Eliminamos la notificacion
					await post_deleteNotification(value);
				}
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`));
			}
		},
		[updateAnnualVisitCode, locationSelected, ecwId],
	);

	const openModal = (value: NotificationsGeneral) => {
		setModal({
			render: (): any => (
				<View style={styles.contentModal}>
					<Pressable
						style={styles.contentTextModal}
						onPress={() => post_remindLater(value)}
					>
						<Clock />
						<Text style={styles.textModal}>{t('notifications.remindLater')}</Text>
					</Pressable>
					<DividerLine />
					<Pressable
						style={styles.contentTextModal}
						onPress={() => post_deleteNotification(value)}
					>
						<Trash />
						<Text style={styles.textModal}>{t('notifications.deleteNoti')}</Text>
					</Pressable>
					<Button
						onPress={closeModal}
						textStyle={styles.btn}
						title={t('common.close')}
						variant="Underline"
					/>
				</View>
			),
		});
	};

	const compareDate = (dateOne: Date, dateTwo: Date) => {
		if (dateOne < dateTwo) return 1;
		if (dateOne > dateTwo) return -1;

		return 0;
	};

	const get_notifications_status = useCallback(async () => {
		try {
			const res: NotificationsGeneral[] = await notificationApp({
				state: locationSelected,
			}).unwrap();
			if (res?.length) {
				const noViewed = res
					.filter((notification) => !notification.viewed)
					.slice()
					.sort((a, b) => compareDate(new Date(a.date), new Date(b.date)));
				const viewed = res
					.filter((notification) => notification.viewed)
					.slice()
					.sort((a, b) => compareDate(new Date(a.date), new Date(b.date)));
				setlistNew(noViewed);
				setlistPrevious(viewed);
				post_notificationViewAll();
			}
		} catch (error) {

		}
	}, [notificationApp]);

	const post_notificationViewAll = useCallback(async () => {
		try {
			await notificationViewAll({ state: locationSelected }).unwrap();
			await notificationApp({ state: locationSelected }).unwrap();
		} catch (error) {

		}
	}, [notificationViewAll]);

	useEffect(() => {
		get_notifications_status();
	}, []);

	useEffect(() => {
		if (tempDeleteNotification?.status) get_notifications_status();
	}, [tempDeleteNotification]);

	const navigateTelevisit = async (value: NotificationsGeneral) => {
		closeModal();
		dispatch(userActions.setIsTelevisitNavigate(true));
		//Eliminamos la notificacion
		await post_deleteNotification(value);
		navigation.navigate('GetCareScreen');
	};

	return (
		<ScrollView>
			{Global.FEATURE_NOTIFICATION && (
				<Pressable
					style={styles.contentRow}
					accessibilityRole="button"
					onPress={() => {
						navigation.navigate('NotificationSettingsScreen');
					}}
				>
					<Gear />
					<Text style={[styles.titleConfig, { textDecorationLine: 'underline' }]}>
						{t('notifications.btnSettingNoti')}
					</Text>
				</Pressable>
			)}
			{listNew?.length ? (
				<Text accessibilityRole="header" style={styles.subText}>
					{t('notifications.new')}
				</Text>
			) : (
				<></>
			)}
			{/* Title 1 */}
			{listNew.length ? (
				listNew.map((notifi, i) => (
					<CardNotificationGenerals
						key={`notif-${i}`}
						isAnnualV={notifi.functionality == 'annual_wellness_visit'}
						onPressIAlready={() => updateAnnualVisit(notifi)}
						onPressOptions={() => openModal(notifi)}
						onPressStartNow={() => navigateTelevisit(notifi)}
						isNew={true}
						time={notifi?.date ? moment(notifi?.date).format('MM/DD/YYYY HH:mm') : ''}
						icon={<IconAnualVis />}
						title={
							notifi?.functionality == 'annual_wellness_visit'
								? t('notifications.annualVisitTitle')
								: notifi[`title${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''
						}
						text={
							notifi?.functionality == 'annual_wellness_visit'
								? t('notifications.annualVisitSubTitle')
								: notifi[`body${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''
						}
					/>
				))
			) : (
				<></>
			)}
			{listPrevious?.length ? (
				<Text accessibilityRole="header" style={styles.subText}>
					{t('notifications.previous')}
				</Text>
			) : (
				<></>
			)}
			{/* Title 1 */}
			{listPrevious.length ? (
				listPrevious.map((notifi, i) => (
					<CardNotificationGenerals
						key={`notif-${i}`}
						isAnnualV={notifi.functionality == 'annual_wellness_visit'}
						onPressIAlready={() => updateAnnualVisit(notifi)}
						onPressOptions={() => openModal(notifi)}
						onPressStartNow={() => navigateTelevisit(notifi)}
						isNew={false}
						time={notifi?.date ? moment(notifi?.date).format('MM/DD/YYYY HH:mm') : ''}
						icon={<IconAnualVis />}
						title={
							notifi?.functionality == 'annual_wellness_visit'
								? t('notifications.annualVisitTitle')
								: notifi[`title${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''
						}
						text={
							notifi?.functionality == 'annual_wellness_visit'
								? t('notifications.annualVisitSubTitle')
								: notifi[`body${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''
						}
					/>
				))
			) : (
				<></>
			)}

			{!listPrevious.length && !listNew.length && (
				<View style={styles.void}>
					<EmptyCurrent />
					<Text style={styles.textVoid}>{t('notifications.void')}</Text>
				</View>
			)}

			<View style={{ marginBottom: 160 }} />
		</ScrollView>
	);
};

export default GeneralNotifications;
