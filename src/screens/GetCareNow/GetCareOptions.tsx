import React, { useCallback, useEffect, useState } from 'react';
import appConfig from 'config/index';
import { Linking, ScrollView, View, Dimensions, Text } from 'react-native';
//icons
import Chat from 'icons/Chat.svg';
import Video from 'icons/Video.svg';
import Call from 'icons/Call.svg';
//components
import Card from 'src/components/molecules/Card/Card';
import Row from 'src/components/atoms/Row/Row';
//transaltion and navigation
import { useTranslation } from 'react-i18next';
import ScheduleCode, { diferenceTimeByZone } from './Payment/configAvailability';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import jwtDecode from 'jwt-decode';
import { useCall } from 'hooks/useCall';
import CardTemp from 'src/components/molecules/CardTemp/CardTemp';
import StatePayment from './Payment/StatePayment';
import MyModal from 'src/components/atoms/Modal/MyModal';
import { useAppDispatch } from 'adapter/hooks';
import {
	Body,
	Body2,
	Body4,
	Body5,
	Body8,
	BodyCancelTransaction,
	BodyNotApplicable,
} from './Payment/ModalBody/ModalBody';
import { dataInsurance, PaymentTransaction } from './Payment/ModalBody/ModalBody.types';
import moment from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { modalPayments } from 'src/components/atoms/ModalPaymentsProvider/ModalPaymentsProvider';
import PaymentScreen from 'src/components/organisms/PaymentScreen/PaymentScreen';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import LoadingProvider from 'src/components/organisms/LoadingProvider/LoadingProvider';
import PaymentService from 'adapter/api/paymentService';
import RegisterService from 'adapter/api/registerService';
import { userActions } from 'adapter/user/userSlice';
import CardOutTime from 'src/components/molecules/CardOutTime/CardOutTime';
import { useLoading } from 'src/components/organisms/LoadingProvider/LoadingProvider';

