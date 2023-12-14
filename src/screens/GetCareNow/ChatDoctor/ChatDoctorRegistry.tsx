import { View, Text, Linking, Dimensions, Platform } from 'react-native';
import Row from 'src/components/atoms/Row/Row';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import InfoSquare from 'icons/InfoSquare.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Input from 'src/components/atoms/Input/Input';
import UserIcon from 'icons/user2.svg';
import DatePicker, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import CalendarInputIcon from 'icons/CalendarInputIcon.svg';
import Button from 'src/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	ValidationRegistry,
	VideoCallRegistryProps as Props,
} from '../VideoCallDoctor/VideoCallRegistry.types';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { videoCallRegistry } from 'domain/entities/videoCallRegistry';
import ModalErrorTelevisit from '../VideoCallDoctor/ModalErrorTelevisit/ModalErrorTelevisit';
import ModalTelevisit from '../VideoCallDoctor/ModalErrorTelevisit/ModalErrorTelevisit';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { userActions } from 'adapter/user/userSlice';
import RegisterService from 'adapter/api/registerService';
import useStyles from 'hooks/useStyles';
import componentStyles from '../VideoCallDoctor/VideoCall.styles';
import ModalErrorChat from './ModalErrorChat/ModalErrorChat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import OkIcon from 'icons/OkIcon.svg';
import { useNavigation } from '@react-navigation/native';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import EcwService from 'adapter/api/ecwService';
import Building from 'icons/Building.svg';
import IconIdCard from '../../../../assets/icons/IdCard.svg';
import { useRef, useState } from 'react';

const ChatDoctorRegistry: React.FC<Props> = (props) => {
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [availityCoverage] = RegisterService.useAvailityCoverageMutation();
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const { closeModal, setModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();
	const dispatch = useAppDispatch();
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);
	const navigation = useNavigation();
	const { data: insuranceList } = EcwService.useFetchInsurancesQuery();
	const [error, setError] = useState(false);
	const scrollRef = useRef<any>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue,
	} = useForm<videoCallRegistry>({
		resolver: yupResolver(ValidationRegistry),
		mode: 'onBlur',
	});

	const onValidSubmit = async (values: videoCallRegistry) => {
		values.state = locationSelected;
		try {
			const response = await availityCoverage({ ...values, authUid }).unwrap();
			if (response.isActive) {
				dispatch(userActions.setCoverage(true));
				//	navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': previousRoute })
				dispatch(userActions.setStateVewChat({ queue: 'provider', stateView: true }));
			} else {
				setError(false);
				setModal({
					render: () => <ModalErrorChat />,
					height: 400,
					blockModal: true,
				});
			}
		} catch (err: any) {
			if (err == 30) {
				setError(true);
				scrollRef.current?.scrollToEnd();
				return;
			}
			setAlertErrorMessage(t(`errors.code${err}`));
		}
	};

	return (
		<View style={{ alignSelf: 'center' }}>
			<View style={styles.contentRow}>
				<View style={{ width: '10%' }}>
					<IconButton icon={<InfoSquare />} style={{ backgroundColor: 'transparent' }} />
				</View>

				<View style={{ width: '90%' }}>
					<Text style={styles.text} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>
						{t('getCareNow.videoCall.info')}
					</Text>
				</View>
			</View>
			<View
				style={{
					alignSelf: 'center',
					height: '83%',
					marginVertical: 20,
					marginBottom: '4%',
				}}
			>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
					<View>
						<Input
							style={{ width: Dimensions.get('window').width * 0.85 }}
							control={control}
							icon={<UserIcon />}
							placeholder={t('getCareNow.videoCall.name')}
							name="firstName"
							error={errors.firstName}
							label={t('getCareNow.videoCall.name')}
						/>
						<Input
							style={{ width: Dimensions.get('window').width * 0.85 }}
							control={control}
							icon={<UserIcon />}
							placeholder={t('getCareNow.videoCall.lastName')}
							error={errors.lastName}
							name="lastName"
							label={t('getCareNow.videoCall.lastName')}
						/>
						<DatePickerController
							style={{ width: Dimensions.get('window').width * 0.9 }}
							control={control}
							error={errors.birthDate}
							name="birthDate"
							label={t('getCareNow.videoCall.date')}
							pikerStyle={{ width: Dimensions.get('window').width * 0.9 }}
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
								insuranceList
									? insuranceList.map((item: any) => {
											return {
												key: item.id ?? '',
												label: item.name ?? '',
												value: item.name ?? '',
											};
									  })
									: []
							}
							placeholder={t('getCareNow.videoCall.placeholderCompany')}
							onChange={(v, i) => {
								const resp = insuranceList.find((data: any) => v == data.name);
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
							icon={<IconIdCard />}
							placeholder={t('getCareNow.videoCall.insu')}
							name="memberId"
							label={t('getCareNow.videoCall.insu')}
						/>
					</View>
					<Text style={styles.textSupport} maxFontSizeMultiplier={1.3}>
						{t('getCareNow.videoCall.textSupport')}
					</Text>
					<Row style={styles.buttonNext}>
						<Button
							title={t('getCareNow.videoCall.next')}
							style={{ width: 200 }}
							onPress={handleSubmit(onValidSubmit)}
						/>
					</Row>
					{error && (
						<Text
							style={[styles.textError, { marginTop: -10, paddingBottom: 30 }]}
							maxFontSizeMultiplier={1.3}
						>
							{t('getCareNow.videoCall.error')}
						</Text>
					)}
				</KeyboardAwareScrollView>
			</View>
		</View>
	);
};

export default ChatDoctorRegistry;
