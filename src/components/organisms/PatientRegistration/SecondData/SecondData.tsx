import React, { useState, useEffect, useRef } from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { patientRelationship } from 'domain/entities/tempFormUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import RegisterService from 'adapter/api/registerService';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useNavigation } from '@react-navigation/native';
import DatePicker2, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import { InsuranceInfoSchema, SecondDataProps } from 'ui-core/schemas/insuranceInfo';
import { PatientInsuranceInfo } from 'domain/entities/patientInsuranceInfo';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import InfoSquare from 'icons/InfoSquare.svg';


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
	const formRef = useRef(null);
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
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		clearErrors,
		reset: resetear,
		setError,
	} = useForm<PatientInsuranceInfo>({
		resolver: yupResolver(InsuranceInfoSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		if (watch('insuranceCompany') === 'Self Pay') {
			setEditable(false);
			setValue(
				'patient_relationship_to_insured',
				patientRelationship.findIndex((e) => e == 'self') + 1 ?? '',
			);
			setValue('name_of_insured', userTemp?.patientInformation?.firstName);
			setValue('lastname_of_insured', userTemp?.patientInformation?.lastName);
			setValue('subscriber_id', '0');
			setValue('group_id', '0');

			clearErrors('name_of_insured', '');
			clearErrors('lastname_of_insured', '');
			clearErrors('subscriber_id', '');
			clearErrors('group_id', '');
		} else {
			setEditable(true);
			setValue('name_of_insured', '');
			setValue('lastname_of_insured', '');
			setValue('subscriber_id', '');
			setValue('group_id', '');
		}
	}, [watch('insuranceCompany')]);

	useEffect(() => {
		setValue('name_of_insuredH', '');
		setValue('lastname_of_insuredH', '');
		setValue('dateOfBirthH', '');

		clearErrors('name_of_insuredH', '');
		clearErrors('lastname_of_insuredH', '');
		clearErrors('dateOfBirthH', '');
	}, [watch('patient_relationship_to_insured')]);

	useEffect(() => {
		setValue('name_of_insuredH2', '');
		setValue('lastname_of_insuredH2', '');
		setValue('dateOfBirthH2', '');
		clearErrors('name_of_insuredH2', '');
		clearErrors('lastname_of_insuredH2', '');
		clearErrors('dateOfBirthH2', '');
	}, [watch('patient_relationship_to_insured2')]);

	const validateInsurance2 = () => {
		if (watch('insuranceCompany2') === 'Self Pay') {
			setEditable2(false);
			setValue(
				'patient_relationship_to_insured2',
				patientRelationship.findIndex((e) => e == 'self') + 1 ?? '',
			);
			setValue('name_of_insured2', userTemp.patientInformation.firstName);
			setValue('lastname_of_insured2', userTemp.patientInformation.lastName);
			setValue('subscriber_id2', '0');
			setValue('group_id2', '0');

			clearErrors('name_of_insured2', '');
			clearErrors('lastname_of_insured2', '');
			clearErrors('subscriber_id2', '');
			clearErrors('group_id2', '');
		} else {
			setEditable2(true);
			setValue('name_of_insured2', '');
			setValue('lastname_of_insured2', '');
			setValue('subscriber_id2', '');
			setValue('group_id2', '');
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
		setValue('is2ndInsurance', !secundary);

		setEditable2(true);

		setValue('insuranceCompany2', '');
		setValue('insuranceCompanyTemp2', '');
		setValue('companyId2', undefined);
		setValue('name_of_insured2', '');
		setValue('lastname_of_insured2', '');
		setValue('patient_relationship_to_insured2', undefined);
		setValue('subscriber_id2', '');
		setValue('group_id2', '');
		setValue('planType2', '');

		clearErrors('insuranceCompany2', '');
		clearErrors('insuranceCompanyTemp2', '');
		clearErrors('companyId2', '');
		clearErrors('name_of_insured2', '');
		clearErrors('lastname_of_insured2', '');
		clearErrors('patient_relationship_to_insured2', '');
		clearErrors('subscriber_id2', '');
		clearErrors('group_id2', '');
	};

	return (
		<View style={styles.container}>
			<View style={styles.dimensions}>
				<View style={styles.contentRow}>
					<View style={{ paddingRight: 10 }}>
						<IconButton
							accessibilityLabel={t('accessibility.image')}
							accessibilityRole="image"
							icon={<InfoSquare />}
							style={{ backgroundColor: 'transparent' }}
							disabled
						/>
					</View>
					<Text style={styles.textInfo} maxFontSizeMultiplier={1.3}>
						{t('patientRegistration.infoInsuranceCompany')}
					</Text>
				</View>
			</View>
			<Text
				style={{
					alignSelf: 'flex-start',
					marginLeft: 27,
					fontSize: 14,
					color: colors.BLUEDC1,
					fontFamily: 'proxima-bold',
					marginTop: 32,
					marginBottom: -10,
				}}
			>
				{t('consents.requiredFields')}
			</Text>
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
					control={control}
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
						setValue('insuranceCompanyTemp', v);
						const changeV = showData?.find((data) => data.id == v);

						setValue('insuranceCompany', changeV?.name ?? '');
						setValue('planType', changeV?.planType ?? '');
						setValue('companyId', v);
					}}
					name="insuranceCompanyTemp"
					error={errors.insuranceCompanyTemp}
				/>
				
				<Input
					control={control._defaultValues.name_of_insured}
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
						setValue('name_of_insured', v);
						if (v.length < 2) {
							setError('name_of_insured', {
								type: 'manual',
								message: 'min',
							});
						}else
						if (v.length >= 2 && v.length <= 50) {
							clearErrors('name_of_insured');
						} else
						if (v.length > 50) {
						setError('name_of_insured', {
							type: 'manual',
							message: 'max',
						});
					}
						
					}}
					// control={!secundary ? control1 : control2}
					error={errors.name_of_insured}
					name="name_of_insured"
					value={watch('name_of_insured')}
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
						setValue('lastname_of_insured', v);
						if (v.length < 2) {
							setError('lastname_of_insured', {
								type: 'manual',
								message: 'min',
							});
						}else
						if (v.length >= 2 && v.length <= 50) {
							clearErrors('lastname_of_insured');
						}else
						if (v.length > 50) {
						setError('lastname_of_insured', {
							type: 'manual',
							message: 'max',
						});
					}
					}}
					// control={!secundary ? control1 : control2}
					error={errors.lastname_of_insured}
					name="lastname_of_insured"
					value={watch('lastname_of_insured')}
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
							if (v) {
								const lowerCaseV = v.toLowerCase();
								const index = patientRelationship.findIndex(
									(e) =>
										t(
											`createAccount.patientRelationship.${e}`,
										).toLowerCase() === lowerCaseV,
								);
								const newValue = (index !== -1 ? index + 1 : '') || '';
								setValue('patient_relationship_to_insured', newValue);
							} else {
								setValue('patient_relationship_to_insured', '');
							}
						}}
						control={control}
						error={errors.patient_relationship_to_insured}
						name={'patient_relationship_to_insured'}
					/>
				)}
				{!editable && (
					<Input
						editable={editable}
						icon={<IdCard />}
						label={`${t('patientRegistration.patient')}*`}
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
					keyboardType="numeric"
					onChangeText={(v) => {
						setValue('subscriber_id', v);
						if (v.length > 0) {
							clearErrors('subscriber_id');
						}
					}}
					error={errors.subscriber_id}
					name={'subscriber_id'}
					value={watch('subscriber_id')}
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
					keyboardType="numeric"
					onChangeText={(v) => {
						setValue('group_id', v);
						if (v.length > 0) {
							clearErrors('group_id');
						}
					}}
					// control={!secundary ? control1 : control2}
					error={errors.group_id}
					name={'group_id'}
					value={watch('group_id')}
				/>
				{watch('patient_relationship_to_insured') !== 1 &&
					watch('patient_relationship_to_insured') !== undefined && (
						<>
							<DividerLine
								style={{
									width: Dimensions.get('window').width * 0.85,
									paddingTop: 25,
									marginBottom: 20,
								}}
							/>
							<Input
								control={control._defaultValues.name_of_insuredH}
								editable={editable}
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={[
									{ width: Dimensions.get('window').width * 0.85 },
									!editable && { backgroundColor: '#e7e7e7' },
								]}
								placeholder={t(
									'patientRegistration.placeholders.firstNameHolderPlace',
								)}
								label={`${t('patientRegistration.firstNameHolder')}*`}
								onChangeText={(v) => {
									setValue('name_of_insuredH', v);
									if (v.length > 0) {
										clearErrors('name_of_insuredH');
									}
								}}
								// control={!secundary ? control1 : control2}
								error={errors.name_of_insuredH}
								name="name_of_insuredH"
								value={watch('name_of_insuredH')}
							/>
							<Input
								editable={editable}
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={[
									{ width: Dimensions.get('window').width * 0.85 },
									!editable && { backgroundColor: '#e7e7e7' },
								]}
								placeholder={t(
									'patientRegistration.placeholders.lastNameHolderPlace',
								)}
								label={`${t('patientRegistration.lastNameHolder')}*`}
								onChangeText={(v) => {
									setValue('lastname_of_insuredH', v);
									if (v.length > 0) {
										clearErrors('lastname_of_insuredH');
									}
								}}
								// control={!secundary ? control1 : control2}
								error={errors.lastname_of_insuredH}
								name="lastname_of_insuredH"
								value={watch('lastname_of_insuredH')}
							/>
							{editable && (
								<DatePickerController
									control={control}
									name={'dateOfBirthH'}
									label={t('patientRegistration.dateBirthHolder')}
									labelStyle={styles.label}
									error={errors.dateOfBirthH}
									style={{ width: '85%' }}
									pikerStyle={{
										width: Dimensions.get('window').width * 0.85,
									}}
								/>
							)}
						</>
					)}

				<DividerLine
					style={{ width: Dimensions.get('window').width * 0.85, paddingTop: 50 }}
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
						paddingTop: 23,
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
							control={control}
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
								setValue('insuranceCompanyTemp2', v);

								const changeV = showData?.find((data) => data.id == v);
								setValue('insuranceCompany2', changeV?.name ?? '');
								setValue('planType2', changeV?.planType ?? '');
								setValue('companyId2', v);
								validateInsurance2();
							}}
							name="insuranceCompanyTemp2"
							error={errors.insuranceCompany2}
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
							control={control}
							error={errors.name_of_insured2}
							name={'name_of_insured2'}
							value={watch('name_of_insured2')}
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
							control={control}
							error={errors.lastname_of_insured2}
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
									if (v) {
										const lowerCaseV = v.toLowerCase();
										const index = patientRelationship.findIndex(
											(e) =>
												t(
													`createAccount.patientRelationship.${e}`,
												).toLowerCase() === lowerCaseV,
										);
										const newValue = (index !== -1 ? index + 1 : '') || '';
										setValue('patient_relationship_to_insured2', newValue);
										clearErrors('patient_relationship_to_insured2');
									} else {
										setValue('patient_relationship_to_insured2', '');
										clearErrors('patient_relationship_to_insured2');
									}
								}}
								control={control}
								error={errors.patient_relationship_to_insured2}
								name={'patient_relationship_to_insured2'}
							/>
						)}
						{!editable2 && (
							<Input
								editable={editable2}
								icon={<IdCard />}
								label={`${t('patientRegistration.patient')}*`}
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
							placeholder={t('patientRegistration.subscriber')}
							label={`${t('patientRegistration.subscriber')}*`}
							control={control}
							error={errors.subscriber_id2}
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
							control={control}
							error={errors.group_id2}
							name={'group_id2'}
						/>

						{watch('patient_relationship_to_insured2') !== 1 &&
							watch('patient_relationship_to_insured2') !== undefined && (
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
										control={control}
										error={errors.name_of_insuredH2}
										name={'name_of_insuredH2'}
										value={watch('name_of_insuredH2')}
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
										control={control}
										error={errors.lastname_of_insuredH2}
										name={'lastname_of_insuredH2'}
									/>

									<DatePickerController
										control={control}
										name={'dateOfBirthH2'}
										label={t('patientRegistration.dateBirthHolder')}
										labelStyle={styles.label}
										error={errors.dateOfBirthH2}
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
			</View>
			<Button
				style={{ marginVertical: 10 }}
				onPress={handleSubmit(handlerSubmit)}
				title={t('patientRegistration.button')}
			/>
		</View>
	);
};

export default SecondData;