export const GetCareOptions = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const [ageBodyModal, setShowBodyModal] = useState<string | number>('0');
	const [numberInsuranceModal, setNumberInsuranceModal] = useState<string | number>('0');
	const [statusValue, setStatusValue] = useState(0);
	const [ageDataInsurance, setDataInsurance] = useState<dataInsurance | undefined>();
	const { openLink } = useCall();
	const [isAvailable, setIsAvailable] = useState(true);
	const { currentRoute, isTelevisitNavigate, previousRoute } = useAppSelector(
		userSelectors.selectRoute,
	);
	const { token, locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const coverage = useAppSelector(userSelectors.selectActiveCoverage);
	// const userInformation = useAppSelector(userSelectors.selectUser);
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const { paymentResponse } = useAppSelector(userSelectors.selectPaymentResponse);
	const [isStatePayment, setIsStatePayment] = useState(false);
	const [resTransaction, setResTransaction] = useState<PaymentTransaction>();
	const { setAlertErrorMessage } = useErrorAlert();
	const [transaction] = PaymentService.useTransactionMutation();
	const [cancelTrans] = PaymentService.useCancelTransactionMutation();
	const [rejectedTrans] = PaymentService.useRejectedTransactionMutation();
	const [initPay] = PaymentService.useInitMutation();
	const [validateInsurance] = PaymentService.useValidateMutation();
	const navigation: any = useNavigation();
	const { setLoading } = useLoading();

	const { closeModal2, setModal2 } = modalPayments();
	const currentDate = moment(new Date(Date.now()));
	const [validateHintForm] = RegisterService.useValidateHintFormMutation();
	const [infoPaypal, setInfoPaypal] = useState({
		id: '',
		state: '',
		date: moment(new Date()).format(FORMATS.date6),
		number: '',
		value: '',
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const originalDate = new Date();
			const converted = originalDate.toISOString();
			const timeConverted = converted.split('T')[1].split(':');
			const newDate: Date = new Date(
				`${converted.split('T')[0]}T${timeConverted[0]}:${timeConverted[1]}:${
					timeConverted[2]
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
				if (cTime >= ScheduleCode.startTime && cTime < ScheduleCode.endTime) {
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

	const paymentTransaction = useCallback(async () => {
		try {
			const response = await transaction({
				authUid: authUid,
				state: locationSelected ?? '',
				token: 'Bearer ' + token,
				service: 'Videocall',
			}).unwrap();

			if (response?.transactionInformation?.paymentType == 'CO_INSURANCE_DEDUCTIBLE') {
				handlerTelevisit();
				closeModal2();
				setShowBodyModal('0');
				setNumberInsuranceModal('0');
				return;
			}

			setResTransaction(response);
			setShowBodyModal('1');
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [transaction, authUid, locationSelected, token]);

	const cancelTransaction = useCallback(
		async (isopenModal?: boolean) => {
			try {
				await cancelTrans({
					authUid: authUid,
					state: locationSelected ?? '',
					service: 'Videocall',
				}).unwrap();
				if (isopenModal) setShowBodyModal('cancel');
				return 'ok';
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`));
				return 'error';
			}
		},
		[cancelTrans, authUid, locationSelected, token],
	);

	const rejectedTransaction = useCallback(async () => {
		try {
			await rejectedTrans({
				authUid: authUid,
				state: locationSelected ?? '',
				service: 'Videocall',
			}).unwrap();

			return 'ok';
		} catch (error) {
			return 'error';
		}
	}, [cancelTrans, authUid, locationSelected, token]);

	const getInsurence = useCallback(async () => {
		try {
			setLoading(true);
			const response = await initPay({
				authUid: authUid,
				state: locationSelected ?? '',
				token: 'Bearer ' + token,
				service: 'Videocall',
			}).unwrap();
			setNumberInsuranceModal('0');
			if (response?.code == '8') {
				handlerTelevisit();
			} else if (response?.code == '7') {
				const status = await cancelTransaction();
				if (status == 'ok') getInsurence();
			} else {
				setDataInsurance({ ...response });
				setShowBodyModal(response?.code);
				handleShowModal(true);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error != '4')
				setAlertErrorMessage(t(`errors.code${error == '500' ? '999' : error}`));
		}
	}, [initPay, authUid, locationSelected, token]);

	useEffect(() => {
		if (isTelevisitNavigate) {
			getInsurence();
			dispatch(userActions.setIsTelevisitNavigate(false));
		}
	}, [isTelevisitNavigate]);

	const validateHint = async () => {
		let response: boolean = await validateHintForm({
			patientId: authUid,
			state: locationSelected ?? '',
		}).unwrap();
		return response;
	};

	const navigate = async () => {
		await Linking.openURL(appConfig.TELADOC_URL);
	};

	const financial = (x: string | undefined) => {
		return x ? Number.parseFloat(x).toFixed(2) : 0;
	};

	useEffect(() => {
		setInfoPaypal({
			...infoPaypal,
			number: paymentResponse?.payId ?? '',
			id: paymentResponse?.id,
			value: `$${financial(ageDataInsurance?.total.toString())}`,
			state: paymentResponse?.status
				? t(`payment.titleStatus.${paymentResponse?.status}`)
				: '',
		});
		if (paymentResponse) {
			switch (paymentResponse.status) {
				case 'Succeeded':
					setStatusValue(1);
					break;
				case 'Pending':
					setStatusValue(2);
					break;
				default:
					setStatusValue(3);
					break;
			}
			if (paymentResponse.status == 'Declined') rejectedTransaction();
			setIsStatePayment(true);
			handleShowModal(false);
		}
	}, [paymentResponse, ageDataInsurance]);
	const navigateChat = useCallback(async () => {
		//navigation.navigate('ChatSanitas', { type: 'doctor', prevRoute: currentRoute });

		//	return;
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
						/* 		navigation.navigate('ChatSanitas', {
							type: 'doctor',
							prevRoute: currentRoute,
						}); */
						dispatch(
							userActions.setStateVewChat({ queue: 'provider', stateView: true }),
						);
						break;
					case coverage || responseHint:
						/* 		navigation.navigate('ChatSanitas', {
							type: 'doctor',
							prevRoute: currentRoute,
						}); */
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
			console.log('el error', error);
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [validateInsurance, authUid, locationSelected, token]);

	const handlerCall = async () => {
		await openLink({
			number: appConfig.CALL_NUMBER,
			prompt: false,
			skipCanOpen: true,
		});
	};

	const handleShowModal = (option: boolean) => {
		setShowModal(option);
	};

	const handlerTelevisit = async () => {
		navigate();
	};

	useEffect(() => {
		setTimeout(() => {
			// if (currentRoute != 'GetCareScreen') openingModal(false)
		}, 1100);
	}, [currentRoute]);

	const handleCloseModal = () => {
		handleShowModal(false);
	};

	const paymentInit = async () => {
		// dispatch(loaderActions.setLoading(true));
		paymentTransaction();
	};

	const cancelPayment = async () => {
		// dispatch(loaderActions.setLoading(true));
		await cancelTransaction();
		paymentTransaction();
	};

	const maxHeight =
		Dimensions.get('window').height > 680 ? 650 : Dimensions.get('window').height - 20;

	const setShowModal = useCallback(
		(option: boolean) => {
			if (!option) openingModal(false);
		},
		[ageBodyModal, ageDataInsurance, numberInsuranceModal, resTransaction],
	);

	useEffect(() => {
		if (ageBodyModal !== '0' || numberInsuranceModal !== '0') openingModal(true);
		else openingModal(false);
	}, [ageBodyModal, numberInsuranceModal]);

	const openingModal = useCallback(
		(option: boolean) => {
			if (option) {
				setModal2({
					render: () =>
						ageBodyModal == '1' ? (
							<Body
								ageDataInsurance={ageDataInsurance}
								modalPaypal={() => setShowBodyModal('pay')}
								setShowModal={setShowModal}
							/>
						) : numberInsuranceModal == 8 ||
						  numberInsuranceModal == 9 ||
						  numberInsuranceModal == 10 ? (
							<Body8
								ageDataInsurance={numberInsuranceModal}
								modalPaypal={() => null}
								setShowModal={setShowModal}
							/>
						) : ageBodyModal == '2' || ageBodyModal == '3' || ageBodyModal == '4' ? (
							<Body2
								ageDataInsurance={ageDataInsurance}
								modalPaypal={() => paymentInit()}
								setShowModal={setShowModal}
							/>
						) : ageBodyModal == '5' ? (
							<Body4
								newPaypal={() => cancelPayment()}
								modalPaypal={() => setShowBodyModal('1')}
								setShowModal={setShowModal}
							/>
						) : ageBodyModal == '6' ? (
							<Body5
								ageDataInsurance={ageDataInsurance}
								modalPaypal={() => {}}
								setShowModal={setShowModal}
							/>
						) : ageBodyModal == 'cancel' ? (
							<BodyCancelTransaction
								modalPaypal={() => {}}
								setShowModal={setShowModal}
							/>
						) : ageBodyModal == 'pay' ? (
							<PaymentScreen
								closeModal={() => {
									closeModal2();
									setShowBodyModal('0');
									setNumberInsuranceModal('0');
								}}
								setAlertErrorMessage={(text) =>
									setTimeout(() => {
										setAlertErrorMessage(text);
									}, 2000)
								}
								transactionId={
									resTransaction?.id ?? ageDataInsurance?.transactionId
								}
								ageDataInsurance={ageDataInsurance}
								cancelPayment={() => {
									cancelTransaction(true);
								}}
							/>
						) : ageBodyModal == '24' ? (
							<BodyNotApplicable
								setShowModal={setShowModal}
								ageDataInsurance={ageDataInsurance}
								modalPaypal={() => paymentInit()}
							/>
						) : (
							<></>
						),
					height:
						numberInsuranceModal == 10
							? 420
							: numberInsuranceModal == 9 || numberInsuranceModal == 8
							? 380
							: ageBodyModal == '6' || ageBodyModal == '7' || ageBodyModal == '5'
							? 300
							: ageBodyModal == 'cancel'
							? 240
							: ageBodyModal == '1'
							? maxHeight
							: maxHeight - 100,
				});
			} else {
				setTimeout(() => {
					closeModal2();
					setShowBodyModal('0');
					setNumberInsuranceModal('0');
				}, 100);
			}
		},
		[ageBodyModal, numberInsuranceModal, ageDataInsurance, resTransaction],
	);

	return (
		<ScrollView>
			<View style={{ flex: 1, padding: 10, paddingTop: 40 }}>
				{isStatePayment ? (
					<StatePayment
						backMenu={() => setIsStatePayment(false)}
						status={statusValue}
						infoPaypal={infoPaypal}
						onPress={handlerTelevisit}
					/>
				) : (
					<Row style={{ flexDirection: 'column' }}>
						<Card
							icon={<Chat height={60} />}
							title={t('getCareNow.chat')}
							subtitle={t('getCareNow.descriptionChat')}
							onPress={navigateChat}
						/>
						<View style={{ marginVertical: 5 }} />
						<Card
							icon={<Video height={60} />}
							title={t('getCareNow.video')}
							subtitle={t('getCareNow.descriptionVideo')}
							onPress={getInsurence}
						/>
						<View style={{ marginVertical: 5 }} />
						{locationSelected != 'TN' ? (
							<Card
								icon={<Call height={60} />}
								title={t('getCareNow.call')}
								subtitle={t('getCareNow.descriptionCall')}
								onPress={handlerCall}
							/>
						) : (
							<></>
						)}
						<View style={{ marginVertical: 5, marginBottom: 60 }} />
					</Row>
				)}
			</View>
		</ScrollView>
	);
};
