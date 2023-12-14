import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { UnblockAccountProps as Props } from './UnblockAccount.types';
import componentStyles from './UnblockAccount.styles';
//Components
import Row from 'src/components/atoms/Row/Row';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import UnblockAccountMedia from 'src/components/molecules/UnblockAccountMedia/UnblockAccountMedia';
import UnblockAccountPagination from 'src/components/molecules/UnblockAccountPagination/UnblockAccountPagination';
import { BottomDataType } from 'src/components/molecules/UnblockAccountPagination/UnblockAccountPagination.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import OkIcon from 'icons/OkIcon.svg';
import unblockService from 'adapter/api/unblockService';
import { getTimeCodeExpired, userUnblockAccount } from 'domain/entities/userUnblockAccount';
/* start
 * blocked account pages */
import PersonalInfoDataBA from './PersonalInfoDataBA/PersonalInfoDataBA';
import VerificationDataBA from './VerificationDataBA/VerificationDataBA';
import PasswordDataBA from './PasswordDataBA/PasswordDataBA';
import VerifyCode from './VerifyCode/VerifyCode';
/* end*/
import { FormValues } from '../ForgotPassword/ContactInfoData/ContactInfoData.types';
import IconWarning from 'icons/IconWarning.svg';
import { useAppDispatch } from 'adapter/hooks';
import verifyDomain from 'hooks/verifyDomain';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { validateNonRepeatingDomains } from 'ui-core/utils/validateNonRepeatingDomains';
/**
 * Render a UnblockAccount.
 * @since 1.0.0
 */
