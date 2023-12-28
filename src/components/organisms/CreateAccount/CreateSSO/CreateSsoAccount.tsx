import React, { useCallback, useEffect, useState } from 'react';
import { ValidateAccountDTO } from 'infrastructure/keraltyApi/models/auth';
import { useTranslation } from 'react-i18next';
//Navigation
import { CommonActions, useNavigation } from '@react-navigation/native';
//Components
import CreateAccountMedia from 'src/components/molecules/CreateAccountMedia/CreateAccountMedia';
import CreateAccountPagination from 'src/components/molecules/CreateAccountPagination/CreateAccountPagination';
import HadSanitasStep from '../../Registration/HadSanitasStep/HadSanitasStep';
import AccountInformation from '../../Registration/AccountInformation/AccountInformation';
import ContactSecurity from '../../Registration/ContactSecurity/ContactSecurity';
import AccountVerification from '../../Registration/AccountVerification/AccountVerification';
import VerifyMessage from '../../Registration/VerifyMessage/VerifyMessage';
//Styles and Types
import useStyles from 'hooks/useStyles';
import AccountType from '../../Registration/AccountType/AccountType';
import { CreateAccountProps } from '.././CreateAccount.types';
import componentStyles from '.././CreateAccount.styles';
import Row from 'src/components/atoms/Row/Row';
import { DataType } from 'src/components/molecules/CreateAccountPagination/CreateAccountPagination.types';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useRoute } from '@react-navigation/native';
import ContactSecuritySSO from './ContactSecuritySSO';
import CreateAccountPaginationSSO from '../../../molecules/CreateAccountPagination/CreateAccountPaginationSSO';
import RegisterService from 'adapter/api/registerService';

/**
 * Render a CreateSsoAccount.
 * @since 2.0.0
 */
