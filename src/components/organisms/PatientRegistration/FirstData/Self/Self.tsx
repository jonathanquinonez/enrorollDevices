import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Input from 'src/components/atoms/Input/Input';
//Styles
import componentStyles from './Self.styles';
//Images
import MobileAlt from 'icons/MobileAlt.svg';
import MapMarkerAlt from 'icons/MapMarkerAlt.svg';
import IconPharmacy from 'icons/Pharmacy.svg';
import UserIcon from 'icons/User.svg';
import Email from 'icons/EmailIcon.svg';
import CalendarInputIcon from 'icons/CalendarInputIcon.svg';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import { SelfList, SelfProps, SelfYup } from './Self.types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'src/components/atoms/Button/Button';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MASK } from 'ui-core/utils/mask';
import FileUpload from 'src/components/atoms/FileUpload/FileUpload';
import RNFetchBlob from 'rn-fetch-blob';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import FORMATS from 'ui-core/utils/formats';
import Support from '../../../../../../assets/icons/SupportIcon.svg';
import { useNavigation } from '@react-navigation/native';
import RegisterService from 'adapter/api/registerService';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from '../../../../molecules/ModalWarning/ModalWarning';
import useConsents from 'hooks/useConsents';
import User from 'icons/User.svg';
import { CheckboxController } from 'src/components/atoms/Checkbox/Checkbox';
import IconJob from 'icons/PersonalInfoIcons/suitcase.svg';
import IconSexual from 'icons/sexual.svg';
import IconMarital from 'icons/marital.svg';
import IconLanguage from 'icons/language.svg';
import IconEmployer from 'icons/employer.svg';
import IconTelePhone from 'icons/telephone.svg';
import {
	listGender,
	mapsListGender,
} from 'src/screens/PersonalInformation/EditAccount/EditAccount.types';
import { patientRelationship } from 'domain/entities/tempFormUser';

