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
import { NotificationsGeneral, removeObjectByUuid } from 'src/screens/Notifications/UtilNotifications';
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
    const { notificationsList, tempDeleteNotification } = useAppSelector(userSelectors.selectNotificationsList);
    const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
    const [updateAnnualVisitCode] = AuthService.useUpdateAnnualVisitCodeMutation();
    const { setAlertErrorMessage } = useErrorAlert();


    const post_remindLater = useCallback(async (value: NotificationsGeneral) => {
        try {
            await remindLater({ id: value?.uuid ?? '' }).unwrap();
            dispatch(userActions.setTempDeleteNotification({type: 'remindLater', data: value}))
            setAlertErrorMessage(t('notifications.textAlertremindLater'), 'successNotification');
            setlistNew(removeObjectByUuid(listNew, value.uuid));
            setlistPrevious(removeObjectByUuid(listPrevious, value.uuid));
            setModal({
                render: () => (
                    <ModalWarning
                        icon={<MessageCheck />}
                        warningText={t('notifications.remindLaterTitleModal')}
                        textButton={t('common.close')}
                        onPress={closeModal} />
                )
            });
        } catch (error) {
            setAlertErrorMessage(t(`errors.code${error}`));
        }
    }, [remindLater, listNew, listPrevious]);

    const post_deleteNotification = useCallback(async (value: NotificationsGeneral) => {
        try {
            await deleteNotification({ id: value?.uuid ?? '' }).unwrap();
            dispatch(userActions.setTempDeleteNotification({type: 'delete', data: value}))
            setAlertErrorMessage(t('notifications.textAlertdelete'), 'successNotification');
            setlistNew(removeObjectByUuid(listNew, value.uuid));
            setlistPrevious(removeObjectByUuid(listPrevious, value.uuid));
            setModal({
                render: () => (
                    <ModalWarning
                        icon={<MessageCheck />}
                        warningText={t('notifications.deleteNotifModal')}
                        textButton={t('common.close')}
                        onPress={closeModal} />
                )
            });
        } catch (error) {
            setAlertErrorMessage(t(`errors.code${error}`));
        }
    }, [deleteNotification, listNew, listPrevious]);

    const updateAnnualVisit = useCallback(
        async () => {
            try {
                if (ecwId) await updateAnnualVisitCode({ code: ecwId, state: locationSelected || '' }).unwrap();
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error}`));
            }
        },
        [updateAnnualVisitCode, locationSelected, ecwId],
    );

    const openModal = (value: NotificationsGeneral) => {
        setModal({
            render: () => (
                <View style={styles.contentModal}>
                    <Pressable style={styles.contentTextModal} onPress={() => post_remindLater(value)}>
                        <Clock />
                        <Text style={styles.textModal}>{t('notifications.remindLater')}</Text>
                    </Pressable>
                    <DividerLine />
                    <Pressable style={styles.contentTextModal} onPress={() => post_deleteNotification(value)}>
                        <Trash />
                        <Text style={styles.textModal}>{t('notifications.deleteNoti')}</Text>
                    </Pressable>
                    <Button onPress={closeModal} textStyle={styles.btn} title={t('common.close')} variant='Underline' />
                </View>
            )
        });
    }

    const get_notifications_status = useCallback(async () => {
        try {
            const res: NotificationsGeneral[] = await notificationApp({}).unwrap();
            if (res?.length) {
                const noViewed = res.filter(notification => !notification.viewed);
                const viewed = res.filter(notification => notification.viewed);
                setlistNew(noViewed)
                setlistPrevious(viewed)
            }
        } catch (error) {
            console.log('---error---', error)
        }
    }, [notificationApp]);

    const post_notificationViewAll = useCallback(async () => {
        try {
            await notificationViewAll({}).unwrap();
        } catch (error) {
            console.log('---error---', error)
        }
    }, [notificationViewAll])

    useEffect(() => {
        get_notifications_status();
        post_notificationViewAll();
    }, []);

    useEffect(() => {
        if(tempDeleteNotification?.status) get_notifications_status();
    }, [tempDeleteNotification])

    const navigateTelevisit = async () => {
        closeModal();
        dispatch(userActions.setIsTelevisitNavigate(true))
        navigation.navigate('GetCareScreen')
    }

    return (
        <ScrollView >
            <Pressable
                style={styles.contentRow}
                accessibilityRole='button'
                onPress={() => { navigation.navigate('NotificationSettingsScreen'); }}>
                <Gear />
                <Text style={styles.titleConfig}>{t('notifications.btnSettingNoti')}</Text>
            </Pressable>

            {listNew?.length ? <Text accessibilityRole='header' style={styles.subText}>{t('notifications.new')}</Text> : <></>}{/* Title 1 */}
            {listNew.length ?
                listNew.map((notifi, i) => (<CardNotificationGenerals key={`notif-${i}`}
                    isAnnualV={notifi.functionality == 'annual_wellness_visit'}
                    onPressIAlready={updateAnnualVisit}
                    onPressOptions={() => openModal(notifi)}
                    onPressStartNow={navigateTelevisit}
                    isNew={true}
                    time={notifi?.date ? moment(notifi?.date).format('MM/DD/YYYY HH:mm') : ''}
                    icon={<IconAnualVis />}
                    title={notifi?.functionality == 'annual_wellness_visit' ? t('notifications.annualVisitTitle') : notifi[`title${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''}
                    text={notifi?.functionality == 'annual_wellness_visit' ? t('notifications.annualVisitSubTitle') : notifi[`body${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''} />)) : <></>
            }
            {listPrevious?.length ? <Text accessibilityRole='header' style={styles.subText}>{t('notifications.previous')}</Text> : <></>}{/* Title 1 */}
            {listPrevious.length ?
                listPrevious.map((notifi, i) => (<CardNotificationGenerals key={`notif-${i}`}
                    isAnnualV={notifi.functionality == 'annual_wellness_visit'}
                    onPressIAlready={updateAnnualVisit}
                    onPressOptions={() => openModal(notifi)}
                    onPressStartNow={navigateTelevisit}
                    isNew={false}
                    time={notifi?.date ? moment(notifi?.date).format('MM/DD/YYYY HH:mm') : ''}
                    icon={<IconAnualVis />}
                    title={notifi?.functionality == 'annual_wellness_visit' ? t('notifications.annualVisitTitle') : notifi[`title${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''}
                    text={notifi?.functionality == 'annual_wellness_visit' ? t('notifications.annualVisitSubTitle') : notifi[`body${t('general.locale') == 'en' ? 'En' : 'Es'}`] ?? ''} />)) : <></>
            }

            {(!listPrevious.length && !listNew.length) &&
                <View style={styles.void}>
                    <EmptyCurrent />
                    <Text style={styles.textVoid}>{t('notifications.void')}</Text>
                </View>}

            <View style={{ marginBottom: 160 }} />
        </ScrollView>
    )

}

export default GeneralNotifications;