const UnblockAccount = (props: Props) => {
	const { style } = props;
	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { setAlertErrorMessage } = useErrorAlert();
	const [position, setPosition] = useState(0);
	const { reset, navigate } = useNavigation<any>();
	const [formValues, setFormValues] = useState<FormValues>({ email: '' });
	const [valueCode, setCode] = useState<any>();
	const [showError2, setError2] = useState(false);
	const [isSendEmail, setIsSendEmail] = useState(false);
	const bottomRef = React.createRef<FlatList>();
	const { closeModal, setModal } = useBottomSheet();
	const [getTime] = unblockService.useCodeTimeExpiredMutation();
	const [sendVal] = unblockService.useGetBelongIdStateMutation();
	const [getHasPreviousProc] = unblockService.useGetHasPreviousProcMutation();
	const titles = [
		t('unblockAccount.personalInfo2'),
		t('unblockAccount.verification'),
		t('unblockAccount.password'),
	];
	const {
		serverDate: startDateState,
		hourDifference,
		statusMaintenance,
		maintenanceData,
	} = useAppSelector(userSelectors.selectServerDate);

	const dispatch = useAppDispatch();
	const { requestVerifyDomain } = verifyDomain();
	const [emailValid, setEmailValid] = useState<boolean | null>(false);

	const openwarning = useCallback(() => {
		const message = maintenanceData?.message;
		const payload = maintenanceData?.payload;
		const dateInitET = getCustomDate({
			date: payload?.date_init ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.ET,
		});
		const dateEndET = getCustomDate({
			date: payload?.date_end ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.ET,
		});
		const dateInitCT = getCustomDate({
			date: payload?.date_init ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.CT,
		});
		const dateEndCT = getCustomDate({
			date: payload?.date_end ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.CT,
		});

		// const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${t('general.locale') === 'es' ? 'al' : 'to'} ${dateEndET.time} / ${dateEndCT.time}`;
		const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${
			t('general.locale') === 'es' ? 'al' : 'to'
		} ${dateEndET.date} ${dateEndET.time} / ${dateEndCT.time}`;

		if (maintenanceData && message) {
			const body = t('warningMessage.maintenance');
			if (body) {
				const textView = body.replace('[message]', textMessage);
				setModal({
					render: () => (
						<ModalWarning
							delateBtn
							isIconAlert
							styleTitle={{ color: '#055293', fontSize: 16 }}
							styleSubtitle={{ color: '#055293', fontSize: 14 }}
							onPress={() => {
								closeModal();
							}}
							title={textView}
							warningText={t('warningMessage.maintenanceSub')}
						/>
					),
					blockModal: true,
				});
			}
		}
	}, [startDateState, maintenanceData]);

	const resetLogin = () => {
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
		ref.current?.scrollToIndex({
			animated: true,
			index: position,
		});
	};

	const handleSupportChat = () => {
		navigate('ChatSanitas');
	};

	const handlerBack = () => {
		if (position == 0) {
			resetLogin();
		} else {
			const newPosition = position - 1;
			updateIndexScroll(bottomRef, newPosition);
			setPosition(newPosition);
			closeModal();
		}
	};

	const handlerBackEnd = () => {
		const newPosition = 1;
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
		closeModal();
	};

	const resetForm = useCallback(async () => {
		updateIndexScroll(bottomRef, 0);
		setPosition(0);
	}, [position, bottomRef]);

	const handlerNext = useCallback(
		async (item?: any) => {
			if (position == 0) {
				setFormValues(item);
				hendleGetIdBelongState(item);
			} else {
				statusMaintenance == 'in_maintenance' ? openwarning() : nextPage();
			}
		},
		[position, bottomRef],
	);


	const hendleGetIdBelongState = async (item: any) => {
		try {
			dispatch(loaderActions.setLoading(true));
			setEmailValid(false);
			const correctedMailDomain = validateNonRepeatingDomains(item?.email);

			if (!correctedMailDomain) {
				dispatch(loaderActions.setLoading(false));
				setEmailValid(null)
				return;
			}
			const email = item?.email;
			const notDomain = email.split('@')[1];
			const responseTwo = await requestVerifyDomain(notDomain);

			dispatch(loaderActions.setLoading(false));
			if (responseTwo.data) {
				setEmailValid(false);
				const newData: userUnblockAccount = {
					name: item.firstName,
					surname: item.lastName,
					email: item.email,
					mobile: item.mobile,
				};
				const resp = await sendVal(newData).unwrap();
				item.idBelongState = resp;

				hendleGetPreviousProccess(resp);
			} else {
				setEmailValid(true);
			}
		} catch (error) {
			dispatch(loaderActions.setLoading(false));
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	};

	const openModalWarning = (msj: string) => {
		setModal({
			render: () => (
				<ModalWarning
					icon={<IconWarning />}
					warningText={msj}
					onPress={() => {
						closeModal();
						resetLogin();
					}}
				/>
			),
			height: 320,
			blockModal: true,
		});
	};

	const hendleGetPreviousProccess = async (item: any) => {
		try {
			const r = await getHasPreviousProc(item).unwrap();

			if (r?.cause === 'VERIFIED') {
				let text = t(`unblockAccount.limitIncorrectCodeTwo`);
				text = text.replace('30', r?.timer);
				openModalWarning(text);
			} else if (r?.cause === 'SUCCESS') {
				AsyncStorage.removeItem('newData');
				if (Object.keys(item).length > 1) {
					setModal({
						render: () => (
							<ModalWarning
								isIconAlert
								warningText={t('unblockAccount.infoChangeWarning')}
								onPress={() => {
									closeModal(),
										statusMaintenance == 'in_maintenance'
											? openwarning()
											: nextPage();
								}}
							/>
						),
						height: 300,
						blockModal: true,
					});
				} else {
					statusMaintenance == 'in_maintenance' ? openwarning() : nextPage();
				}
			} else if (r?.cause == 'ATTEMPTS') {
				let text = t(`unblockAccount.limitIncorrectCodeThree`);
				text = text.replace('30', r?.timer);
				openModalWarning(text);
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	};

	const nextPage = () => {
		const newPosition = position + 1;
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};

	const bottomData: BottomDataType[] = [
		{
			id: 0,
			children: (
				<PersonalInfoDataBA
					handlerNext={(v: any) => {
						statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext(v);
					}}
					navigateSupportChat={handleSupportChat}
					emailValid={emailValid}
				/>
			),
		},
		{
			id: 1,
			children: (
				<VerificationDataBA
					onPress={() => {
						statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext();
					}}
					onPressClose={() => {
						resetLogin();
					}}
					formValues={formValues}
					navigateSupportChat={handleSupportChat}
				/>
			),
		},
		{
			id: 2,
			children: (
				<VerifyCode
					formValues={formValues}
					handlerBack={handlerBackEnd}
					onPressClose={() => {
						resetLogin();
					}}
					resetForm={resetForm}
					setCode={(v) => {
						setCode(v);
						statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext();
					}}
					idError={showError2 || isSendEmail}
					navigateSupportChat={handleSupportChat}
				/>
			),
		},
		{
			id: 3,
			children: (
				<PasswordDataBA
					formValues={formValues}
					valueCode={valueCode}
					handlerNext={
						statusMaintenance == 'in_maintenance'
							? () => openwarning()
							: () => {
									resetLogin();
							  }
					}
					navigateSupportChat={handleSupportChat}
				/>
			),
		},
	];

	return (
		<>
			<Row>
				<UnblockAccountMedia
					titles={titles}
					currentPosition={position == 2 ? 1 : position}
					handlerExit={() => resetLogin()}
				/>
			</Row>
			<Row width={2} style={styles.containerPagination}>
				<UnblockAccountPagination
					ref={bottomRef}
					bottomData={bottomData}
					currentPosition={position}
					handlerBack={
						statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerBack
					}
					handlerNext={
						statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerNext
					}
					positionRef={position}
				/>
			</Row>
		</>
	);
};

export default UnblockAccount;
