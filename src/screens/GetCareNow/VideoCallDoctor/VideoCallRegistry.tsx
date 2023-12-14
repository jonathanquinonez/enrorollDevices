import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, Linking, Dimensions, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from '@hookform/resolvers/yup';
import appConfig from 'config/index';
//Component
import DatePicker, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Button from "src/components/atoms/Button/Button";
import Input from 'src/components/atoms/Input/Input';
import Row from 'src/components/atoms/Row/Row';
// Types, Styles
import { ValidationRegistry, VideoCallRegistryProps as Props } from './VideoCallRegistry.types';
//Styles
import componentStyles from './VideoCall.styles';
import useStyles from 'hooks/useStyles';
//icons and translations
import InfoSquare from 'icons/InfoSquare.svg';
import UserIcon from 'icons/user2.svg';
import CalendarInputIcon from 'icons/CalendarInputIcon.svg';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { videoCallRegistry } from 'domain/entities/videoCallRegistry';
import RegisterService from 'adapter/api/registerService';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ModalTelevisit from './ModalTelevisit/ModalTelevisit';
import { userActions } from 'adapter/user/userSlice';
import ModalErrorTelevisit from './ModalErrorTelevisit/ModalErrorTelevisit';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import EcwService from 'adapter/api/ecwService';
import Building from 'icons/Building.svg';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalErrorChat from '../ChatDoctor/ModalErrorChat/ModalErrorChat';

const VideoCallRegistry: React.FC<Props> = (props) => {
	const { } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [availityCoverage] = RegisterService.useAvailityCoverageMutation();
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const { closeModal, setModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();
	const dispatch = useAppDispatch();
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const { data: insuranceList } = EcwService.useFetchInsurancesQuery();
	const navigation = useNavigation();
	const [error, setError] = useState(false);
	const scrollRef = useRef<any>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue
	} = useForm<videoCallRegistry>({
		resolver: yupResolver(ValidationRegistry),
		mode: 'onBlur'
	});

	const onValidSubmit = async (values: videoCallRegistry) => {
		values.state = locationSelected;
		try {
			const response = await availityCoverage({ ...values, authUid }).unwrap();
			if (!response.isActive) {
				setError(false);
				setModal({
					render: () => (
						<ModalErrorChat />
					),
					height: 350,
				})
			} else {
				dispatch(userActions.setCoverage(true));
				await Linking.openURL(appConfig.TELADOC_URL);
				navigation.goBack();
				/*setModal({
					render: () => (
						<ModalTelevisit setAlertErrorMessage={setAlertErrorMessage}/>
					),
					height: 400,
					blockModal: true
				})*/
			}
		} catch (err: any) {
			if(err == 30) {
				setError(true);
				scrollRef.current?.scrollToEnd();
				return;
			};
			setAlertErrorMessage(t(`errors.code${err.code}`))
		}
	} 

	return (
		<View style={{ alignSelf: 'center' }}>
			<View style={{}}>
				<View style={styles.contentRow}>
					<View style={{ width: '10%' }}>
						<IconButton
							icon={<InfoSquare />}
							style={{backgroundColor:'transparent'}}
						/>
					</View>
					
					<View style={{ width: '90%' }}>
						<Text style={styles.text} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} >{t('getCareNow.videoCall.info')}</Text>
					</View>					
				</View>
			</View>
			  
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ alignSelf: 'center' }} ref={scrollRef}>
				<View style={{ marginVertical: 20 }}>		
					<View style={styles.containerForm}>
						<Input
							style={{ width: Dimensions.get('window').width * 0.85 }}
							control={control}
							icon={<UserIcon />}
							placeholder={t('getCareNow.videoCall.name')}
							name='firstName'
							error={errors.firstName}
							label={t('getCareNow.videoCall.name')} />
						<Input
							style={{ width: Dimensions.get('window').width * 0.85 }}
							control={control}
							icon={<UserIcon />}
							placeholder={t('getCareNow.videoCall.lastName')}
							error={errors.lastName}
							name='lastName'
							label={t('getCareNow.videoCall.lastName')} />
						<DatePickerController
							style={{ width: Dimensions.get('window').width * 0.90 }}
							control={control}
							error={errors.birthDate}
							name='birthDate'
							label={t('getCareNow.videoCall.date')}
							pikerStyle={{ width: Dimensions.get('window').width * 0.90 }}
						/>
						<InputSelect
							style={{ width: Dimensions.get('window').width * 0.9 }}
							labelStyle={{
								fontFamily: 'proxima-bold',
								lineHeight: 19,
								color: '#055293',
							}}
							label={t('getCareNow.videoCall.company') + ' *'}
							items={
								insuranceList ? insuranceList.map((item: any) => {
									return {
										key: item.id ?? '',
										label: item.name ?? '',
										value: item.name ?? '',
									}
								}) : []
							}
							placeholder={t('getCareNow.videoCall.placeholderCompany')}
							onChange={(v, i) => {
								const resp = insuranceList.find((data: any) => v == data.name );
								setValue('insuranceName', v);
								setValue('companyId', resp?.id ?? 0);
							}}
							control={control}
							name={'insuranceName'}
							icon={<Building />}
							error={errors.insuranceName}
						/>
						<Input
							style={{ width: Dimensions.get('window').width * 0.85 }}
							control={control}
							error={errors.memberId}
							icon={<CalendarInputIcon />}
							placeholder={t('getCareNow.videoCall.insu')}
							name='memberId'
							label={t('getCareNow.videoCall.insu')} />
					</View>

					<Text style={styles.textSupport} maxFontSizeMultiplier={1.3}>{t('getCareNow.videoCall.textSupport')}</Text>
					<Row style={styles.buttonNext}>
						<Button
							title={t('getCareNow.videoCall.next')}
							style={{ width: 200, marginBottom: 15 }}
							onPress={handleSubmit(onValidSubmit)}
						/>
					</Row>
					{
						error && (
							<Text style={[styles.textError, {marginBottom: -30}]} maxFontSizeMultiplier={1.3}>{t('getCareNow.videoCall.error')}</Text>
						)
					}
				</View> 
			</KeyboardAwareScrollView>

		</View>
	);
}
export default VideoCallRegistry;