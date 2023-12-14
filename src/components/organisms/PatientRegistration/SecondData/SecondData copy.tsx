import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Input from 'src/components/atoms/Input/Input';
import Checkbox from 'src/components/atoms/Checkbox/Checkbox';
//Styles
import componentStyles from './SecondData.styles';
//Images
import IdCard from 'icons/IdCard.svg';
import User from 'icons/User.svg';
import Building from 'icons/Building.svg';
import { Dimensions } from 'react-native';
import Button from 'src/components/atoms/Button/Button';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import EcwService from 'adapter/api/ecwService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import { useForm } from 'react-hook-form';
import {
	SecondDataList,
	SecondDataProps,
	SecondDataInfo,
	SecondDataList2,
	SecondDataInfo2,
} from './SecondData.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientRelationship } from 'domain/entities/tempFormUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import RegisterService from 'adapter/api/registerService';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useNavigation } from '@react-navigation/native';
import DatePicker2, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import moment from 'moment';
const SecondData: React.FC<SecondDataProps> = (props) => {
	const { handlerNext, setSecondData } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [secundary, setSecundary] = useState(false);
	let [editable, setEditable] = useState(true);
	let [editable2, setEditable2] = useState(true);
	const { data } = EcwService.useFetchInsurancesQuery();
	const [showData, setShowData] = useState([
		{ id: 0, name: '', phone: '', state: '', planType: '' },
	]);
	const [timeTemps, setTimeTemps] = useState<any | undefined>();
	const [userTemp, setUserTemp] = useState<any>();
	const [registerConsentsTime] = RegisterService.useRegisterConsentsTimeMutation();
	const { setModal, closeModal } = useBottomSheet();
	const { reset } = useNavigation();
	const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation();
	const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);
	const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);
	
	const getItemInfo = async () => {
		const valuesMs = await AsyncStorage.getItem('resendsmsCode');
		setTimeTemps(JSON.parse(valuesMs ?? ''));
		const values: any = await AsyncStorage.getItem('loadUserInfoByCode');
		setUserTemp(JSON.parse(values ?? ''));
	};
	useMemo(() => {
		getItemInfo();
		setShowData(data);
	}, [data]);

	const {
		control: control1,
		handleSubmit: handleSubmit1,
		setValue: setValue1,
		clearErrors: clearErrors1,
		formState: { errors: errors1 },
		watch: watch1,
		register: register,
	} = useForm<SecondDataList>({
		resolver: yupResolver(SecondDataInfo),
		mode: 'onChange',
	});

	const {
		control: control2,
		handleSubmit: handleSubmit2,
		setValue: setValue2,
		clearErrors: clearErrors2,
		formState: { errors: errors2 },
		watch: watch2,
		getValues: getValues2,
	} = useForm<SecondDataList2>({
		resolver: yupResolver(SecondDataInfo2),
		mode: 'onChange',
	});

	useEffect(() => {
		if (watch1('insuranceCompany') === 'Self Pay') {
			setEditable(false);
			setValue1(
				'patient_relationship_to_insured',
				patientRelationship.findIndex((e) => e == 'self') + 1 ?? '',
			);
			setValue1('name_of_insured', userTemp?.patientInformation?.firstName);
			setValue1('lastname_of_insured', userTemp?.patientInformation?.lastName);
			setValue1('subscriber_id', '0');
			setValue1('group_id', '0');
			setValue2(
				'patient_relationship_to_insured',
				patientRelationship.findIndex((e) => e == 'self') + 1 ?? '',
			);
			setValue2('name_of_insured', userTemp?.patientInformation?.firstName);
			setValue2('lastname_of_insured', userTemp?.patientInformation?.lastName);
			setValue2('subscriber_id', '0');
			setValue2('group_id', '0');
		} else {
			setEditable(true);
			setValue1('name_of_insured', '');
			setValue1('lastname_of_insured', '');
			setValue1('subscriber_id', '');
			setValue1('group_id', '');
			setValue2('name_of_insured', '');
			setValue2('lastname_of_insured', '');
			setValue2('subscriber_id', '');
			setValue2('group_id', '');
		}
	}, [watch1('insuranceCompany')]);

	useEffect(() => {
		setValue1('name_of_insuredH', '');
		setValue1('lastname_of_insuredH', '');
		setValue1('dateOfBirthH', '');

		clearErrors1('name_of_insuredH', '');
		clearErrors1('lastname_of_insuredH', '');
		clearErrors1('dateOfBirthH', '');

		setValue2('name_of_insuredH', '');
		setValue2('lastname_of_insuredH', '');
		setValue2('dateOfBirthH', '');

		clearErrors2('name_of_insuredH', '');
		clearErrors2('lastname_of_insuredH', '');
		clearErrors2('dateOfBirthH', '');
	}, [watch1('patient_relationship_to_insured'), watch2('patient_relationship_to_insured')]);

	useEffect(() => {
		setValue2('name_of_insuredH2', '');
		setValue2('lastname_of_insuredH2', '');
		setValue2('dateOfBirthH2', '');
		clearErrors2('name_of_insuredH2', '');
		clearErrors2('lastname_of_insuredH2', '');
		clearErrors2('dateOfBirthH2', '');
	}, [watch2('patient_relationship_to_insured2'), watch2('patient_relationship_to_insured2')]);

	const validateInsurance2 = () => {
		if (getValues2('insuranceCompany2') == 'Self Pay') {
			setEditable2(false);
			setEditable2(false);
			setValue2(
				'patient_relationship_to_insured2',
				patientRelationship.findIndex((e) => e == 'self') + 1 ?? '',
			);
			setValue2('name_of_insured2', userTemp.patientInformation.firstName);
			setValue2('lastname_of_insured2', userTemp.patientInformation.lastName);
			setValue2('subscriber_id2', '0');
			setValue2('group_id2', '0');
		} else {
			setEditable2(true);
			setValue2('name_of_insured2', '');
			setValue2('lastname_of_insured2', '');
			setValue2('subscriber_id2', '');
			setValue2('group_id2', '');
		}
	};

	const resetLogin = () => {
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	const handlerSubmit = async (values: any) => {
		try {
			let info = {
				tempSessionId: tempSessionId,
				state: timeTemps.state,
			};
			const response = editAccountdata?.isNewVersion ? true : await verifyPartialRegister(info).unwrap();
			if (response === true) {
				let state = timeTemps.state;
				let id = timeTemps.id == '' ? userTemp.id : timeTemps.id;
				let isFBMax = timeTemps.isFBMax;
				const timeConsents = editAccountdata?.isNewVersion ? 'SUCCESS' : await registerConsentsTime({ state, id, isFBMax }).unwrap();
				if (timeConsents !== 'SUCCESS') {
					throw new Error('Expirado');
				} else {
					handlerNext();
					setSecondData(values);
				}
			} else {
				setModal({
					render: () => (
						<ModalWarning
							isIconAlert
							warningText={t('errors.code998')}
							onPress={() => {
								closeModal(), resetLogin();
							}}
						/>
					),
					height: 280,
					blockModal: true,
				});
			}
		} catch (err) {
			if (err == 100) {
				setModal({
					render: () => (
						<ModalWarning
							isIconAlert
							warningText={t(`patientRegistration.code80`)}
							textButton={t('patientRegistration.btnTextModal')}
							onPress={() => {
								closeModal(), resetLogin();
							}}
						/>
					),
					height: 280,
					blockModal: true,
				});
			}
		}
	};
	const changeSecundary = () => {
		setSecundary(!secundary);
		setEditable2(true);
		setValue2('name_of_insured2', '');
		setValue2('lastname_of_insured2', '');
		setValue2('subscriber_id2', '');
		setValue2('group_id2', '');

		clearErrors2('insuranceCompany2', '');
		clearErrors2('name_of_insured2', '');
		clearErrors2('lastname_of_insured2', '');
		clearErrors2('subscriber_id2', '');
		clearErrors2('group_id2', '');
		clearErrors2('patient_relationship_to_insured2', '');
	};

	useEffect(() => {
		if (!secundary) {
			setValue2('insuranceCompany2', '');
			setValue2('companyId2', '');
			setValue2('patient_relationship_to_insured2', '');
			clearErrors1('dateOfBirthH', '');
			clearErrors2('dateOfBirthH', '');
		} else {
			clearErrors1('dateOfBirthH', '');
			clearErrors2('dateOfBirthH', '');
		}
	}, [secundary, watch1('dateOfBirthH'), watch2('dateOfBirthH')]);

	useEffect(() => {
		setValue1('dateOfBirthH', watch1('dateOfBirthH'));
	}, [watch1('dateOfBirthH')]);

	useEffect(() => {
		setValue2('dateOfBirthH', watch2('dateOfBirthH'));
	}, [watch2('dateOfBirthH')]);


	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					width: Dimensions.get('window').width * 0.85,
					paddingTop: 10,
				}}
			>
				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('patientRegistration.tittle')}
				</Text>
			</View>
			<View>
				<InputSelect
					icon={<Building />}
					labelStyle={styles.label}
					control={!secundary ? control1 : control2}
					style={{ width: Dimensions.get('window').width * 0.85, marginBottom: -15 }}
					label={`${t('patientRegistration.insurance')}*`}
					items={
						showData
							? showData.map((data) => {
									return {
										key: data.id ?? '',
										label: data.name ?? '',
										value: data.id ?? '',
									};
							  })
							: []
					}
					placeholder={t('patientRegistration.insurance')}
					onChange={(v) => {
						setValue1('insuranceCompanyTemp', v);
						setValue2('insuranceCompanyTemp', v);
						const changeV = showData?.find((data) => data.id == v);

						setValue1('insuranceCompany', changeV?.name ?? '');
						setValue2('insuranceCompany', changeV?.name ?? '');
						setValue1('planType', changeV?.planType ?? '');
						setValue2('planType', changeV?.planType ?? '');
						setValue1('companyId', v);
						setValue2('companyId', v);
					}}
					name="insuranceCompanyTemp"
					error={!secundary ? errors1.insuranceCompanyTemp : errors2.insuranceCompanyTemp}
				/>
				<Input
					control={
						!secundary
							? control1._defaultValues.name_of_insured
							: control2._defaultValues.name_of_insured
					}
					editable={editable}
					icon={<User />}
					labelStyle={styles.label}
					inputStyle={[
						{ width: Dimensions.get('window').width * 0.85 },
						!editable && { backgroundColor: '#e7e7e7' },
					]}
					placeholder={t('patientRegistration.name')}
					label={`${t('patientRegistration.name')}*`}
					onChangeText={(v) => {
						setValue2('name_of_insured', v);
						setValue1('name_of_insured', v);
						if (v.length > 0) {
							clearErrors1('name_of_insured');
							clearErrors2('name_of_insured');
						}
					}}
					// control={!secundary ? control1 : control2}
					error={!secundary ? errors1.name_of_insured : errors2.name_of_insured}
					name="name_of_insured"
					value={watch1('name_of_insured')}
				/>
				<Input
					editable={editable}
					icon={<User />}
					labelStyle={styles.label}
					inputStyle={[
						{ width: Dimensions.get('window').width * 0.85 },
						!editable && { backgroundColor: '#e7e7e7' },
					]}
					placeholder={t('patientRegistration.lastnamein')}
					label={`${t('patientRegistration.lastnamein')}*`}
					onChangeText={(v) => {
						setValue2('lastname_of_insured', v);
						setValue1('lastname_of_insured', v);
						if (v.length > 0) {
							clearErrors1('lastname_of_insured');
							clearErrors2('lastname_of_insured');
						}
					}}
					// control={!secundary ? control1 : control2}
					error={!secundary ? errors1.lastname_of_insured : errors2.lastname_of_insured}
					name="lastname_of_insured"
					value={watch1('lastname_of_insured')}
				/>
				{editable && (
					<InputSelect
						disabled={!editable}
						icon={<User />}
						style={{ width: Dimensions.get('window').width * 0.85, marginBottom: -15 }}
						labelStyle={styles.label}
						label={`${t('patientRegistration.patient')}*`}
						items={patientRelationship.map((patientRelationhip, index) => {
							return {
								key: index,
								label: t(`createAccount.patientRelationship.${patientRelationhip}`),
								value: t(`createAccount.patientRelationship.${patientRelationhip}`),
							};
						})}
						placeholder={t('patientRegistration.patient')}
						onChange={(v) => {
							setValue1(
								'patient_relationship_to_insured',
								patientRelationship.findIndex(
									(e) =>
										t(`createAccount.patientRelationship.${e}`).toLowerCase() ==
										v.toLowerCase(),
								) + 1 ?? '',
							);
							setValue2(
								'patient_relationship_to_insured',
								patientRelationship.findIndex(
									(e) =>
										t(`createAccount.patientRelationship.${e}`).toLowerCase() ==
										v.toLowerCase(),
								) + 1 ?? '',
							);
						}}
						control={!secundary ? control1 : control2}
						error={
							!secundary
								? errors1.patient_relationship_to_insured
								: errors2.patient_relationship_to_insured
						}
						name={'patient_relationship_to_insured'}
					/>
				)}
				{!editable && (
					<Input
						editable={editable}
						icon={<IdCard />}
						label={t('patientRegistration.patient')}
						labelStyle={styles.label}
						inputStyle={[
							{ width: Dimensions.get('window').width * 0.85 },
							!editable && { backgroundColor: '#e7e7e7' },
						]}
						placeholder={t('patientRegistration.self')}
						name={'self'}
					/>
				)}
				<Input
					editable={editable}
					icon={<IdCard />}
					labelStyle={styles.label}
					inputStyle={[
						{ width: Dimensions.get('window').width * 0.85 },
						!editable && { backgroundColor: '#e7e7e7' },
					]}
					placeholder={t('patientRegistration.subscriber')}
					label={`${t('patientRegistration.subscriber')}*`}
					// control={!secundary ? control1 : control2}
					onChangeText={(v) => {
						setValue2('subscriber_id', v);
						setValue1('subscriber_id', v);
						if (v.length > 0) {
							clearErrors1('subscriber_id');
							clearErrors2('subscriber_id');
						}
					}}
					error={!secundary ? errors1.subscriber_id : errors2.subscriber_id}
					name={'subscriber_id'}
					value={watch1('subscriber_id')}
				/>
				<Input
					editable={editable}
					icon={<IdCard />}
					labelStyle={styles.label}
					inputStyle={[
						{ width: Dimensions.get('window').width * 0.85 },
						!editable && { backgroundColor: '#e7e7e7' },
					]}
					placeholder={t('patientRegistration.group')}
					label={t('patientRegistration.group')}
					onChangeText={(v) => {
						setValue2('group_id', v);
						setValue1('group_id', v);
						if (v.length > 0) {
							clearErrors1('group_id');
							clearErrors2('group_id');
						}
					}}
					// control={!secundary ? control1 : control2}
					error={!secundary ? errors1.group_id : errors2.group_id}
					name={'group_id'}
					value={watch1('group_id')}
				/>
				{watch1('patient_relationship_to_insured') !== 1 &&
					watch1('patient_relationship_to_insured') !== undefined && (
						<>
							<DividerLine
								style={{
									width: Dimensions.get('window').width * 0.85,
									paddingTop: 25,
									marginBottom: 20,
								}}
							/>
							<Input
								control={
									!secundary
										? control1._defaultValues.name_of_insuredH
										: control2._defaultValues.name_of_insuredH
								}
								editable={editable}
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={[
									{ width: Dimensions.get('window').width * 0.85 },
									!editable && { backgroundColor: '#e7e7e7' },
								]}
								placeholder={t('patientRegistration.placeholders.firstNameHolderPlace')}
								label={`${t('patientRegistration.firstNameHolder')}*`}
								onChangeText={(v) => {
									setValue2('name_of_insuredH', v);
									setValue1('name_of_insuredH', v);
									if (v.length > 0) {
										clearErrors1('name_of_insuredH');
										clearErrors2('name_of_insuredH');
									}
								}}
								// control={!secundary ? control1 : control2}
								error={
									!secundary ? errors1.name_of_insuredH : errors2.name_of_insuredH
								}
								name="name_of_insuredH"
								value={watch1('name_of_insuredH')}
							/>
							<Input
								editable={editable}
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={[
									{ width: Dimensions.get('window').width * 0.85 },
									!editable && { backgroundColor: '#e7e7e7' },
								]}
								placeholder={t('patientRegistration.placeholders.lastNameHolderPlace')}
								label={`${t('patientRegistration.lastNameHolder')}*`}
								onChangeText={(v) => {
									setValue2('lastname_of_insuredH', v);
									setValue1('lastname_of_insuredH', v);
									if (v.length > 0) {
										clearErrors1('lastname_of_insuredH');
										clearErrors2('lastname_of_insuredH');
									}
								}}
								// control={!secundary ? control1 : control2}
								error={
									!secundary
										? errors1.lastname_of_insuredH
										: errors2.lastname_of_insuredH
								}
								name="lastname_of_insuredH"
								value={watch1('lastname_of_insuredH')}
							/>
							{editable && (
								<DatePickerController
									control={!secundary ? control1 : control2}
									name={'dateOfBirthH'}
									label={t('patientRegistration.dateBirthHolder')}
									labelStyle={styles.label}
									error={!secundary ? errors1.dateOfBirthH : errors2.dateOfBirthH}
									style={{ width: '85%' }}
									pikerStyle={{
										width: Dimensions.get('window').width * 0.85,
									}}
								/>
							)}
						</>
					)}

				<DividerLine
					style={{ width: Dimensions.get('window').width * 0.85, paddingTop: 25 }}
				/>
				<View
					style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.85 }}
				>
					<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
						{t('patientRegistration.secundary')}
					</Text>
					<Text style={styles.optional} maxFontSizeMultiplier={1.3}>
						{t('patientRegistration.optional')}
					</Text>
				</View>
				<View
					style={{
						width: '85%',
						alignItems: 'flex-start',
						paddingBottom: 25,
						paddingTop: 5,
					}}
				>
					<Checkbox
						style={{ marginRight: 16 }}
						text={t('patientRegistration.i')}
						onPress={changeSecundary}
						value={secundary}
						colorCheckbox={'#3CA70D'}
					/>
				</View>
				{secundary ? (
					<>
						<InputSelect
							icon={<Building />}
							labelStyle={styles.label}
							control={control2}
							style={{
								width: Dimensions.get('window').width * 0.85,
								marginBottom: -15,
							}}
							label={`${t('patientRegistration.insurance')}*`}
							items={
								showData
									? showData.map((data) => {
											return {
												key: data.id ?? '',
												label: data.name ?? '',
												value: data.id ?? '',
											};
									  })
									: []
							}
							placeholder={t('patientRegistration.insurance')}
							onChange={(v) => {
								setValue2('insuranceCompanyTemp2', v);

								const changeV = showData?.find((data) => data.id == v);
								setValue2('insuranceCompany2', changeV?.name ?? '');
								setValue2('planType2', changeV?.planType ?? '');
								setValue2('companyId2', v);
								validateInsurance2();
							}}
							name="insuranceCompanyTemp2"
							error={errors2.insuranceCompany2}
						/>
						<Input
							editable={editable2}
							icon={<User />}
							labelStyle={styles.label}
							inputStyle={[
								{ width: Dimensions.get('window').width * 0.85 },
								!editable2 && { backgroundColor: '#e7e7e7' },
							]}
							placeholder={t('patientRegistration.name')}
							label={`${t('patientRegistration.name')}*`}
							control={control2}
							error={errors2.name_of_insured2}
							name={'name_of_insured2'}
							value={watch2('name_of_insured2')}
						/>
						<Input
							editable={editable2}
							icon={<User />}
							labelStyle={styles.label}
							inputStyle={[
								{ width: Dimensions.get('window').width * 0.85 },
								!editable2 && { backgroundColor: '#e7e7e7' },
							]}
							placeholder={t('patientRegistration.lastnamein')}
							label={`${t('patientRegistration.lastnamein')}*`}
							control={control2}
							error={errors2.lastname_of_insured2}
							name={'lastname_of_insured2'}
						/>

						{editable2 && (
							<InputSelect
								icon={<User />}
								style={{
									width: Dimensions.get('window').width * 0.85,
									marginBottom: -15,
								}}
								labelStyle={styles.label}
								label={`${t('patientRegistration.patient')}*`}
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
								placeholder={t('patientRegistration.patient')}
								onChange={(v) => {
									setValue2(
										'patient_relationship_to_insured2',
										patientRelationship.findIndex(
											(e) =>
												t(
													`createAccount.patientRelationship.${e}`,
												).toLowerCase() == v.toLowerCase(),
										) + 1 ?? '',
									);
								}}
								control={control2}
								error={errors2.patient_relationship_to_insured2}
								name={'patient_relationship_to_insured2'}
							/>
						)}
						{!editable2 && (
							<Input
								editable={editable2}
								icon={<IdCard />}
								label={t('patientRegistration.patient')}
								labelStyle={styles.label}
								inputStyle={[
									{ width: Dimensions.get('window').width * 0.85 },
									!editable2 && { backgroundColor: '#e7e7e7' },
								]}
								placeholder={t('patientRegistration.self')}
								name={'self2'}
							/>
						)}
						<Input
							editable={editable2}
							icon={<IdCard />}
							labelStyle={styles.label}
							inputStyle={[
								{ width: Dimensions.get('window').width * 0.85 },
								!editable2 && { backgroundColor: '#e7e7e7' },
							]}
							placeholder={t('patientRegistration.subscriber')}s
							label={`${t('patientRegistration.subscriber')}*`}
							control={control2}
							error={errors2.subscriber_id2}
							name={'subscriber_id2'}
						/>
						<Input
							editable={editable2}
							icon={<IdCard />}
							labelStyle={styles.label}
							inputStyle={[
								{ width: Dimensions.get('window').width * 0.85 },
								!editable2 && { backgroundColor: '#e7e7e7' },
							]}
							placeholder={t('patientRegistration.group')}
							label={t('patientRegistration.group')}
							control={control2}
							error={errors2.group_id2}
							name={'group_id2'}
						/>

						{watch2('patient_relationship_to_insured2') !== 1 &&
							watch2('patient_relationship_to_insured2') !== '' && (
								<View style={{ marginBottom: 25 }}>
									<DividerLine
										style={{
											width: Dimensions.get('window').width * 0.85,
											paddingTop: 25,
											marginBottom: 20,
										}}
									/>
									<Input
										editable={editable2}
										icon={<User />}
										labelStyle={styles.label}
										inputStyle={[
											{ width: Dimensions.get('window').width * 0.85 },
											!editable2 && { backgroundColor: '#e7e7e7' },
										]}
										placeholder={t(
											'patientRegistration.placeholders.firstNameHolderPlace',
										)}
										label={`${t('patientRegistration.firstNameHolder')}*`}
										control={control2}
										error={errors2.name_of_insuredH2}
										name={'name_of_insuredH2'}
										value={watch2('name_of_insuredH2')}
									/>
									<Input
										editable={editable2}
										icon={<User />}
										labelStyle={styles.label}
										inputStyle={[
											{ width: Dimensions.get('window').width * 0.85 },
											!editable2 && { backgroundColor: '#e7e7e7' },
										]}
										placeholder={t(
											'patientRegistration.placeholders.lastNameHolderPlace',
										)}
										label={`${t('patientRegistration.lastNameHolder')}*`}
										control={control2}
										error={errors2.lastname_of_insuredH2}
										name={'lastname_of_insuredH2'}
									/>

									<DatePickerController
										control={control2}
										name={'dateOfBirthH2'}
										label={t('patientRegistration.dateBirthHolder')}
										labelStyle={styles.label}
										error={errors2.dateOfBirthH2}
										style={{ width: '85%' }}
										pikerStyle={{
											width: Dimensions.get('window').width * 0.85,
										}}
									/>
								</View>
							)}
					</>
				) : (
					<></>
				)}
				<Button
					style={{ marginVertical: 10 }}
					onPress={
						!secundary ? handleSubmit1(handlerSubmit) : handleSubmit2(handlerSubmit)
					}
					title={t('patientRegistration.button')}
				/>
			</View>
		</View>
	);
};

export default SecondData;