const Self: React.FC<SelfProps> = (props) => {
	const { handlerNext, setFirstData, getListOfPharmacies, listOfPharmacies } = props;
	const { navigate, reset } = useNavigation();
	const [registerConsentsTime] = RegisterService.useRegisterConsentsTimeMutation();
	const { setModal, closeModal } = useBottomSheet();
	const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation();
	const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [patientInformation, setPatientInformation] = useState<any>();
	const [saveValue, setSaveValue] = useState<any>();
	const [pharmacyZipValue, setPharmacyZipValue] = useState('');
	const [updateNamePharmacy, setUpdateNamePharmacy] = useState<boolean>(false);
	const [authPharmacy, setAuthPharmacy] = useState<boolean | undefined>();
	const [timeTemps, setTimeTemps] = useState<any | undefined>();
	const [userTemp, setUserTemp] = useState<any | undefined>();
	const stateRegister = useAppSelector(userSelectors.selectState);
	const [isRadioButtonSelected, setIsRadioButtonSelected] = useState(false);
	const [sex, setSex] = useState<string>('M');

	const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);
	const other = 'O';
	const employmentStatusRestrictions = ['1', '2'];

	const sexOptions = [
		{ label: t('sex.F'), value: 'F' },
		{ label: t('sex.M'), value: 'M' },
		{ label: t('sex.D'), value: 'U' },
	];

	const getItemInfo = async () => {
		let values: any;
		values = await AsyncStorage.getItem('loadUserInfoByCode');
		if (values) {
			let valuesParse = JSON.parse(values);
			const data = valuesParse.patientInformation
				? valuesParse.patientInformation
				: valuesParse;
			setPatientInformation(data);
			console.log('-----------------------data-----------------', data)
			setSaveValue(valuesParse);
			const dateOfBirth = data?.dateOfBirth ? data?.dateOfBirth : data?.birthdate;
			const mobile = data?.mobile ? data?.mobile : data?.cellphone;
			setValue('dateOfBirth', dateOfBirth ? moment(dateOfBirth).format(FORMATS.date6) : '');
			setValue('mobile', mobile);
			setUserTemp(valuesParse);
		}

		const valuesMs = await AsyncStorage.getItem('resendsmsCode');
		setTimeTemps(JSON.parse(valuesMs ?? ''));
	};
	const {
		gendersOptions,
		sexualOrientationOptions,
		ethnicityOptions,
		raceOptions,
		preferedLanguageOptions,
		employmentStatusOptions,
		doYouHaveOptions,
	} = useConsents();
	useEffect(() => {
		getItemInfo();
		setValue(
			'maritalStatus',
			editAccountdata?.maritalStatus ??
			editAccountdata?.user?.patientInformation?.maritalStatus,
		);
		setValue(
			'sex',
			editAccountdata?.sex?.id == null
				? editAccountdata?.user?.patientInformation?.sex
				: editAccountdata?.sex?.id,
		);
		setValue(
			'genderIdentity',
			editAccountdata?.genderIdentity?.id == null
				? editAccountdata?.user?.patientInformation?.genderIdentity
				: editAccountdata?.genderIdentity?.id,
		);
		setValue(
			'genderIdentityOther',
			editAccountdata?.genderIdentity?.description ??
			editAccountdata?.user?.patientInformation?.genderIdentityOther ??
			'',
		);
		setValue(
			'sexualOrientiation',
			editAccountdata?.sexualOrientation?.id == null
				? editAccountdata?.user?.patientInformation?.sexualOrientiation
				: editAccountdata?.sexualOrientation?.id,
		);
		setValue(
			'sexualOrientiationOther',
			editAccountdata?.sexualOrientation?.description ??
			editAccountdata?.user?.patientInformation?.sexualOrientiationOther ??
			'',
		);
		setValue(
			'etnicity',
			editAccountdata?.ethnicity?.id == null
				? editAccountdata?.user?.patientInformation?.etnicity
				: editAccountdata?.ethnicity?.id,
		);
		setValue(
			'race',
			editAccountdata?.race?.id == null
				? editAccountdata?.user?.patientInformation?.race
				: editAccountdata?.race?.id,
		);
		setValue(
			'raceOther',
			editAccountdata?.race?.description ??
			editAccountdata?.user?.patientInformation?.raceOther ??
			'',
		);

		setValue(
			'languagePreference',
			editAccountdata?.preferedLanguage?.id == null
				? editAccountdata?.user?.patientInformation?.languagePreference
				: editAccountdata?.preferedLanguage?.id,
		);
		setValue(
			'languagePreferenceOther',
			editAccountdata?.preferedLanguage?.description ??
			editAccountdata?.user?.patientInformation?.languagePreferenceOther ??
			'',
		);

		setValue(
			'employmentStatus',
			editAccountdata?.employmentStatus?.id == null
				? editAccountdata?.user?.patientInformation?.employmentStatus
				: editAccountdata?.employmentStatus?.id,
		);
		setValue(
			'employerName',
			editAccountdata?.user?.patientInformation?.employerName
			?? editAccountdata?.employerName ?? '',
		);
		setValue(
			'workPhone',
			editAccountdata?.employmentStatus?.id == null
				? editAccountdata?.user?.patientInformation?.workPhone
				: editAccountdata?.workPhone,
		);
		setValue(
			'emergencyContactName',
			editAccountdata?.emergencyContactName ??
			editAccountdata?.user?.patientInformation?.emergencyContactName ??
			'',
		);
		setValue(
			'emergencyContactLastName',
			editAccountdata?.emergencyContactLastName ??
			editAccountdata?.user?.patientInformation?.emergencyContactLastName ??
			'',
		);
		setValue(
			'emergencyContactMobile',
			editAccountdata?.emergencyContactMobile ??
			editAccountdata?.user?.patientInformation?.emergencyContactMobile ??
			'',
		);
		setValue(
			'emergencyRelationship',
			editAccountdata?.emergencyRelationship ??
			editAccountdata?.user?.patientInformation?.emergencyRelationship ??
			'',
		);
		console.log('-----editAccountdata--------', editAccountdata)

	}, [editAccountdata]);

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		setError,
		formState: { errors, isDirty },
	} = useForm<SelfList>({
		resolver: yupResolver(SelfYup),
		mode: 'onChange',
	});

	useEffect(() => {
		const pharmacy = getValues('pharmacy');
		if (authPharmacy === false && !pharmacy) {
			setValue('pharmacy', 'NN');
		}
	}, [getValues('pharmacy')]);

	const changePharmacyZip = (v: any) => {
		setUpdateNamePharmacy(true);
		setPharmacyZipValue(v);
		setValue('pharmacyZip', v);
		getListOfPharmacies(v);
		setTimeout(() => {
			setUpdateNamePharmacy(false);
		}, 50);
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

	const resetLogin = () => {
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	const onValidSubmit = async (values: SelfList) => {
		saveValue.patientInformation = values;
		await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(saveValue));
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
				let id = timeTemps?.id == '' ? userTemp?.id : timeTemps?.id;
				let isFBMax = timeTemps?.isFBMax;

				const timeConsents = editAccountdata?.isNewVersion
					? 'SUCCESS'
					: await registerConsentsTime({ state, id, isFBMax }).unwrap();
				if (timeConsents !== 'SUCCESS') throw new Error('Expirado');

				if (getValues('auth') != undefined) {
					values.pharmacy = !authPharmacy ? '' : values.pharmacy;
					let newvalue: any = values;
					newvalue.noFavoritePharmacy = !authPharmacy;
					if (authPharmacy) {
						newvalue.zipcode = pharmacyZipValue;
					}
					handlerNext();
					setFirstData({
						homePhone: patientInformation.homePhone,
						...newvalue,
						sex: patientInformation.sex ?? patientInformation?.memberGender,
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

	useEffect(() => {
		console.log('Initial values', sex);
	}, [sex]);

	return (
		<>
			{patientInformation?.firstName ? (
				<>
					<Input
						icon={<UserIcon />}
						labelStyle={styles.label}
						multiline={true}
						inputStyle={[
							styles.input,
							patientInformation.firstName === ''
								? null
								: { backgroundColor: colors.GRAY_LIGHT_3 },
						]}
						placeholder={t('patientRegistration.firstName')}
						label={t('patientRegistration.firstName')}
						name={'firstName'}
						value={patientInformation.firstName}
						setDisabled={false}
						control={control}
						error={errors.firstName}
						onChange={(value) => {
							setValue('firstName', value.nativeEvent.text, { shouldValidate: true });
						}}
						editable={patientInformation?.firstName ? false : true}
					/>
					<Input
						icon={<UserIcon />}
						labelStyle={styles.label}
						multiline={true}
						inputStyle={[
							styles.input,
							patientInformation.lastName === ''
								? null
								: { backgroundColor: colors.GRAY_LIGHT_3 },
						]}
						value={patientInformation.lastName}
						setDisabled={false}
						placeholder={t('patientRegistration.lastName')}
						label={t('patientRegistration.lastName')}
						name={'lastName'}
						control={control}
						error={errors.lastName}
						onChange={(value) => {
							setValue('lastName', value.nativeEvent.text);
						}}
						editable={patientInformation?.lastName ? false : true}
					/>
					<Input
						icon={<CalendarInputIcon />}
						labelStyle={styles.label}
						inputStyle={[
							styles.input,
							patientInformation.dateOfBirth === ''
								? null
								: { backgroundColor: colors.GRAY_LIGHT_3 },
						]}
						value={(patientInformation.dateOfBirth || patientInformation.birthdate) ? moment(patientInformation.dateOfBirth || patientInformation.birthdate).format(FORMATS.date6) : ''}
						setDisabled={false}
						placeholder={t('patientRegistration.dateBirth')}
						label={t('patientRegistration.dateBirth')}
						name={'dateOfBirth'}
						control={control}
						error={errors.dateOfBirth}
						onChange={(value) => {
							setValue('dateOfBirth', value.nativeEvent.text);
						}}
						editable={patientInformation?.dateOfBirth ? false : true}
					/>
					{
						//Se comenta esta parte por el alm-991 reportado por Vanessa Rincon
						//El campo debe ser editable
						// patientInformation.email ?
						//     <Input
						//         icon={<IconSexual />}
						//         labelStyle={styles.label}
						//         inputStyle={[styles.input, patientInformation.sex === '' ? null : { backgroundColor: colors.GRAY_LIGHT_3 }]}
						//         value={
						//             (patientInformation?.sex?.toUpperCase() === 'M' || patientInformation?.gender?.toUpperCase() === 'M') ? t('sex.M') :
						//                 (patientInformation?.sex?.toUpperCase() === 'F' || patientInformation?.gender?.toUpperCase() === 'F') ? t('sex.F') :
						//                     t('sex.D')
						//         }
						//         setDisabled={false}
						//         placeholder={t('patientRegistration.placeholders.gender')}
						//         label={t('patientRegistration.gender')}
						//         name={'sex'}
						//         control={control}
						//         error={errors.sex}
						//         editable={patientInformation?.sex ? false : true}
						//     /> :
					}
					<InputSelect
						icon={<IconSexual />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						labelStyle={styles.label}
						label={t('patientRegistration.gender')}
						items={sexOptions}
						placeholder={t('patientRegistration.placeholders.gender')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : sexOptions[index - 1];
							setValue('sex', selectedItem.value);
						}}
						name="sex"
						value={watch('sex')}
						error={errors.sex}
					/>
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.sexIdentity')}
						items={gendersOptions}
						placeholder={t('patientRegistration.placeholders.genderIdentityConst')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : gendersOptions[index - 1];
							setValue('genderIdentity', selectedItem.value);
							setValue('genderIdentityLabel', selectedItem.label);
							if (v != 'O') {
								setValue('genderIdentityOther', '');
							}
						}}
						name="genderIdentity"
						error={errors.genderIdentity}
						value={getValues('genderIdentity')}
					/>
					{watch('genderIdentity') == other && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.90,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'genderIdentityOther'}
							control={control}
							error={errors.genderIdentityOther}
							value={getValues('genderIdentityOther')}
							onChange={(e) => {
								setValue('genderIdentityOther', e.nativeEvent.text);
							}}
						/>
					)}
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.sexualOrientation')}
						items={sexualOrientationOptions}
						placeholder={t('patientRegistration.placeholders.sexualOrientation')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0
									? { value: '', label: '' }
									: sexualOrientationOptions[index - 1];

							setValue('sexualOrientiation', selectedItem.value);
							setValue('sexualOrientiationLabel', selectedItem.label);
							if (v != 'O') {
								setValue('sexualOrientiationOther', '');
							}
						}}
						name="sexualOrientiation"
						error={errors.sexualOrientiation}
						value={getValues('sexualOrientiation')}
					/>
					{watch('sexualOrientiation') == other && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.90,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'sexualOrientiationOther'}
							control={control}
							error={errors.sexualOrientiationOther}
							value={getValues('sexualOrientiationOther')}
							onChange={(e) => {
								setValue('sexualOrientiationOther', e.nativeEvent.text);
							}}
						/>
					)}
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.ethnicity')}
						items={ethnicityOptions}
						placeholder={t('patientRegistration.placeholders.ethnicity')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : ethnicityOptions[index - 1];
							setValue('etnicity', selectedItem.value);
							setValue('etnicityLabel', selectedItem.label);
						}}
						name="etnicity"
						error={errors.etnicity}
						value={watch('etnicity')}
					/>
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.race')}
						items={raceOptions}
						placeholder={t('patientRegistration.placeholders.race')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : raceOptions[index - 1];

							setValue('race', selectedItem.value);
							setValue('raceLabel', selectedItem.label);
							if (v != 'O') {
								setValue('raceOther', '');
							}
						}}
						name="race"
						error={errors.race}
						value={getValues('race')}
					/>
					{watch('race') == other && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.90,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'raceOther'}
							control={control}
							error={errors.raceOther}
							value={getValues('raceOther')}
							onChange={(e) => {
								setValue('raceOther', e.nativeEvent.text);
							}}
						/>
					)}
					<InputSelect
						icon={<IconLanguage />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.languagePreference')}
						items={preferedLanguageOptions}
						placeholder={t('patientRegistration.placeholders.languagePreference')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0
									? { value: '', label: '' }
									: preferedLanguageOptions[index - 1];

							setValue('languagePreference', selectedItem.value);
							setValue('languagePreferenceLabel', selectedItem.label);
						}}
						name="languagePreference"
						error={errors.languagePreference}
						value={getValues('languagePreference')}
					/>
					{watch('languagePreference') == other && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.90,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'languagePreferenceOther'}
							control={control}
							error={errors.languagePreferenceOther}
							value={getValues('languagePreferenceOther')}
							onChange={(e) => {
								setValue('languagePreferenceOther', e.nativeEvent.text);
							}}
						/>
					)}
					<InputSelect
						icon={<IconMarital />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.maritalStatus')}
						items={[
							{ label: t('maritalStatus.single'), value: t('maritalStatus.single') },
							{
								label: t('maritalStatus.married'),
								value: t('maritalStatus.married'),
							},
							{
								label: t('maritalStatus.divorced'),
								value: t('maritalStatus.divorced'),
							},
							{
								label: t('maritalStatus.widowed'),
								value: t('maritalStatus.widowed'),
							},
							{
								label: t('maritalStatus.declined'),
								value: t('maritalStatus.declined'),
							},
						]}
						placeholder={t('patientRegistration.placeholders.maritalStatus')}
						onChange={(v) => {
							setValue('maritalStatus', v);
						}}
						name="maritalStatus"
						error={errors.maritalStatus}
						value={watch('maritalStatus')}
					/>
					<InputSelect
						icon={<IconEmployer />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.employmentStatus')}
						items={employmentStatusOptions}
						placeholder={t('patientRegistration.placeholders.employmentStatus')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0
									? { value: '', label: '' }
									: employmentStatusOptions[index - 1];

							setValue('employmentStatus', selectedItem.value);
							console.log('----selectedItem.value-----', selectedItem.value)
							setValue('employmentStatusLabel', selectedItem.label);
							if (v != '1' || v != '2') {
								setValue('employerName', '');
								setValue('workPhone', '');
							}
						}}
						name="employmentStatus"
						error={errors.employmentStatus}
						value={getValues('employmentStatus')}
					/>
					{employmentStatusRestrictions.includes(watch('employmentStatus') ?? '') ?
						<>
							<Input
								control={control}
								icon={<User />}
								keyboardType="name-phone-pad"
								inputStyle={{ width: Dimensions.get('window').width * 0.90 }}
								placeholder={t('patientRegistration.placeholders.employerName')}
								label={t('createAccount.inputs.employerName')}
								name={'employerName'}
								error={errors.employerName}
								value={editAccountdata?.user?.patientInformation?.employerName
									?? editAccountdata?.employerName ?? ''}
							/>
							<Input
								control={control}
								icon={<MobileAlt />}
								keyboardType="numeric"
								mask={MASK.phone}
								inputStyle={{ width: Dimensions.get('window').width * 0.90 }}
								placeholder={t('patientRegistration.placeholders.workPhone')}
								label={t('createAccount.inputs.workPhone')}
								name={'workPhone'}
								error={errors.workPhone}
								autoCorrect={false}
								value={editAccountdata?.user?.patientInformation?.workPhone
									?? editAccountdata?.workPhone ?? ''}
							/>
						</> : <></>
					}

					<Input
						icon={<Email />}
						labelStyle={[styles.label, { marginTop: 15 }]}
						inputStyle={[styles.input, { backgroundColor: colors.GRAY_LIGHT_3 }]}
						value={patientInformation.email}
						setDisabled={false}
						placeholder={t('patientRegistration.eMail')}
						label={t('patientRegistration.eMail')}
						name={'email'}
						control={control}
						error={errors.email}
						editable={false}
					/>
					<Input
						icon={<MobileAlt />}
						labelStyle={styles.label}
						inputStyle={[styles.input, { backgroundColor: colors.GRAY_LIGHT_3 }]}
						value={patientInformation.mobile}
						placeholder={t('patientRegistration.mobile')}
						label={t('personalInformation.mobile')}
						name={'mobile'}
						control={control}
						error={errors.mobile}
						mask={MASK.phone}
						editable={false}
					/>
					<Input
						icon={<MobileAlt />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						value={patientInformation?.cellphone ?? editAccountdata?.user?.patientInformation?.homePhone
							?? editAccountdata?.homePhone ?? ''}
						setDisabled={false}
						placeholder={t('patientRegistration.placeholders.homePhone')}
						label={t('patientRegistration.home')}
						name={'cellphone'}
						control={control}
						mask={MASK.phone}
						error={errors.mobile}
					/>
					<Input
						icon={<MapMarkerAlt />}
						labelStyle={styles.label}
						inputStyle={[styles.input]}
						value={patientInformation?.address1 ?? ''}
						setDisabled={patientInformation?.address1 ? false : true}
						placeholder={t('patientRegistration.address')}
						label={t('patientRegistration.address')}
						name={'address'}
						control={control}
						error={errors.address}
					/>
					<Input
						icon={<MapMarkerAlt />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						value={patientInformation.address2 ?? ''}
						setDisabled={patientInformation?.address2 ? false : true}
						placeholder={t('patientRegistration.placeholders.address2')}
						label={t('patientRegistration.address2')}
						name={'address2'}
						control={control}
						error={errors.address2}
					/>
					<Input
						icon={<MapMarkerAlt />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						value={patientInformation.city ?? ''}
						setDisabled={patientInformation?.city ? false : true}
						placeholder={t('patientRegistration.city')}
						label={t('patientRegistration.city')}
						name={'city'}
						control={control}
						error={errors.city}
					/>
					<Input
						icon={<MapMarkerAlt />}
						labelStyle={styles.label}
						inputStyle={[
							styles.input,
							patientInformation.state === ''
								? null
								: { backgroundColor: colors.GRAY_LIGHT_3 },
						]}
						value={patientInformation.state}
						placeholder={t('patientRegistration.state')}
						label={t('patientRegistration.state')}
						setDisabled={false}
						name={'state'}
						control={control}
						error={errors.state}
						editable={patientInformation?.state ? false : true}
					/>
					<Input
						icon={<MapMarkerAlt />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						value={patientInformation.zipCode}
						setDisabled={patientInformation?.zipCode ? false : true}
						placeholder={t('patientRegistration.zip')}
						label={t('patientRegistration.zip')}
						name={'zipCode'}
						control={control}
						mask={MASK.zip}
					/>
					<Input
						icon={<UserIcon />}
						mask={MASK.ssn}
						labelStyle={styles.label}
						inputStyle={[styles.input]}
						value={patientInformation.ssn ?? ''}
						setDisabled={patientInformation?.snn ? false : true}
						editable={patientInformation?.snn ? false : true}
						placeholder={t('patientRegistration.ssn')}
						label={t('patientRegistration.ssn')}
						name={'ssn'}
						control={control}
						error={errors.ssn}
					/>
					<FileUpload
						style={{ width: Dimensions.get('window').width * 0.90 }}
						placeholder={t('createAccount.fileUpload.documentFile')}
						helperText={t('createAccount.fileUpload.documentTypes')}
						onChange={(v) => onchangeFile(v)}
					/>
					<Text
						style={{
							alignSelf: 'flex-start',
							fontSize: 18,
							color: colors.BLUEDC1,
							fontFamily: 'proxima-bold',
							marginBottom: 18,
							marginTop: 5,
						}}
					>
						{t('createAccount.titlesContactSecurity.emergencyContact')}
					</Text>
					<Input
						icon={<User />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={t('patientRegistration.placeholders.emergencyName')}
						label={t('createAccount.inputs.emergencyName')}
						name={'emergencyContactName'}
						control={control}
						error={errors.emergencyContactName}
						value={getValues('emergencyContactName')}
						onChange={(e) => {
							setValue('emergencyContactName', e.nativeEvent.text);
						}}
					/>
					<Input
						icon={<User />}
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={t('patientRegistration.placeholders.emergencyLastName')}
						label={t('createAccount.inputs.emergencyLastName')}
						name={'emergencyContactLastName'}
						control={control}
						error={errors.emergencyContactLastName}
						value={getValues('emergencyContactLastName')}
						onChange={(e) => {
							setValue('emergencyContactLastName', e.nativeEvent.text);
						}}
					/>
					<Input
						icon={<MobileAlt />}
						keyboardType="numeric"
						labelStyle={styles.label}
						inputStyle={styles.input}
						placeholder={t('patientRegistration.placeholders.emergencyMobile')}
						label={t('createAccount.inputs.emergencyMobile')}
						name={'emergencyContactMobile'}
						control={control}
						error={errors.emergencyContactMobile}
						mask={MASK.phone}
						autoCorrect={false}
						value={getValues('emergencyContactMobile')}
						onChange={(e) => {
							setValue('emergencyContactMobile', e.nativeEvent.text);
						}}
					/>

					{/*  */}
					<InputSelect
						control={control}
						error={errors.emergencyRelationship}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						label={t('createAccount.inputs.emergencyRelationship')}
						labelStyle={[styles.label, { marginTop: 20 }]}
						items={patientRelationship.map((patientRelationhip, index) => {
							return {
								key: index,
								label: t(`createAccount.patientRelationship.${patientRelationhip}`),
								value: index,
							};
						})}
						onChange={(v) => {
							setValue('emergencyRelationship', v);
						}}
						value={getValues('emergencyRelationship')}
						placeholder={t('patientRegistration.placeholders.emergencyRelationship')}
						name={'emergencyRelationship'}
					/>
					{/*  */}
					<Text style={styles.textConsents} maxFontSizeMultiplier={1.3}>
						{t('createAccount.inputs.emergencyContact')}
					</Text>
					<RadioGroup
						style={styles.customRow}
						onChange={(v) => {
							setValue('emergencyContact', v == 1 ? true : false);
							setIsRadioButtonSelected(true);
						}}
					>
						<RadioButton
							accessibilityRole="radio"
							value={1}
							style={{
								paddingRight: 20,
							}}
							textStyle={styles.itemConsents}
							title={t('patientRegistration.placeholders.emergencyYes')}
						/>
						<RadioButton
							accessibilityRole="radio"
							value={2}
							style={{
								paddingRight: 20,
								paddingLeft: 20,
							}}
							textStyle={styles.itemConsents}
							title={t('patientRegistration.placeholders.emergencyNo')}
						/>
					</RadioGroup>
					{!isRadioButtonSelected && errors.emergencyContact?.message && (
						<View
							style={{
								marginBottom: 10,
								width: Dimensions.get('window').width * 0.85,
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
								{errors.emergencyContact?.message}
							</Text>
						</View>
					)}

					<View style={styles.customRowCheck}>
						<CheckboxController
							accessibilityRole="checkbox"
							name="acceptedFriend"
							control={control}
							colorCheckbox={colors.GREENDC1}
							onPress={(v) => {
								setValue('acceptedFriend', v);
							}}
							error={errors.acceptedFriend}
							children={
								<Text
									style={[styles.textCheckbox, { marginLeft: 10 }]}
									maxFontSizeMultiplier={1.3}
								>
									{t('consents.acceptedFriend')}
								</Text>
							}
						/>

					</View>
					{watch('acceptedFriend') == true && (
						<>
							<Text style={styles.titleConsents} maxFontSizeMultiplier={1.3}>
								{t('consents.titleFriend')}
							</Text>
							<Text style={styles.textConsents} maxFontSizeMultiplier={1.3}>
								{t('consents.descriptionFriend')}
							</Text>
							<Text style={styles.titleConsents} maxFontSizeMultiplier={1.3}>
								{t('consents.titleFriendOne')}
							</Text>
							<Input
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.nameFriendOne')}
								label={t('createAccount.inputs.nameFriendOne')}
								name={'nameFriendOne'}
								control={control}
								error={errors.nameFriendOne}
							/>
							<Input
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.relationShipFriendOne')}
								label={t('createAccount.inputs.relationShipFriendOne')}
								name={'relationShipFriendOne'}
								control={control}
								error={errors.relationShipFriendOne}
							/>
							<Input
								icon={<MobileAlt />}
								keyboardType="numeric"
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.numberFriendOne')}
								label={t('createAccount.inputs.numberFriendOne')}
								name={'numberFriendOne'}
								control={control}
								error={errors.numberFriendOne}
								mask={MASK.phone}
								autoCorrect={false}
							/>
							<View style={styles.hr} />
							<Text style={styles.titleConsents} maxFontSizeMultiplier={1.3}>
								{t('consents.titleFriendTwo')}
							</Text>
							<Input
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.nameFriendTwo')}
								label={t('createAccount.inputs.nameFriendTwo')}
								name={'nameFriendTwo'}
								control={control}
								error={errors.nameFriendTwo}
							/>
							<Input
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.relationShipFriendTwo')}
								label={t('createAccount.inputs.relationShipFriendTwo')}
								name={'relationShipFriendTwo'}
								control={control}
								error={errors.relationShipFriendTwo}
							/>
							<Input
								icon={<MobileAlt />}
								keyboardType="numeric"
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.numberFriendTwo')}
								label={t('createAccount.inputs.numberFriendTwo')}
								name={'numberFriendTwo'}
								control={control}
								error={errors.numberFriendTwo}
								mask={MASK.phone}
								autoCorrect={false}
							/>
							<View style={styles.hr} />
							<InputSelect
								icon={<User />}
								control={control}
								style={{ width: Dimensions.get('window').width * 0.90 }}
								label={t('createAccount.inputs.doYouHave')}
								items={doYouHaveOptions}
								placeholder={t('createAccount.placeholders.doYouHave')}
								onChange={(v) => {
									setValue('doYouHave', v);
								}}
								name="doYouHave"
								error={errors.doYouHave}
							/>
							<Input
								icon={<User />}
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t('createAccount.placeholders.legalGuardianName')}
								label={t('createAccount.inputs.legalGuardianName')}
								name={'legalGuardianName'}
								control={control}
								error={errors.legalGuardianName}
							/>
							<Input
								icon={<MobileAlt />}
								keyboardType="numeric"
								labelStyle={styles.label}
								inputStyle={styles.input}
								placeholder={t(
									'createAccount.placeholders.legalGuardianContacPhone',
								)}
								label={t('createAccount.inputs.legalGuardianContacPhone')}
								name={'legalGuardianContacPhone'}
								control={control}
								error={errors.legalGuardianContacPhone}
								mask={MASK.phone}
								autoCorrect={false}
							/>
						</>
					)}

					<View style={{ width: Dimensions.get('window').width * 0.90, marginBottom: 20 }}>
						<Text style={styles.titleRadioButtons} maxFontSizeMultiplier={1.3}>
							{t('patientRegistration.tittlePharmacy')}
						</Text>
					</View>
					<Input
						icon={<MapMarkerAlt />}
						mask={MASK.zip}
						labelStyle={styles.label}
						inputStyle={[styles.input, authPharmacy === false ? { backgroundColor: colors.GRAY_LIGHT_3 } : null]}
						editable={authPharmacy === true}
						onChangeText={(v) => {
							changePharmacyZip(v)
						}}
						placeholder={t('patientRegistration.pharmacyZip')}
						label={`${t('patientRegistration.pharmacyZip')} * `}
						name={'pharmacyZip'}
						error={errors.pharmacyZip}
					/>
					<InputSelect
						icon={<IconPharmacy />}
						labelStyle={styles.label}
						disabled={authPharmacy === false}
						style={{ width: Dimensions.get('window').width * 0.90 }}
						inputStyle={authPharmacy === false ? { backgroundColor: colors.GRAY_LIGHT_3 } : null}
						label={t('patientRegistration.pharmacy')}
						items={listOfPharmacies.map((data, i) => {
							return { key: i ?? '', label: data ?? '', value: data ?? '' };
						})}
						placeholder={t('patientRegistration.placeholders.pharmacy')}
						onChange={(v) => {
							setValue('pharmacy', v);
						}}
						control={control}
						error={authPharmacy ? errors.pharmacy : undefined}
						name={'pharmacy'}
						value={updateNamePharmacy ? '' : undefined}
					/>
					<RadioGroup
						style={{ width: Dimensions.get('window').width * 0.90, marginTop: 15 }}
						onChange={(v) => {
							if (v == 2) {
								const pharmacy = getValues('pharmacy');
								setValue('pharmacy', pharmacy ? pharmacy : 'NN');
								setError('pharmacy', {})
							} else {
								const pharmacy = getValues('pharmacy');
								setValue('pharmacy', pharmacy == 'NN' ? 'NN' : pharmacy);
							}
							setAuthPharmacy(v == 1 ? true : false)
							setValue('auth', v == 1 ? true : false);
							setError('auth', {})
						}}>
						<RadioButton
							value={1}
							textStyle={styles.item}
							title={t('patientRegistration.radioBtnTrue')} />
						<RadioButton
							value={2}
							style={{ marginTop: 10 }}
							textStyle={styles.item}
							title={t('patientRegistration.radioBtnFalse')} />
					</RadioGroup>
					{errors.auth?.message && (
						<View style={{ marginBottom: 10, width: Dimensions.get('window').width * 0.90, alignSelf: 'center', marginTop: -10 }}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}

					<Button
						style={{ marginVertical: 25 }}
						title={t('patientRegistration.button')}
						onPress={handleSubmit(onValidSubmit)}
					></Button>
					<Button
						accesibilityLabel={t('linkSupport')}
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
			) : (
				<></>
			)}
		</>
	);
};

export default Self;