const CreateSsoAccount: React.FC<CreateAccountProps> = (props) => {
	const {} = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const route = useRoute();
	const params: any = route?.params || {};

	const [position, setPosition] = useState(0);
	const [titles, setTitles] = useState([
		t('createAccount.progressBtnTitles.contactSecurity'),
		t('createAccount.progressBtnTitles.verification'),
	]);
	const [isInfo, setIsInfo] = useState(false);
	const [userData, setUserData] = useState({});
	const [userState, setState] = useState<any>('');
	const [elegibilityData, setElegibilityData] = useState<Object | undefined>();
	const [userSecurity, setUserSecurity] = useState({});
	const [accountInfo, setAccountInfo] = useState<ValidateAccountDTO>({
		accountNumber: '',
		dateOfBirth: '',
		isFBMax: false,
		id: '',
	});
	const navigation = useNavigation();
	const [resetForms, setResetForms] = useState(new Date());
	const {
		serverDate: startDateState,
		hourDifference,
		statusMaintenance,
		maintenanceData,
	} = useAppSelector(userSelectors.selectServerDate);
	const { closeModal, setModal } = useBottomSheet();
	const [loadMaxUserInfoSSO] = RegisterService.useLazyLoadMaxUserInfoSSOQuery();

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

		const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${
			t('general.locale') === 'es' ? 'al' : 'to'
		} ${dateEndET.time} / ${dateEndCT.time}`;
		const privateTextMessage = `${dateEndET.time} - ${dateEndCT.time}`;

		if (maintenanceData && message) {
			const body = t('warningMessage.maintenance');
			if (body) {
				const textView = body.replace('[message]', privateTextMessage);
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

	let newPosition: number = 0;
	// receiveService
	const [receiveService, setReceiveService] = useState(2);

	const [optionNumber, setOptionNumber] = useState(1);

	const titlesA = [
		t('createAccount.progressBtnTitles.contactSecurity'),
		t('createAccount.progressBtnTitles.verification'),
	];
	const titlesB = [
		t('createAccount.progressBtnTitles.contactInfo'),
		t('createAccount.progressBtnTitles.verification'),
	];
	const titlesC = [
		t('createAccount.progressBtnTitles.contactInfo'),
		t('createAccount.progressBtnTitles.verification'),
	];
	const handlerNext = async (num?: number) => {
		if (position == data.length - 1) {
			// navigate('PatientRegistration')
		} else {
			if (receiveService == 1 && !num && !position) {
				newPosition = 2;
			} else {
				newPosition = num ? num : position + 1;
			}

			setPosition(newPosition);
			setTitles(
				receiveService == 1 && optionNumber == 1 && newPosition != 1
					? titlesA
					: receiveService == 1 && optionNumber == 2 && newPosition != 1
					? titlesB
					: receiveService == 2
					? titlesC
					: [t('createAccount.progressBtnTitles.medicalServices')],
			);
		}
	};

	useEffect(() => {
		if (params && params.sso) {
			const { state, accountNumber, dateOfBirth, tempUser } = params.sso;
			setState(state);
			setAccountInfo({
				accountNumber,
				dateOfBirth,
				isFBMax: false,
				id: tempUser,
			});

			//Cargamos la info del usuario si viene del sso
			loadUserInfoWithSSO(tempUser);
		}
	}, []);

	const resetForm = async () => {
		setResetForms(new Date());
		navigation.dispatch(
			CommonActions.navigate({
				name: 'Login',
			}),
		);
	};

	const loadUserInfoWithSSO = async (tempUser: string) => {
		//Cargar la info del usuario solo por sso
		if (tempUser) {
			const response = await loadMaxUserInfoSSO(tempUser).unwrap();
			setElegibilityData(response);
		}
	};

	let data: DataType[] = [
		{
			id: 3,
			children: (
				<ContactSecuritySSO
					openwarning={openwarning}
					statusMaintenance={statusMaintenance}
					resetForm={resetForms}
					accountInfo={accountInfo}
					elegibilityData={elegibilityData}
					values={{
						hadSanitas: receiveService,
						type: optionNumber,
					}}
					handleNext={(v: any, num: any) => {
						if (statusMaintenance == 'in_maintenance') {
							openwarning();
						} else {
							setUserSecurity(v);
							handlerNext(1);
						}
					}}
				/>
			),
		},
		{
			id: 4,
			children: (
				<AccountVerification
					resetForm={resetForms}
					actionResetForm={() => resetForm()}
					optionNumber={optionNumber}
					receiveService={receiveService}
					verifyMessage={
						statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerNext
					}
					data={{ userSecurity, userData, userState }}
					values={{ accountInfo }}
				/>
			),
		},
		{
			id: 5,
			children: (
				<VerifyMessage
					openwarning={openwarning}
					statusMaintenance={statusMaintenance}
					handlerBack={
						statusMaintenance == 'in_maintenance'
							? () => openwarning()
							: () => {
									handlerBack();
							  }
					}
					resetForm={() => resetForm()}
					data={{ userState }}
				/>
			),
		},
	];

	const handlerBack = () => {
		if (position == 0) {
			navigation.dispatch(
				CommonActions.navigate({
					name: 'Login',
				}),
			);
		} else {
			if (receiveService == 1 && position == 2) newPosition = 0;
			else newPosition = position - 1;
			setPosition(newPosition);
			setTitles(
				receiveService == 1 && optionNumber == 1 && newPosition != 1
					? titlesA
					: receiveService == 1 && optionNumber == 2 && newPosition != 1
					? titlesB
					: receiveService == 2
					? titlesC
					: [t('createAccount.progressBtnTitles.medicalServices')],
			);
			newPosition == 2 ? setIsInfo(true) : setIsInfo(false);
		}
	};

	return (
		<>
			<Row>
				<CreateAccountMedia
					titles={titles}
					currentPosition={
						receiveService == 1 && newPosition == 0
							? position - 1 < 1
								? 0
								: position - 1
							: position
					}
					handlerExit={() => {
						navigation.dispatch({
							type: 'RESET',
							payload: {
								routes: [{ name: 'Login' }],
								index: 0,
							},
						});
					}}
				/>
			</Row>
			<Row width={2} style={styles.containerPagination}>
				<CreateAccountPaginationSSO
					values={{
						hadSanitas: receiveService,
						type: optionNumber,
					}}
					positionRef={position}
					bottomData={data}
					currentPosition={position}
					handlerBack={
						statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerBack
					}
					handlerNext={
						statusMaintenance == 'in_maintenance'
							? () => openwarning()
							: () => handlerNext(undefined)
					}
					isInfo={isInfo}
				/>
			</Row>
		</>
	);
};

export default CreateSsoAccount;
