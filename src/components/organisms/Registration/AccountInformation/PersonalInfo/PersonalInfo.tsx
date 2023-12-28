import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MASK } from 'ui-core/utils/mask';
//Component
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import Input from 'src/components/atoms/Input/Input';

// Types, Styles
import { PersonalInfoProps as Props } from './PersonalInfo.types';
//Images
import MobileAlt from 'icons/MobileAlt.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import MapMarkerAlt from 'icons/MapMarkerAlt.svg';
import User from 'icons/User.svg';
import { useAppSelector, useAppDispatch } from 'adapter/hooks';
import useConsents from '../../../../../hooks/useConsents';
import moment from 'moment';
import IconLanguage from 'icons/PersonalInfoIcons/language.svg';
import IconJob from 'icons/PersonalInfoIcons/suitcase.svg';

/**
 * Render a PersonalInfo.
 * @since 1.0.0
 */
const PersonalInfo: React.FC<Props> = (props) => {
	const { control, errors, setValue, clearTemp, elegibilityData } = props;
	const { t } = useTranslation();
	const tempUserSSO = useAppSelector((state) => state.user.tempUserSSO);
	const tempEmailSSOEdited = useAppSelector((state) => state.user.tempEmailSSOEdited);
	const [showGenderIdentityOther, setShowGenderIdentityOther] = useState<boolean>(false);
	const [showSexualOrientationOther, setShowSexualOrientationOther] = useState<boolean>(false);
	const [showPreferedLanguageOther, setShowPreferedLanguageOther] = useState<boolean>(false);
	const [isEmployer, setIsEmployer] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const {
		gendersOptions,
		sexualOrientationOptions,
		ethnicityOptions,
		raceOptions,
		preferedLanguageOptions,
		employmentStatusOptions,
	} = useConsents();

	const [showRaceOther, setShowRaceOther] = useState<boolean>(false);

	useEffect(() => {
		setValue('firstName', elegibilityData?.firstName);
		setValue('lastName', elegibilityData?.lastName);
		if (elegibilityData && elegibilityData?.birthdate) {
			setValue('dateOfBirth', moment(new Date(elegibilityData?.birthdate)));
		}
		setValue('email', elegibilityData?.email);
		setValue('mobile', elegibilityData?.cellphone);
		setValue('sex', elegibilityData?.gender);
		setValue('state', elegibilityData?.state);
	}, [elegibilityData]);

	return (
		<>
			<Input
				icon={<User />}
				keyboardType="name-phone-pad"
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('patientRegistration.placeholders.firstName')}
				label={t('createAccount.inputs.firstName')}
				name={'firstName'}
				control={control}
				error={errors.firstName}
				editable={elegibilityData && false}
			/>
			<Input
				icon={<User />}
				keyboardType="name-phone-pad"
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('patientRegistration.placeholders.lastName')}
				label={t('createAccount.inputs.lastName')}
				name={'lastName'}
				control={control}
				error={errors.lastName}
				editable={elegibilityData && false}
			/>
			<DatePickerController
				control={control}
				label={t('createAccount.inputs.dateBirth')}
				error={errors.dateOfBirth}
				name={'dateOfBirth'}
				pikerStyle={{ width: Dimensions.get('window').width * 0.85 }}
				//valueDate={elegibilityData?.birthdate && moment(new Date(elegibilityData?.birthdate))}
				editable={elegibilityData && false}
			/>
			{elegibilityData && (
				<>
					<Input
						icon={<User />}
						inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
						placeholder={t('patientRegistration.placeholders.gender')}
						label={t('createAccount.inputs.sex')}
						name={'sex'}
						error={errors.lastName}
						value={
							elegibilityData?.gender === 'F'
								? t('sex.F')
								: elegibilityData?.gender === 'M'
								? t('sex.M')
								: elegibilityData?.gender === 'U'
								? t('sex.U')
								: ''
						}
						editable={elegibilityData && false}
					/>
					<Input
						icon={<MapMarkerAlt />}
						inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.state') + '*'}
						placeholder={t('patientRegistration.placeholders.state')}
						name="state"
						error={errors.state}
						value={'FL'}
						editable={elegibilityData && false}
					/>
				</>
			)}
			{!clearTemp ? (
				<>
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.sex')}
						items={[
							{ key: 1, label: t('sex.F'), value: 'F' },
							{ key: 2, label: t('sex.M'), value: 'M' },
							{ key: 3, label: t('sex.D'), value: 'U' },
						]}
						placeholder={t('patientRegistration.placeholders.gender')}
						onChange={(v) => {
							setValue('sex', v);
						}}
						name="sex"
						error={errors.sex}
					/>
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.sexIdentity')}
						items={gendersOptions}
						placeholder={t('patientRegistration.placeholders.genderIdentity')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : gendersOptions[index - 1];

							if (v == 'O') {
								setShowGenderIdentityOther(true);
							} else {
								setShowGenderIdentityOther(false);
								setValue('genderIdentityOther', '');
							}
							setValue('genderIdentity', selectedItem.value);
							setValue('genderIdentityLabel', selectedItem.label);
						}}
						name="genderIdentity"
						error={errors.genderIdentity}
					/>
					{showGenderIdentityOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.85,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'genderIdentityOther'}
							control={control}
							error={errors.genderIdentityOther}
						/>
					)}
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
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
							if (v == 'O') {
								setShowSexualOrientationOther(true);
							} else {
								setShowSexualOrientationOther(false);
								setValue('sexualOrientiationOther', '');
							}
						}}
						name="sexualOrientiation"
						error={errors.sexualOrientiation}
					/>
					{showSexualOrientationOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.85,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'sexualOrientiationOther'}
							control={control}
							error={errors.sexualOrientiationOther}
						/>
					)}
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
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
					/>
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.race')}
						items={raceOptions}
						placeholder={t('patientRegistration.placeholders.race')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : raceOptions[index - 1];

							setValue('race', selectedItem.value);
							setValue('raceLabel', selectedItem.label);
							if (v === 'O') {
								setShowRaceOther(true);
							} else {
								setShowRaceOther(false);
								setValue('raceOther', '');
							}
						}}
						name="race"
						error={errors.race}
					/>
					{showRaceOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.85,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'raceOther'}
							control={control}
							error={errors.raceOther}
						/>
					)}
					<InputSelect
						icon={<IconLanguage />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.languagePreference')}
						items={preferedLanguageOptions}
						placeholder={t('patientRegistration.placeholders.languagePreference')}
						onChange={(v, index) => {
							const selectedItem =
								index == 0 ? { value: '', label: '' } : ethnicityOptions[index - 1];

							setValue('languagePreference', selectedItem.value);
							setValue('languagePreferenceLabel', selectedItem.label);
							setShowPreferedLanguageOther(false);
							setValue('languagePreferenceOther', '');
						}}
						name="languagePreference"
						error={errors.languagePreference}
					/>
					{showPreferedLanguageOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.85,
								paddingLeft: 20,
							}}
							placeholder={t('createAccount.placeholders.other')}
							name={'languagePreferenceOther'}
							control={control}
							error={errors.languagePreferenceOther}
						/>
					)}
					<InputSelect
						icon={<User />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.maritalStatus')}
						items={[
							{
								key: 1,
								label: t('maritalStatus.single'),
								value: t('maritalStatus.single'),
							},
							{
								key: 2,
								label: t('maritalStatus.married'),
								value: t('maritalStatus.married'),
							},
							{
								key: 3,
								label: t('maritalStatus.divorced'),
								value: t('maritalStatus.divorced'),
							},
							{
								key: 4,
								label: t('maritalStatus.widowed'),
								value: t('maritalStatus.widowed'),
							},
							{
								key: 5,
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
					/>
					<InputSelect
						icon={<IconJob />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.employmentStatus')}
						items={employmentStatusOptions}
						placeholder={t('patientRegistration.placeholders.employmentStatus')}
						onChange={(v) => {
							if (v == 1 || v == 2) setIsEmployer(true);
							else {
								setIsEmployer(false);
								setValue('employerName', '');
								setValue('workPhone', '');
							}
							setValue('employmentStatus', v);
						}}
						name="employmentStatus"
						error={errors.employmentStatus}
					/>
					{isEmployer && (
						<>
							<Input
								icon={<User />}
								keyboardType="name-phone-pad"
								inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
								placeholder={t('patientRegistration.placeholders.employerName')}
								label={t('createAccount.inputs.employerName')}
								name={'employerName'}
								control={control}
								error={errors.employerName}
							/>
							<Input
								icon={<MobileAlt />}
								keyboardType="numeric"
								mask={MASK.phone}
								inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
								placeholder={t('patientRegistration.placeholders.workPhone')}
								label={t('createAccount.inputs.workPhone')}
								name={'workPhone'}
								control={control}
								error={errors.workPhone}
								autoCorrect={false}
							/>
						</>
					)}
					<InputSelect
						icon={<MapMarkerAlt />}
						control={control}
						style={{ width: Dimensions.get('window').width * 0.85 }}
						label={t('createAccount.inputs.state') + '*'}
						items={[
							{ key: 1, label: 'Florida', value: 'FL' },
							{ key: 2, label: 'Tennessee', value: 'TN' },
						]}
						placeholder={t('patientRegistration.placeholders.state')}
						onChange={(v) => {
							setValue('state', v);
						}}
						name="state"
						error={errors.state}
					/>
				</>
			) : (
				<></>
			)}
			<Input
				icon={<EnvelopeIcon />}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('patientRegistration.placeholders.eMail')}
				label={t('createAccount.inputs.eMail')}
				keyboardType="email-address"
				name={'email'}
				control={control}
				error={errors.email}
				editable={
					tempUserSSO && tempUserSSO != 'NO_FB' && tempEmailSSOEdited
						? true
						: elegibilityData
						? !elegibilityData.email
							? true
							: false
						: true
				}
			/>

			<Input
				icon={<MobileAlt />}
				keyboardType="numeric"
				mask={MASK.phone}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('patientRegistration.placeholders.mobile')}
				label={t('createAccount.inputs.mobile')}
				name={'mobile'}
				control={control}
				error={errors.mobile}
				autoCorrect={false}
				editable={elegibilityData && !elegibilityData.cellphone}
			/>

			<View style={{ marginBottom: 23 }}></View>
		</>
	);
};

export default PersonalInfo;
