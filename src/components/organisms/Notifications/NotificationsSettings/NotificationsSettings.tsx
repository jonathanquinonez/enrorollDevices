//Components
import { View, Text, Platform, TouchableOpacity } from 'react-native';

//Types | Styles
import { NotificationsSettingsProps as Props } from './NotificationsSettings.types';
import componentStyles from './NotificationsSettings.styles';

//Hooks
import useStyles from 'hooks/useStyles';
import CardNotificationsSettings from 'src/components/molecules/CardNotificationsSettings/CardNotificationsSettings';

import UsersService from 'adapter/api/usersService';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useTranslation } from 'react-i18next';
import { UserNotifications, UserNotificationsList, ValidNames, initialDataNf, notificationNames } from 'src/screens/Notifications/UtilNotifications';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Button from 'src/components/atoms/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import Mbutton from 'icons/NotificationsIcons/mobile-screen-button.svg';
import Arrow3 from 'icons/NotificationsIcons/arrow3.svg';


const NotificationsSettings: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const { style } = props;
    const { styles, colors } = useStyles(componentStyles);

    const [notificationsSetting] = UsersService.useNotificationsSettingMutation();
    const [createNotifications] = UsersService.useCreateNotificationsMutation();
    const [updateNotifications] = UsersService.useUpdateNotificationsMutation();
    const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
    const { authUid } = useAppSelector(userSelectors.selectUser);
    const { closeModal, setModal } = useBottomSheet();

    const { setAlertErrorMessage } = useErrorAlert();
    const [notifications, setNotifications] = useState<UserNotificationsList | undefined>()
	const navigation = useNavigation();


    const [change_password, setchange_password] = useState<UserNotifications>(initialDataNf('change_password'));
    const [block_account, setblock_account] = useState<UserNotifications>(initialDataNf('block_account'));
    const [log_in, setlog_in] = useState<UserNotifications>(initialDataNf('log_in'));
    const [biometrical_login, setbiometrical_login] = useState<UserNotifications>(initialDataNf('biometrical_login'));
    const [annual_wellness_visit, setannual_wellness_visit] = useState<UserNotifications>(initialDataNf('annual_wellness_visit'));
    const [update_insurance_information, setupdate_insurance_information] = useState<UserNotifications>(initialDataNf('update_insurance_information'));
    const [new_referral, setnew_referral] = useState<UserNotifications>(initialDataNf('new_referral'));
    const [edit_profile, setedit_profile] = useState<UserNotifications>(initialDataNf('edit_profile'));

    const setNotificationState = (name: string, value: UserNotifications) => {
        switch (name) {
            case 'change_password':
                setchange_password(value);
                break;
            case 'block_account':
                setblock_account(value);
                break;
            case 'log_in':
                setlog_in(value);
                break;
            case 'biometrical_login':
                setbiometrical_login(value);
                break;
            case 'annual_wellness_visit':
                setannual_wellness_visit(value);
                break;
            case 'update_insurance_information':
                setupdate_insurance_information(value);
                break;
            case 'new_referral':
                setnew_referral(value);
                break;
            case 'edit_profile':
                setedit_profile(value);
                break;
            default:
                break;
        }
    };


    const getNotificationsSettingList = useCallback(async () => {
        try {
            const res: UserNotificationsList = await notificationsSetting({ state: locationSelected ?? '' }).unwrap();
            setNotifications(res);

            notificationNames.forEach((name) => {
                const data = res?.notificationList.find((v) => v.name === name);
                data && setNotificationState(name, data);
            });

        } catch (error) {
            if (error != '2' && error != '3') setAlertErrorMessage(t(`errors.code${error}`));
        }
    }, [notificationsSetting])

    useEffect(() => {
        getNotificationsSettingList()
    }, [locationSelected])

    const openModalSave = () => {
        setModal({
            render: () => (
                <ModalWarning onPress={() => { closeModal(); onSubmitData() }}
                    warningText={t('notifications.saveChanges')}
                    textButton={t('common.yes')}
                    isIconAlert
                    textButtonCancel={t('common.no')}
                    onPressCancel={closeModal} />
            )
        });
    };

    const securityChange = (state: Dispatch<SetStateAction<UserNotifications>>, value: UserNotifications): any => {
        setModal({
            render: () => (
                <ModalWarning onPress={() => {
                    closeModal();
                    state(value);
                }}
                    warningText={t('notifications.securityChange')}
                    textButton={t('common.yes')}
                    isIconAlert
                    textButtonCancel={t('common.no')}
                    onPressCancel={() => {
                        closeModal();
                    }} />
            )
        });
    };

    const onSubmitData = useCallback(async () => {
        try {
            let data: UserNotificationsList = {
                state: locationSelected ?? '',
                notificationList: [
                    change_password,
                    block_account,
                    log_in,
                    biometrical_login,
                    annual_wellness_visit,
                    update_insurance_information,
                    new_referral,
                    edit_profile
                ]
            }

            if (notifications) await updateNotifications(data).unwrap();
            else {
                data.authUid = authUid;
                await createNotifications(data).unwrap();
            }
        } catch (error) {
            if (error != '2' && error != '3') setAlertErrorMessage(t(`errors.code${error}`));
        }

    }, [createNotifications, updateNotifications, notifications, change_password, block_account, log_in,
        biometrical_login, annual_wellness_visit, update_insurance_information, new_referral, edit_profile])


    return (
        <View style={{}}>
            <View style={{ position: 'absolute', top: '65%', zIndex: 2, marginLeft: -20 }}>
                <LinearGradient
                    colors={['transparent', Platform.OS === 'ios' ? '' : 'rgba(241,241,241, 0.95)']}
                    locations={[0, 0.3]}
                    style={styles.linearGradient}>
                </LinearGradient>
                <View style={styles.btn}>
                    <Button title={t('notifications.save')} variant='Contained' onPress={openModalSave} />
                </View>
            </View>
            
            <ScrollView style={{ marginTop: 30, zIndex: 0, height: '100%', display: 'flex' }}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => { navigation.navigate('EnrollDevice') }}>
                    <View style={styles.contentRow}>
                        <View style={styles.icon}><Mbutton /></View>
                        <Text style={styles.title2}>{t('notifications.activeDevices')}</Text>
                        <View style={styles.contentText}>
                            <Arrow3 />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
                <Text accessibilityRole='header' style={styles.subText}>{t('notifications.title')}</Text>{/* Title 1 */}
                {new_referral && <CardNotificationsSettings onChangeData={setnew_referral} key={'new_referral'} data={new_referral} />}
                {annual_wellness_visit && <CardNotificationsSettings onChangeData={setannual_wellness_visit} key={'annual_wellness_visit'} data={annual_wellness_visit} />}

                <Text accessibilityRole='header' style={styles.subText}>{t('notifications.title2')}</Text>{/* Title 2 */}
                {change_password && <CardNotificationsSettings onChangeData={(data, v) => v ? setchange_password(data) : securityChange(setchange_password, data)} key={'change_password'} data={change_password} />}
                {block_account && <CardNotificationsSettings onChangeData={(data, v) => v ? setblock_account(data) : securityChange(setblock_account, data)} key={'block_account'} data={block_account} />}
                {log_in && <CardNotificationsSettings onChangeData={(data, v) => v ? setlog_in(data) : securityChange(setlog_in, data)} key={'log_in'} data={log_in} />}
                {biometrical_login && <CardNotificationsSettings onChangeData={(data, v) => v ? setbiometrical_login(data) : securityChange(setbiometrical_login, data)} key={'biometrical_login'} data={biometrical_login} />}
                {update_insurance_information && <CardNotificationsSettings onChangeData={(data, v) => v ? setupdate_insurance_information(data) : securityChange(setupdate_insurance_information, data)} key={'update_insurance_information'} data={update_insurance_information} />}
                {edit_profile && <CardNotificationsSettings onChangeData={(data, v) => v ? setedit_profile(data) : securityChange(setedit_profile, data)} key={'edit_profile'} data={edit_profile} />}
                <View style={{ marginBottom: 300 }} />
            </ScrollView>
        </View>
    )

}

export default NotificationsSettings;