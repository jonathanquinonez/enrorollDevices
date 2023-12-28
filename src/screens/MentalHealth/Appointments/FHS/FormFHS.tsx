import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dimensions, View, Text } from 'react-native';
import Input from 'src/components/atoms/Input/Input';
import { MASK } from 'ui-core/utils/mask';
import { FormFHSInfo, FormFSHProps } from './FormFHS.types';
import { yupResolver } from '@hookform/resolvers/yup';
import componentStyles from './FormFHS.styles';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import MessageCheck from 'icons/message-check.svg';
import IconMail from 'icons/PersonalInfoIcons/mail.svg';
import MobileAlt from 'icons/PersonalInfoIcons/mobile-alt.svg';
import moment from 'moment';
import useStyles from 'hooks/useStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'src/components/atoms/Button/Button';
import AuthService from 'adapter/api/authService';
import FshService from 'adapter/api/fshService';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useNavigation } from '@react-navigation/native';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { Object } from './FormFHS.types'
'../../infrastructure/keraltyApi/repositories/fshConfig';


export const FormFHS: React.FC<{}> = (props) => {
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const { t } = useTranslation();
	const { styles } = useStyles(componentStyles);
	const [updateUsersPatientInfo] = AuthService.useUpdateUsersPatientInfoMutation();
	const [sendForm] = FshService.useSendFormMutation();
	const { setModal, closeModal } = useBottomSheet();
	const navigation = useNavigation();
	const userInformation = useAppSelector(userSelectors.selectUser);
	const { ecwId } = useAppSelector(userSelectors.selectUser);
	const [ageDisabled, setDisabled] = useState<Boolean>(true);
	const { setAlertErrorMessage } = useErrorAlert();


	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		setValue,
		getValues,
		setError,
		clearErrors
	} = useForm<FormFSHProps>({
		resolver: yupResolver(FormFHSInfo),
		mode: 'onBlur',
		defaultValues: {
			email: userInformation.email,
			mobile: userInformation.phone,
		},
	})

	useEffect(() => {
		getValues('date') && getValues('time') && getValues('comments') ?
			setDisabled(false)
			:
			setDisabled(true)
	}, [isValid])


	const onSubmit = useCallback(async (value: Object) => {
		try {
			await sendForm(value).unwrap();
			setModal({
				render: () => (
					<ModalWarning
						icon={<MessageCheck />}
						warningText={t('myHealth.screenIWantToBeCalledBack.modalTitle')}
						textButton={t('myHealth.screenIWantToBeCalledBack.btnModalTitle')}
						onPress={() => { closeModal(), navigation.goBack() }}
					/>
				), height: 280
			})
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}, [sendForm])


	const sureToSaveChanges = (value: FormFSHProps) => {
		const timeString = moment(value.date).format('MM/DD/YYYY') + ' ' + moment(value.time).format('h:mm a');
		const newTime = new Date(timeString);
		if (newTime > new Date()) {
			value.date = moment(value.date).format('MM/DD/YYYY') + ' ' + moment(value.time).format('h:mm a');
			delete value.time; //Remove item
			value.inEnglish = t('general.locale') == "en" ? true : false;
			value.state = userInformation.state
			value.name = userInformation.displayName
			value.idEcw = ecwId;
			onSubmit(value)
		} else {
			setError('time', { message: 'invalidTime', type: 'invalidTime' })
		}
	}


	return (
		<View>
			<View style={styles.labelContainer}>
				<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('myHealth.screenIWantToBeCalledBack.titleViewCards')}</Text>
			</View>

			<KeyboardAwareScrollView
				enableAutomaticScroll
				keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
				enableOnAndroid={true}
			>
				<View style={{ alignItems: 'center' }}>
					<Input
						icon={<IconMail />}
						keyboardType='email-address'
						placeholder={t('myHealth.screenIWantToBeCalledBack.placeholderInputEmail')}
						label={t('myHealth.screenIWantToBeCalledBack.titleInputEmail') + '*'}
						name={'email'}
						error={errors.email}
						control={control}
						labelStyle={styles.label}
						setDisabled={false}
						inputStyle={{
							width: Dimensions.get('window').width * 0.85,
						}}
					/>

					<Input
						icon={<MobileAlt />}
						keyboardType='numeric'
						mask={MASK.phone}
						placeholder={t('myHealth.screenIWantToBeCalledBack.placeholderInputMobil')}
						label={t('myHealth.screenIWantToBeCalledBack.titleInputMobil') + '*'}
						name={'mobile'}
						error={errors.mobile}
						control={control}
						labelStyle={styles.label}
						setDisabled={false}
						inputStyle={{
							width: Dimensions.get('window').width * 0.85,
						}}
					/>
					<DatePickerController
						name={'date'}
						pikerStyle={{ width: Dimensions.get('window').width * 0.85 }}
						control={control}
						labelStyle={styles.label}
						label={t('myHealth.screenIWantToBeCalledBack.titleDate')}
						error={errors.date}
						onChange={() => clearErrors('time')}
						onDone={() => clearErrors('time')}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						initialValue={moment(new Date())}
						minDate={new Date()}
						initValueMayus={true}
					/>
					<DatePickerController
						name={'time'}
						pikerStyle={{ width: Dimensions.get('window').width * 0.85, marginTop: 17, marginBottom: 8 }}
						control={control}
						labelStyle={styles.label}
						error={errors.time}
						style={{ width: Dimensions.get('window').width * 0.85, }}
						initialValue={moment(new Date())}
						mode='time'
					/>

					<View style={styles.labelContainer}>
						<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('myHealth.screenIWantToBeCalledBack.titleComents')}</Text>
						<Text style={styles.labelSubtitle} maxFontSizeMultiplier={1.3}>{t('myHealth.screenIWantToBeCalledBack.subTitleComents')}</Text>
					</View>
					<Input
						name={'comments'}
						error={errors.comments}
						control={control}
						keyboardType='ascii-capable'
						multiline={true}
						numberOfLines={4}
						labelStyle={styles.label}
						placeholder={t('myHealth.screenIWantToBeCalledBack.placeholderComents')}
						inputStyle={{
							width: Dimensions.get('window').width * 0.85, paddingBottom: '20%', paddingHorizontal: 15
						}}
					/>

					<Button
						title={t('myHealth.screenIWantToBeCalledBack.btnSubmit')}
						style={styles.btnLabel}
						// disabled={ ageDisabled }
						onPress={handleSubmit(sureToSaveChanges)}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}