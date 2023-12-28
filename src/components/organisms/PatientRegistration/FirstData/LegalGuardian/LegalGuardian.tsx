import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Platform, Dimensions, AccessibilityRole } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Input from 'src/components/atoms/Input/Input';
import Checkbox, { CheckboxController } from 'src/components/atoms/Checkbox/Checkbox';
//Styles
import componentStyles from './LegalGuardian.styles';
//Images
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import MobileAlt from 'icons/MobileAlt.svg';
import MapMarkerAlt from 'icons/MapMarkerAlt.svg';
import IconPharmacy from 'icons/Pharmacy.svg';
import UserIcon from 'icons/User.svg';
import IconEmployer from 'icons/employer.svg';
import Button from 'src/components/atoms/Button/Button';
import DatePicker, { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import { LegalGuardianList, LegalGuardianProps, LegalGuardianYup } from './LegalGuardian.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import { MASK } from 'ui-core/utils/mask';
import { patientRelationship } from 'domain/entities/tempFormUser';
import FileUpload from 'src/components/atoms/FileUpload/FileUpload';
import RNFetchBlob from 'rn-fetch-blob';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Support from '../../../../../../assets/icons/SupportIcon.svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterService from 'adapter/api/registerService';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import useConsents from 'hooks/useConsents';

const LegalGuardian: React.FC<LegalGuardianProps> = (props) => {
	const { handlerNext, setFirstData, getListOfPharmacies, listOfPharmacies, selfValue } = props;
	const [updateNamePharmacy, setUpdateNamePharmacy] = useState<boolean>(false);
	const { navigate, reset } = useNavigation();

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [pharmacyZipValue, setPharmacyZipValue] = useState('');
	const [authPharmacy2, setAuthPharmacy2] = useState<boolean | undefined>();
	const [timeTemps, setTimeTemps] = useState<any>();
	const [userTemp, setUserTemp] = useState<any>();
	const [registerConsentsTime] = RegisterService.useRegisterConsentsTimeMutation();
	const { setModal, closeModal } = useBottomSheet();
	const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation();
	const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);
	const stateRegister = useAppSelector(userSelectors.selectState);
	const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue,
		getValues,
		clearErrors,
		setError,
		watch,
	} = useForm<LegalGuardianList>({
		resolver: yupResolver(LegalGuardianYup),
		mode: 'onSubmit',
	});

	useEffect(() => {
		clearErrors();
	}, [selfValue]);

	const { employmentStatusOptions } = useConsents();

	const employmentStatusRestrictions = ['1', '2'];

	useEffect(() => {
		getItemInfo();
		setValue(
			'employmentStatus',
			editAccountdata?.employmentStatus?.id == null
				? editAccountdata?.user?.patientInformation?.employmentStatus
				: editAccountdata?.employmentStatus?.id,
		);
		setValue(
			'employerName',
			editAccountdata?.employmentStatus?.id > 2 ? '' : editAccountdata?.employerName,
		);
		setValue(
			'workPhone',
			editAccountdata?.employmentStatus?.id > 2 ? '' : editAccountdata?.workPhone,
		);
	}, [selfValue]);

	const getItemInfo = async () => {
		const valuesMs = await AsyncStorage.getItem('resendsmsCode');
		setTimeTemps(JSON.parse(valuesMs ?? ''));
		const values: any = await AsyncStorage.getItem('loadUserInfoByCode');
		setUserTemp(JSON.parse(values ?? ''));
	};

	const onchangeFile = async (v: any) => {
		const fs = RNFetchBlob.fs;
		let filePath = v.uri;
		if (Platform.OS === 'ios') {
			filePath = v.uri.replace('file:', '');
		}
		const base64 = await fs.readFile(filePath, 'base64');
		if (base64) {
			setValue('idFile64', `data:${v.mimeType};base64,${base64}`, { shouldValidate: true });
			setValue('IDFile', v.name, { shouldValidate: true });
			setValue('idFileName', v.name, { shouldValidate: true });
		}
	};

	const [pharmacyType, setPharmacyType] = useState('');

	useEffect(() => {
		if (authPharmacy2) {
			setValue('pharmacy', pharmacyType);
		}
	}, [pharmacyType, authPharmacy2]);

	const onValidSubmit = async (values: LegalGuardianList) => {
		let info = {
			tempSessionId: tempSessionId,
			state: timeTemps?.state,
		};
		const response = editAccountdata?.isNewVersion
			? true
			: await verifyPartialRegister(info).unwrap();
		if (response == true) {
			try {
				let state = timeTemps?.state;
				let id = timeTemps?.id == '' ? userTemp.id : timeTemps?.id;
				let isFBMax = timeTemps?.isFBMax;
				const timeConsents = editAccountdata?.isNewVersion
					? 'SUCCESS'
					: await registerConsentsTime({ state, id, isFBMax }).unwrap();
				if (timeConsents !== 'SUCCESS') throw new Error('Expirado');
				if (getValues('auth') != undefined) {
					values.pharmacy = !authPharmacy2 ? '' : pharmacyType;
					let newvalue: any = values;
					newvalue.noFavoritePharmacy = !authPharmacy2;
					if (authPharmacy2) {
						newvalue.zipcode = pharmacyZipValue;
					}
					handlerNext();
					setFirstData(values);
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
	};

	const resetLogin = () => {
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	const changePharmacyZip = (v: any) => {
		setUpdateNamePharmacy(true);
		setPharmacyZipValue(v);
		getListOfPharmacies(v);
		setTimeout(() => {
			setUpdateNamePharmacy(false);
		}, 50);
	};

	useEffect(() => {
		if (!employmentStatusRestrictions.includes(watch('employmentStatus') ?? '')) {
		  setValue('employerName', '');
		  clearErrors('employerName');
		  setValue('workPhone', '');
		  clearErrors('workPhone');
		}
	  }, [watch('employmentStatus')]);

	return (
		<>
			<InputSelect
				control={control}
				error={errors.reason}
				style={{ width: Dimensions.get('window').width * 0.9 }}
				label={t('patientRegistration.reason')}
				labelStyle={[styles.label]}
				items={[
					{ key: 1, label: t('guarantorReason.underAge'), value: '1' },
					{ key: 2, label: t('guarantorReason.disabilities'), value: '2' },
					{ key: 3, label: t('guarantorReason.senior'), value: '3' },
				]}
				onChange={(v) => {
					setValue('reason', v);
					setValue(
						'guarantorReasonLabel',
						v == 1 ? 'Under - age' : v == 2 ? 'Disabilities' : 'Senior',
					);
				}}
				placeholder={t('patientRegistration.placeholders.reason')}
				name="reason"
			/>
			<InputSelect
				icon={<UserIcon />}
				style={{ width: Dimensions.get('window').width * 0.9 }}
				labelStyle={styles.label}
				label={`${t('patientRegistration.relationship')}*`}
				items={patientRelationship.map((patientRelationhip, index) => {
					return {
						key: index,
						label: t(`createAccount.patientRelationship.${patientRelationhip}`),
						value: t(`createAccount.patientRelationship.${patientRelationhip}`),
					};
				})}
				placeholder={t('patientRegistration.relationship')}
				onChange={(v) => {
					setValue('patient_relationship_to_insured', v);
				}}
				control={control}
				error={errors.patient_relationship_to_insured}
				name={'patient_relationship_to_insured'}
			/>
			<Input
				icon={<UserIcon />}
				labelStyle={styles.label}
				multiline={true}
				inputStyle={styles.input}
				placeholder={t('patientRegistration.placeholders.guarantorName')}
				label={t('patientRegistration.guarantorName')}
				name={'guarantorName'}
				control={control}
				error={errors.guarantorName}
			/>
			<Input
				icon={<UserIcon />}
				labelStyle={styles.label}
				inputStyle={styles.input}
				multiline={true}
				placeholder={t('patientRegistration.placeholders.guarantorLast')}
				label={t('patientRegistration.guarantorLast')}
				name={'guarantorLast'}
				control={control}
				error={errors.guarantorLast}
			/>
			<Input
				icon={<UserIcon />}
				keyboardType="number-pad"
				mask={MASK.ssn}
				labelStyle={styles.label}
				inputStyle={styles.input}
				placeholder={t('patientRegistration.GuarantorSsn')}
				label={t('patientRegistration.GuarantorSsn')}
				name={'guarantorSnn'}
				control={control}
				error={errors.guarantorSnn}
			/>
			<DatePickerController
				control={control}
				name={'dateOfBirth'}
				label={t('patientRegistration.guarantorDate')}
				labelStyle={styles.label}
				error={errors.dateOfBirth}
				style={{ width: '85%', marginBottom: 0 }}
				pikerStyle={{ width: Dimensions.get('window').width * 0.9 }}
			/>
			<InputSelect
				icon={<MapMarkerAlt />}
				control={control}
				labelStyle={styles.label}
				style={[styles.input, { marginBottom: 0 }]}
				label={t('createAccount.inputs.state') + '*'}
				items={[
					{ key: 1, label: 'Florida', value: 'FL' },
					{ key: 2, label: 'Tennessee', value: 'TN' },
				]}
				placeholder={t('createAccount.inputs.state')}
				onChange={(v) => {
					setValue('state', v);
				}}
				name="state"
				error={errors.state}
			/>
			<Input
				icon={<MapMarkerAlt />}
				labelStyle={styles.label}
				inputStyle={styles.input}
				placeholder={t('patientRegistration.placeholders.cityGuarantor')}
				label={t('patientRegistration.city')}
				name={'city'}
				multiline={true}
				control={control}
				error={errors.city}
			/>
			<Input
				icon={<MapMarkerAlt />}
				labelStyle={styles.label}
				keyboardType="numeric"
				inputStyle={styles.input}
				mask={MASK.zip}
				placeholder={t('patientRegistration.placeholders.zipGuarant')}
				label={t('patientRegistration.zip')}
				name={'zipCode'}
				control={control}
				error={errors.zipCode}
			/>
			<Input
				icon={<MapMarkerAlt />}
				labelStyle={styles.label}
				inputStyle={styles.input}
				multiline={true}
				placeholder={t('patientRegistration.placeholders.address')}
				label={t('patientRegistration.address')}
				name={'address'}
				control={control}
				error={errors.address}
			/>
			<Input
				icon={<MobileAlt />}
				keyboardType="number-pad"
				labelStyle={styles.label}
				inputStyle={styles.input}
				placeholder={t('createAccount.inputs.homePhone')}
				label={t('createAccount.inputs.homePhone')}
				name={'homePhone'}
				mask={MASK.phone}
				control={control}
				error={errors.homePhone}
			/>
			<Input
				icon={<MobileAlt />}
				keyboardType="number-pad"
				labelStyle={styles.label}
				inputStyle={styles.input}
				placeholder={t('patientRegistration.placeholders.mobileGuarant')}
				label={t('patientRegistration.mobile')}
				name={'mobile'}
				mask={MASK.phone}
				control={control}
				error={errors.mobile}
			/>
			<InputSelect
				icon={<IconEmployer />}
				control={control}
				style={{ width: Dimensions.get('window').width * 0.9 }}
				label={t('createAccount.inputs.employmentStatus')}
				items={employmentStatusOptions}
				placeholder={t('patientRegistration.placeholders.employmentStatus')}
				onChange={(v, index) => {
					const selectedItem =
						index == 0 ? { value: '', label: '' } : employmentStatusOptions[index - 1];

					setValue('employmentStatus', selectedItem.value);
					setValue('employmentStatusLabel', selectedItem.label);
				}}
				name="employmentStatus"
				error={errors.employmentStatus}
				value={getValues('employmentStatus')}
			/>
			{employmentStatusRestrictions.includes(watch('employmentStatus') ?? '') && (
				<>
					<Input
						control={control}
						icon={<UserIcon />}
						keyboardType="name-phone-pad"
						inputStyle={styles.input}
						placeholder={t('patientRegistration.placeholders.employerName')}
						label={t('createAccount.inputs.employerName')}
						name={'employerName'}
						error={errors.employerName}
						value={watch('employerName')}
						multiline={true}
					/>
					<Input
						control={control}
						icon={<MobileAlt />}
						keyboardType="numeric"
						mask={MASK.phone}
						inputStyle={styles.input}
						placeholder={t('patientRegistration.placeholders.workPhone')}
						label={t('createAccount.inputs.workPhone')}
						name={'workPhone'}
						error={errors.workPhone}
						autoCorrect={false}
						value={watch('workPhone')}
					/>
				</>
			)}
			<FileUpload
				style={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('createAccount.fileUpload.documentFile')}
				helperText={t('createAccount.fileUpload.documentTypes')}
				onChange={(v) => onchangeFile(v)}
			/>
			<View
				style={{
					width: Dimensions.get('window').width * 0.9,
					alignItems: 'flex-start',
					marginBottom: 20,
				}}
			>
				<Text style={styles.titleRadioButtons} maxFontSizeMultiplier={1.3}>
					{t('patientRegistration.tittlePharmacy')}
				</Text>
			</View>

			<Input
				icon={<MapMarkerAlt />}
				mask={MASK.zip}
				labelStyle={styles.label}
				inputStyle={[
					styles.input,
					authPharmacy2 === false ? { backgroundColor: colors.GRAY_LIGHT_3 } : null,
				]}
				editable={authPharmacy2}
				onChangeText={(v) => {
					changePharmacyZip(v);
				}}
				placeholder={t('patientRegistration.pharmacyZip')}
				label={`${t('patientRegistration.pharmacyZip')}*`}
				name={'pharmacyZip'}
			/>
			{errors.pharmacy?.message && pharmacyZipValue.length < 5 && (
				<View
					style={{
						marginBottom: 10,
						width: Dimensions.get('window').width * 0.9,
						alignSelf: 'center',
						marginTop: -10,
					}}
				>
					<Text
						style={{
							color: colors.DANGER,
							fontFamily: 'proxima-regular',
							fontSize: 12,
						}}
						maxFontSizeMultiplier={1.3}
					>
						{!pharmacyZipValue.length ? t(`errors.required`) : t(`errors.min`)}
					</Text>
				</View>
			)}
			<InputSelect
				icon={<IconPharmacy />}
				labelStyle={styles.label}
				disabled={authPharmacy2 === false}
				style={{ width: Dimensions.get('window').width * 0.9 }}
				inputStyle={
					authPharmacy2 === false ? { backgroundColor: colors.GRAY_LIGHT_3 } : null
				}
				label={`${t('patientRegistration.pharmacy')}*`}
				items={listOfPharmacies.map((data, i) => {
					return { key: i ?? '', label: data ?? '', value: data ?? '' };
				})}
				placeholder={t('patientRegistration.pharmacy')}
				onChange={(v) => {
					setPharmacyType(v);
					// setValue('pharmacy', v);
				}}
				control={control}
				error={authPharmacy2 ? errors.pharmacy : undefined}
				name={'pharmacy'}
				value={updateNamePharmacy ? '' : undefined}
			/>
			<RadioGroup
				style={{ width: Dimensions.get('window').width * 0.9, marginTop: 15 }}
				onChange={(v) => {
					if (v == 2) {
						setValue('pharmaCondition', false);
						clearErrors('pharmacy', '');
					} else {
						clearErrors('pharmacy', '');
						setValue('pharmaCondition', true);
					}
					setAuthPharmacy2(v == 1 ? true : false);
					setValue('auth', v == 1 ? true : false);
					setError('auth', {});
				}}
			>
				<RadioButton
					accessibilityRole="radio"
					value={1}
					textStyle={styles.item}
					title={t('patientRegistration.radioBtnTrue')}
				/>
				<RadioButton
					accessibilityRole="radio"
					value={2}
					style={{ marginTop: 10 }}
					textStyle={styles.item}
					title={t('patientRegistration.radioBtnFalse')}
				/>
			</RadioGroup>
			{errors.auth?.message && (
				<View
					style={{
						marginBottom: 10,
						width: Dimensions.get('window').width * 0.9,
						alignSelf: 'center',
						marginTop: -10,
					}}
				>
					<Text
						style={{
							color: colors.DANGER,
							fontFamily: 'proxima-regular',
							fontSize: 12,
						}}
						maxFontSizeMultiplier={1.3}
					>
						{t(`errors.required`)}
					</Text>
				</View>
			)}
			<Button
				style={{ marginVertical: 25 }}
				title={t('patientRegistration.button')}
				onPress={handleSubmit(onValidSubmit)}
			></Button>
			<Button
				accesibilityLabel={t('accessibility.linkSupport')}
				icon={<Support />}
				title={t('moreOptions.support')}
				variant="Underline"
				style={{ marginTop: 5, marginBottom: 20, paddingLeft: 30 }}
				textStyle={styles.textButton}
				onPress={() => {
					navigate<any>('ChatSanitas');
				}}
			/>
		</>
	);
};

export default LegalGuardian;
