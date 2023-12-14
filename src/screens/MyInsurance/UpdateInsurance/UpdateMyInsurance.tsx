//react
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';

//styles
import componentStyles from './UpdateMyInsurance.styles';
import useStyles from 'hooks/useStyles';
import Row from 'src/components/atoms/Row/Row';

//icons
import InfoSquare from 'icons/square-info2.svg';
import UserIcon from 'icons/user2.svg';
import Building from 'icons/BuildingState.svg';
import IconConfirm from '../../../../assets/icons/Confirm.svg';
import IconSucces from '../../../../assets/icons/Success.svg';
import IconClipBoard from '../../../../assets/icons/ClipBoardUser.svg';
import IconIdCard from '../../../../assets/icons/IdCard.svg';
//utils
import { useTranslation } from 'react-i18next';
import { patientRelationship } from 'domain/entities/tempFormUser';
import { yupResolver } from '@hookform/resolvers/yup';
//components
import Input from 'src/components/atoms/Input/Input';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import Button from 'src/components/atoms/Button/Button';

//types
import { IUpdateMyInsurance, ValidateMyInsurance } from './UpdateMyInsurance.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import EcwService from 'adapter/api/ecwService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import AuthService from 'adapter/api/authService';
import RegisterService from 'adapter/api/registerService';
import { AvailityCoverageInsurance, UpdateMyInsurace } from 'infrastructure/keraltyApi/models/auth';
import GeneralMessage from 'src/components/organisms/Message/GeneralMessage';
import { useNavigation } from '@react-navigation/native';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { extraScrollHeigth } from 'src/utils/devices';

import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import DatePicker2, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import moment, { Moment } from 'moment';
import FORMATS from 'ui-core/utils/formats';

