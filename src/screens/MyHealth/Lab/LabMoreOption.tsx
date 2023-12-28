import useStyles from 'hooks/useStyles';
import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import Button from 'src/components/atoms/Button/Button';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import Row from 'src/components/atoms/Row/Row';
import componentStyle from './LabMoreOption.style';
import MyModal from 'src/components/atoms/Modal/MyModal';
import ChatIcon from '../../../../assets/icons/ChatDoctorIcon.svg';
import Calendar from '../../../../assets/icons/CalendarHeart.svg';
import Suport from '../../../../assets/icons/SuportIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Body8 } from 'src/screens/GetCareNow/Payment/ModalBody/ModalBody';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';
import CircleXmark from 'icons/circle-xmark.svg';

import IconButton from 'src/components/atoms/IconButton/IconButton';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import PaymentService from 'adapter/api/paymentService';
import RegisterService from 'adapter/api/registerService';
import ScheduleCode, {
	diferenceTimeByZone,
} from 'src/screens/GetCareNow/Payment/configAvailability';
import { userActions } from 'adapter/user/userSlice';

export const LabMoreOption = () => {
	const dispatch = useAppDispatch();
	const [validateHintForm] = RegisterService.useValidateHintFormMutation();
	const { styles } = useStyles(componentStyle);
	const { navigate } = useNavigation<any>();
	const { t } = useTranslation();
	const [isAvailable, setIsAvailable] = useState(true);
	const [validateInsurance] = PaymentService.useValidateMutation();
	const [ageModal, setShowModal] = useState(false);
	const [numberInsuranceModal, setNumberInsuranceModal] = useState<string | number>('0');
	const { closeModal } = useBottomSheet();
	const navigation = useNavigation();
	const { token, locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const coverage = useAppSelector(userSelectors.selectActiveCoverage);
	const { authUid } = useAppSelector(userSelectors.selectUser);

	const handleShowModal = (option: boolean) => {
		setShowModal(option);
	};
	const handleCloseModal = () => {
		handleShowModal(false);
	};
	const validateHint = async () => {
		let response: boolean = await validateHintForm({
			patientId: authUid,
			state: locationSelected ?? '',
		}).unwrap();
		return response;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const originalDate = new Date();
			const converted = originalDate.toISOString();
			const timeConverted = converted.split('T')[1].split(':');
			const newDate: Date = new Date(
				`${converted.split('T')[0]}T${timeConverted[0]}:${timeConverted[1]}:${timeConverted[2]
				}`,
			);
			newDate.setHours(
				newDate.getHours() +
				(locationSelected
					? diferenceTimeByZone.find((i) => i.state === locationSelected ?? '')!
						.diference
					: 0),
			);
			const cTime: number = +newDate.toISOString().split('T')[1].split(':')[0];
			if (
				newDate.getDay() !== ScheduleCode.startDay &&
				newDate.getDay() !== ScheduleCode.endDay
			) {
				if (cTime >= ScheduleCode.startTime && cTime < ScheduleCode.endTimeFHS) {
					setIsAvailable(true);
				} else {
					setIsAvailable(false);
				}
			} else {
				setIsAvailable(false);
			}
		}, 60000); // Intervalo de 1 minuto en milisegundos

		return () => {
			clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
		};
	}, [locationSelected]);

	const navigateChat = useCallback(async () => {
		try {
			const response = await validateInsurance({
				authUid: authUid,
				state: locationSelected ?? '',
				token: 'Bearer ' + token,
				service: 'Videocall',
			}).unwrap();
			if (response?.code == '1') {
				let responseHint = await validateHint();
				switch (true) {
					case (jwtDecode(token ? token : '') as any).activeCoverage || responseHint:
						closeModal();
						//  navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': currentRoute })
						dispatch(
							userActions.setStateVewChat({ queue: 'provider', stateView: true }),
						);

						break;
					case coverage || responseHint:
						closeModal();
						// navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': currentRoute })
						dispatch(
							userActions.setStateVewChat({ queue: 'provider', stateView: true }),
						);
						break;
					default:
						navigation.navigate('ChatDoctorScreen');
						break;
				}
			}
			if (response.code == '2') {
				setNumberInsuranceModal(8);
				handleShowModal(true);
			}
			if (response.code == '3') {
				setNumberInsuranceModal(9);
				handleShowModal(true);
			}
			if (response.code == '4') {
				setNumberInsuranceModal(10);
				handleShowModal(true);
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [validateInsurance, authUid, locationSelected, token]);

	return (
		<>
			<SafeAreaView
				style={{
					width: '100%',
					height: locationSelected == 'FL' ? 300 : 200,
					maxWidth: Dimensions.get('window').width * 0.85,
				}}
			>
				{locationSelected == 'FL' && <Row>
					<Button
						icon={<ChatIcon />}
						title={t('moreOptions.chat')}
						variant="Underline"
						style={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							height: 80,
							width: 400,
						}}
						textStyle={[
							styles.textButton,
							{
								textAlign: 'left',
								paddingLeft: '3%',
								paddingTop: '2%',
								color: '#0069a7',
							},
						]}
						onPress={() => {
							navigateChat();
						}}
					/>
				</Row>}
				<DividerLine />

				<Row>
					<Button
						icon={<Calendar />}
						title={t('moreOptions.book')}
						variant="Underline"
						style={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							height: 80,
							width: 400,
						}}
						textStyle={[
							styles.textButton,
							{ paddingLeft: '6%', paddingTop: '2%', color: '#0069a7' },
						]}
						onPress={() => {
							navigate('VimView');
							closeModal();
						}}
					/>
				</Row>
				<DividerLine />
				<View>
					<Button
						icon={<Suport />}
						title={t('moreOptions.support')}
						variant="Underline"
						style={{
							justifyContent: 'flex-start',
							alignItems: 'center',
							height: 80,
							width: 400,
						}}
						textStyle={[
							styles.textButton,
							{ paddingLeft: '5%', paddingTop: '2%', color: '#0069a7' },
						]}
						onPress={() => {
							navigate('ChatSanitas', { type: 'supportUser' });
							closeModal();
						}}
					/>
				</View>
				<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
					<IconButton
						accessibilityLabel={t('accessibility.closeOptins')}
						icon={<CircleXmark />}
						style={{ backgroundColor: '#FFF' }}
						onPress={() => closeModal()}
					/>
				</Row>
			</SafeAreaView>
			<MyModal
				open={ageModal}
				height={
					numberInsuranceModal == 10
						? 420
						: numberInsuranceModal == 9 || numberInsuranceModal == 8
							? 380
							: 260
				}
				onClose={handleCloseModal}
				onRequestClose={handleCloseModal}
				blockModal={false}
			>
				{numberInsuranceModal == 8 ||
					numberInsuranceModal == 9 ||
					numberInsuranceModal == 10 ? (
					<Body8
						ageDataInsurance={numberInsuranceModal}
						modalPaypal={() => null}
						setShowModal={setShowModal}
					/>
				) : (
					<></>
				)}
			</MyModal>
		</>
	);
};