export const UpdateMyInsurance = () => {
	const { t } = useTranslation();
	const { closeModal, setModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();
	const navigation: any = useNavigation();
	const extraScrollHeight = extraScrollHeigth();
	const { locationSelected, dataInformationInsurance } = useAppSelector(
		userSelectors.selectIsLoggedIn,
	);
	let isAvaility = false;
	const userInformation = useAppSelector(userSelectors.selectUser);
	const { styles } = useStyles(componentStyles);

	const { data } = EcwService.useFetchInsurancesStateQuery(userInformation.state);
	const [availityCoverage] = RegisterService.useAvailityCoverageInsuranceMutation();
	const [updateInsurance] = AuthService.useUpdateMyInsuranceMutation();
	const [editable, setEditable] = useState(true);

	const [showData, setShowData] = useState([
		{ id: 0, name: '', phone: '', state: '', planType: '' },
	]);

	useMemo(() => {
		setShowData(data);
	}, [data]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		clearErrors,
	} = useForm<IUpdateMyInsurance>({
		resolver: yupResolver(ValidateMyInsurance),
		mode: 'onBlur',
	});

	useEffect(() => {
		if (watch('insuranceName') === 'Self Pay') {
			setEditable(false);
			setValue(
				'relationshipId',
				patientRelationship.findIndex((e) => e === 'self') + 1 ?? '',
			);
			setValue('subscriberRelationship', 'Self');
			setValue('insuredFirstName', userInformation.firstName);
			setValue('insuredLastName', userInformation.lastName);
			setValue('memberId', '0');
			setValue('groupId', '0');

			clearErrors('insuredFirstName', '');
			clearErrors('insuredLastName', '');
			clearErrors('memberId', '');
			clearErrors('groupId', '');
			clearErrors('subscriberRelationship', '');
		} else {
			setEditable(true);
			setValue('insuredFirstName', '');
			setValue('subscriberRelationship', '');
			setValue('insuredLastName', '');
			setValue('memberId', '');
			setValue('groupId', '');
		}
	}, [watch('insuranceName')]);


	useEffect(() => {
		setValue('name_of_insuredH', '');
		setValue('lastname_of_insuredH', '');
		setValue('dateOfBirthH', '');

		clearErrors('name_of_insuredH', '');
		clearErrors('lastname_of_insuredH', '');
		clearErrors('dateOfBirthH', '');
	}, [watch('relationshipId')]);

	useMemo(() => {
		console.log('errors--', errors);
	}, [errors]);

	const onValidSubmit = useCallback(
		async (values: IUpdateMyInsurance) => {
			/* if (userInformation?.ecwId) { */
			values.patientId = userInformation?.ecwId ?? dataInformationInsurance?.patientId;
			values.isPrimary = dataInformationInsurance?.isPrimary;
			//const response = await availityCoverage(dataReq).unwrap();

			consultAvility(values);

			/* } else {
			setAlertErrorMessage(t(`errors.updateMyInsurance`))
			closeModal()
		} */
		},
		[userInformation, dataInformationInsurance],
	);

	const consultAvility = useCallback(
		async (data: IUpdateMyInsurance) => {
			const dataReq: AvailityCoverageInsurance = {
				insuredFirstName: data.insuredFirstName,
				insuredLastName: data.insuredLastName,
				firstName: data.insuredFirstName,
				lastName: data.insuredLastName,
				birthDate: userInformation.birthdate,
				memberId: data.memberId,
				groupId: data.groupId,
				authUid: userInformation.authUid,
				state: locationSelected ?? '',
				patientId: data.patientId,
				isPrimary: data.isPrimary,
				companyId: dataInformationInsurance?.insuranceId,
				insuranceName: data?.insuranceName,
				planType: data.planType,
				relationshipId: data.relationshipId,
				holderInsured: {
					name: data.name_of_insuredH ?? '',
					lastName: data.lastname_of_insuredH ?? '',
					dateOfBirth: data.dateOfBirthH
						? moment(data?.dateOfBirthH).format(FORMATS.date2)
						: '',
				},
			};

			try {
				const response: any = await availityCoverage(dataReq).unwrap();

				if (response) {
					isAvaility = false;
					updateMyInsurance(dataReq, true);
				} else if (response === false) {
					isAvaility = false;
					openModal(true, false, dataReq);
				} else {
					isAvaility = true;
					updateMyInsurance(dataReq, false);
					//openModal(false, false, data);
				}
			} catch (error) {
				if (error == '30') openModal(true, false, dataReq);
				else setAlertErrorMessage('Error: ' + error);
			}
		},
		[availityCoverage],
	);

	const updateMyInsurance = useCallback(
		async (data: unknown, isStateActive: boolean) => {
			try {
				const response: unknown = await updateInsurance({
					...(data as UpdateMyInsurace),
					state: locationSelected ?? '',
				}).unwrap();

				if (response) {
					openModal(false, isStateActive);
				}
			} catch (error) {
				navigation.navigate('MyInsurance');
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[updateInsurance],
	);

	const openModal = (isConfirm: boolean, isStateActive: boolean, data?: IUpdateMyInsurance) => {
		if (isConfirm) {
			setModal({
				render: () => (
					<GeneralMessage
						icon={<IconConfirm />}
						message={`${t('myInsurance.subtitleComfirm')}`}
						title1={`${t('myInsurance.buttonNo')}`}
						submit1={() => {
							closeModal(), navigation.navigate('MyInsurance');
						}}
						title2={`${t('myInsurance.buttonYes')}`}
						submit2={() => {
							updateMyInsurance(data as IUpdateMyInsurance, false);
							closeModal();
						}}
						title={`${t('myInsurance.titleConfirm')}`}
					/>
				),
				height: 350,
				blockModal: true,
			});
		} else {
			setModal({
				render: () => (
					<>
						<GeneralMessage
							icon={<IconSucces />}
							title={`${t('myInsurance.titleUpdate')}`}
							message={isStateActive ? `${t('myInsurance.subtitleUpdate')}` : ''}
							title1={`${t('myInsurance.buttonOk')}`}
							submit1={() => {
								closeModal(), navigation.navigate('MyInsurance');
							}}
							isConfirm
						/>
					</>
				),
				height: 350,
				blockModal: true,
			});
		}
	};

	return (
		<>
			{showData && (
				<KeyboardAwareScrollView
					enableAutomaticScroll
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					extraScrollHeight={extraScrollHeight}
					enableOnAndroid={true}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.dimensions}>
						<View style={styles.contentRow}>
							<InfoSquare />
							<Text style={styles.text} maxFontSizeMultiplier={1.3}>
								{t('myInsurance.info')}
							</Text>
						</View>
					</View>
					<InputSelect
						icon={<Building />}
						labelStyle={{
							marginTop: 10,
							fontFamily: 'proxima-bold',
							lineHeight: 19,
							color: '#055293',
						}}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.88 }}
						label={`${t('myInsurance.company')}*`}
						items={
							showData
								? showData.map((data) => {
										return {
											key: data.id ?? '',
											label: data.name ?? '',
											value: data.name ?? '',
											planType: data.planType ?? '',
										};
								  })
								: []
						}
						placeholder={t('myInsurance.company')}
						onChange={(v, i) => {
							const resp = showData?.find((data) => v == data.name);
							setValue('insuranceName', v);
							setValue('planType', resp?.planType ?? '');
							setValue('companyId', resp?.id ?? 0);
						}}
						name="insuranceName"
						error={errors.insuranceName}
					/>
					<Input
						setDisabled={editable}
						inputStyle={
							(!editable && { backgroundColor: '#e7e7e7' })
						}
						control={control}
						icon={<UserIcon />}
						placeholder={t('myInsurance.nameF')}
						name="insuredFirstName"
						error={errors.insuredFirstName}
						label={`${t('myInsurance.nameF')}*`}
					/>
					<Input
						setDisabled={editable}
						inputStyle={
							(!editable && { backgroundColor: '#e7e7e7' })
						}
						control={control}
						icon={<UserIcon />}
						placeholder={t('myInsurance.lastF')}
						name="insuredLastName"
						error={errors.insuredLastName}
						label={`${t('myInsurance.lastF')}*`}
					/>
					{editable && (
						<InputSelect
							disabled={!editable}
							icon={<IconIdCard />}
							style={{ width: Dimensions.get('window').width * 0.88 }}
							labelStyle={styles.label}
							label={`${t('myInsurance.relationShip')}*`}
							items={patientRelationship.map((patientRelationhip, index) => {
								return {
									key: index,
									label: t(
										`createAccount.patientRelationship.${patientRelationhip}`,
									),
									value: t(
										`createAccount.patientRelationship.${patientRelationhip}`,
									),
								};
							})}
							placeholder={t('myInsurance.placeRelation')}
							onChange={(v, i) => {
								setValue('relationshipId', i);
								setValue('subscriberRelationship', v);
							}}
							control={control}
							error={errors.subscriberRelationship}
							name={'subscriberRelationship'}
						/>
					)}

					{!editable && (
						<Input
							setDisabled={editable}
							icon={<IconIdCard />}
							label={`${t('patientRegistration.patient')}*`}
							labelStyle={styles.label}
							inputStyle={[
									!editable && { backgroundColor: '#e7e7e7' },
							]}
							control={control}
							placeholder={t('patientRegistration.self')}
							name={'self'}
						/>
					)}
					<Input
						setDisabled={editable}
						inputStyle={
							(!editable && { backgroundColor: '#e7e7e7' })
						}
						control={control}
						icon={<IconClipBoard />}
						placeholder={t('myInsurance.memberIdPlace')}
						name="memberId"
						error={errors.memberId}
						label={`${t('myInsurance.memberId')}*`}
					/>
					<Input
						setDisabled={editable}
						inputStyle={
							(!editable && { backgroundColor: '#e7e7e7' })
						}
						control={control}
						icon={<IconClipBoard />}
						placeholder={t('myInsurance.groupMemberPlace')}
						name="groupId"
						error={errors.groupId}
						label={t('myInsurance.groupMember')}
					/>

					{watch('relationshipId') !== 1 &&
						watch('relationshipId') !== 0 &&
						watch('relationshipId') !== undefined && (
							<>
								<DividerLine
									style={{
										width: Dimensions.get('window').width * 0.85,
										paddingTop: 25,
										marginBottom: 20,
									}}
								/>
								<Input
									inputStyle={{ width: Dimensions.get('window').width * 0.88 }}
									control={control}
									icon={<UserIcon />}
									placeholder={t(
										'patientRegistration.placeholders.firstNameHolderPlace',
									)}
									label={`${t('patientRegistration.firstNameHolder')}*`}
									name="name_of_insuredH"
									error={errors.name_of_insuredH}
								/>
								<Input
									inputStyle={{ width: Dimensions.get('window').width * 0.88 }}
									control={control}
									icon={<UserIcon />}
									placeholder={t(
										'patientRegistration.placeholders.lastNameHolderPlace',
									)}
									label={`${t('patientRegistration.lastNameHolder')}*`}
									name="lastname_of_insuredH"
									error={errors.lastname_of_insuredH}
								/>
								<DatePickerController
									control={control}
									name={'dateOfBirthH'}
									label={t('patientRegistration.dateBirthHolder')}
									labelStyle={styles.label}
									error={errors.dateOfBirthH}
									style={{ width: '88%' }}
									pikerStyle={{
										width: Dimensions.get('window').width * 0.88,
									}}
								/>
							</>
						)}

					<Row style={styles.buttonNext}>
						<Button
							title={t('myInsurance.bUpdate')}
							style={{ width: 200 }}
							onPress={handleSubmit(onValidSubmit)}
						/>
					</Row>
				</KeyboardAwareScrollView>
			)}
		</>
	);
};
