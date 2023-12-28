import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Dimensions, View, Text, StyleSheet } from 'react-native';
import Input from 'src/components/atoms/Input/Input';
import { MASK } from 'ui-core/utils/mask';
import { EditAccountInf, EditAccountProps, listGender, mapsListGender } from './EditAccount.types';
import { yupResolver } from '@hookform/resolvers/yup';
import componentStyles from './EditAccount.styles';
import RNPickerSelect from 'react-native-picker-select';


import MessageCheck from 'icons/message-check.svg';
import IconUser from 'icons/PersonalInfoIcons/user.svg';
import IconSex from 'icons/PersonalInfoIcons/sex.svg';
import IconMail from 'icons/PersonalInfoIcons/mail.svg';
import IconPhoneRotary from 'icons/PersonalInfoIcons/phone-rotary.svg';
import IconLocationDot from 'icons/PersonalInfoIcons/location-dot.svg';
import IconMapMarkedAlt from 'icons/PersonalInfoIcons/map-marked-alt.svg';
import IconCity from 'icons/PersonalInfoIcons/city.svg';
import IconFlagUsa from 'icons/PersonalInfoIcons/flag-usa.svg';
import ArrowDownIcon from 'icons/ArrowDownIcon.svg';
import IconMarital from 'icons/PersonalInfoIcons/marital.svg';
import MobileAlt from 'icons/PersonalInfoIcons/mobile-alt.svg';
import FORMATS from 'ui-core/utils/formats';
import moment from 'moment';
import useStyles from 'hooks/useStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'src/components/atoms/Button/Button';
import AuthService from 'adapter/api/authService';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useNavigation } from '@react-navigation/native';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import useConsents from 'hooks/useConsents';

//Images
import User from 'icons/User.svg';
import IconLanguage from 'icons/PersonalInfoIcons/language.svg';
import IconJob from 'icons/PersonalInfoIcons/suitcase.svg';
import { getMaritalStatusLabel } from 'src/screens/Notifications/UtilNotifications';
import { AnyAction } from '@reduxjs/toolkit';

export const EditForm: React.FC<{ personalData: any, listCurrentMarital: string[], listMaritalStatusEN: string[] }> = (props) => {

	const { personalData, listCurrentMarital, listMaritalStatusEN } = props;
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const { t } = useTranslation();
	const { styles, colors } = useStyles(componentStyles);
	const [updateUsersPatientInfo] = AuthService.useUpdateUsersPatientInfoMutation();
	const { setModal, closeModal } = useBottomSheet();
	const navigation = useNavigation();
	const [showRaceOther, setShowRaceOther] = useState<boolean>(false);
	const employmentStatusRestrictions = ['1', '2'];
	const items = [
		{ key: 1, label: t('maritalStatus.single'), value: t('maritalStatus.single') },
		{ key: 2, label: t('maritalStatus.married'), value: t('maritalStatus.married') },
		{ key: 3, label: t('maritalStatus.divorced'), value: t('maritalStatus.divorced') },
		{ key: 4, label: t('maritalStatus.widowed'), value: t('maritalStatus.widowed') },
		{ key: 5, label: t('maritalStatus.declined'), value: t('maritalStatus.declined') },
	];

	const [valueMarital, setValueMarital] = useState(getMaritalStatusLabel(personalData?.maritalStatus, items).value);
	const [valueGender, setValueGender] = useState(personalData?.sex);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		clearErrors,
		watch,
	} = useForm<EditAccountProps>({
		resolver: yupResolver(EditAccountInf),
		mode: 'onBlur'
	});

	const {
		gendersOptions,
		sexualOrientationOptions,
		ethnicityOptions,
		raceOptions,
		preferedLanguageOptions,
		employmentStatusOptions,
		showGenderIdentityOther,
		showSexualOrientationOther,
		setStateOther
	} = useConsents();



	useEffect(() => {
		/* Value ID */
		setValue('genderIdentity', personalData?.genderIdentity?.id);
		setValue('etnicity', personalData?.ethnicity?.id);
		setValue('sexualOrientiation', personalData?.sexualOrientation?.id);
		setValue('race', personalData?.race?.id);
		setValue('languagePreference', personalData?.preferedLanguage?.id);
		setValue('employmentStatus', personalData?.employmentStatus?.id);
		setValue('employerName', personalData?.employerName );
		setValue('workPhone', personalData?.workPhone );
		/* Othres */
		setValue('genderIdentityOther', personalData?.genderIdentity?.description);
		setValue('sexualOrientiationOther', personalData?.sexualOrientation?.description);
		setValue('raceOther', personalData?.race?.description);


		setValue('sex', valueGender);
		setValue('maritalStatus', valueMarital == null ? "" : valueMarital);
	}, [personalData, employmentStatusOptions]);

	const onSubmit = useCallback(async (value: EditAccountProps) => {
		try {
			await updateUsersPatientInfo({ ...value, authUid }).unwrap();
			updateOk()
		} catch (error) {
		}
	}, [updateUsersPatientInfo, authUid])

	const updateOk = () => {
		setModal({
			render: () => (
				<ModalWarning
					icon={<MessageCheck />}
					warningText={t('personalInformation.modalOk')}
					styleSubtitle={{ fontSize: 14, color: '#212121' }}
					onPress={() => { closeModal(); navigation.goBack() }}
				/>
			), height: 310, blockModal: true
		})
	}

	const sureToSaveChanges = (value: EditAccountProps) => {

		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					warningText={t('personalInformation.modalSereChange')}
					textButton={t('common.yes')}
					textButtonCancel={t('common.no')}
					styleBtnCancel={{ width: 'auto' }}
					onPressCancel={closeModal}
					onPress={() => { closeModal(); onSubmit(value) }}
				/>
			), height: 280
		})
	}

	useEffect(() => {
		if (!employmentStatusRestrictions.includes(watch('employmentStatus') ?? '')) {
		  setValue('employerName', '');
		  clearErrors('employerName');
		  setValue('workPhone', '');
		  clearErrors('workPhone');
		}
	  }, [watch('employmentStatus')]);
	

	return (
		<KeyboardAwareScrollView
			enableAutomaticScroll
			keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
			enableOnAndroid={true}
		>
			<View style={{ alignItems: 'center', marginTop: 30 }}>
				<Input
					icon={<IconUser />}
					keyboardType='name-phone-pad'
					placeholder={t('personalInformation.first')}
					label={t('personalInformation.first')}
					name={'firstName'}
					value={personalData?.firstName ?? ''}
					editable={false}
					labelStyle={{ color: '#757575' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
						backgroundColor: '#DBDBDB'
					}}
				/>
				<Input
					icon={<IconUser />}
					keyboardType='name-phone-pad'
					placeholder={t('personalInformation.last')}
					label={t('personalInformation.last')}
					name={'lastName'}
					value={personalData?.lastName ?? ''}
					editable={false}
					labelStyle={{ color: '#757575', marginTop: 10 }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
						backgroundColor: '#DBDBDB'
					}}
				/>
				<Input
					icon={<IconUser />}
					keyboardType='name-phone-pad'
					placeholder={t('personalInformation.date')}
					label={t('personalInformation.date')}
					name={'birthdate'}
					value={personalData?.birthdate || personalData?.dateOfBirth ? moment(personalData?.birthdate ?? personalData?.dateOfBirth).format(FORMATS.date) : ''}
					editable={false}
					labelStyle={{ color: '#757575', marginTop: 10 }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
						backgroundColor: '#DBDBDB'
					}}
				/>




				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('personalInformation.gender') + ' *'}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<IconSex />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v) => {
							setValue('sex', v);
							setValueGender(v)
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						style={pickerSelectStyles}
						placeholder={{ label: t('personalInformation.gender') }}
						value={mapsListGender(valueGender)}
						items={listGender()}
					/>
				</View>
				{errors.sex && !getValues('sex') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}

				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.sexIdentity')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<User fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							const selectedItem = index == 0 ? { value: '', label: '' } : gendersOptions[index - 1];
							if (v == "O") {
								setStateOther('showGenderIdentityOther', true);
							} else {
								setStateOther('showGenderIdentityOther', false);
								setValue('genderIdentityOther', '');
							}
							setValue('genderIdentity', v);
							setValue('genderIdentityLabel', selectedItem.label);
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={gendersOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.genderIdentity') }}
						value={getValues('genderIdentity')}
					/>
				</View>
				{errors?.genderIdentity && !getValues('genderIdentity') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}
				{
					showGenderIdentityOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{ width: Dimensions.get('window').width * 0.85, paddingLeft: 20 }}
							placeholder={t('createAccount.placeholders.other')}
							name={'genderIdentityOther'}
							control={control}
							error={errors.genderIdentityOther}
						/>
					)
				}
				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.sexualOrientation')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<User fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							const selectedItem = index == 0 ? { value: '', label: '' } : sexualOrientationOptions[index - 1];

							setValue('sexualOrientiation', selectedItem.value);
							setValue('sexualOrientiationLabel', selectedItem.label);

							if (v == "O") {
								setStateOther('showSexualOrientationOther', true);
							} else {
								setStateOther('showSexualOrientationOther', false);
								setValue('sexualOrientiationOther', '');
								clearErrors('sexualOrientiationOther', '');
							}
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={sexualOrientationOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.sexualOrientation') }}
						value={getValues('sexualOrientiation')}
					/>
				</View>
				{errors?.sexualOrientiation && !getValues('sexualOrientiation') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}
				{
					showSexualOrientationOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{ width: Dimensions.get('window').width * 0.85, paddingLeft: 20 }}
							placeholder={t('createAccount.placeholders.other')}
							name={'sexualOrientiationOther'}
							control={control}
							error={errors.sexualOrientiationOther}
							multiline={personalData?.sexualOrientation?.description.length > 31}		
						/>

					)
				}
				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.ethnicity')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<User fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							const selectedItem = index == 0 ? { value: '', label: '' } : ethnicityOptions[index - 1];
							setValue('etnicity', selectedItem.value)
							setValue('etnicityLabel', selectedItem.label);
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={ethnicityOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.ethnicity') }}
						value={getValues('etnicity')}
					/>
				</View>
				{errors?.etnicity && !getValues('etnicity') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}

				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.race')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<User fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							const selectedItem = index == 0 ? { value: '', label: '' } : raceOptions[index - 1];
							setValue('race', v);
							setValue('raceLabel', selectedItem.label);

							if (v == "O") {
								setShowRaceOther(true)
							} else {
								setShowRaceOther(false)
								setValue('raceOther', '');
								clearErrors('raceOther', '');
							}
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={raceOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.race') }}
						value={getValues('race')}
					/>
				</View>
				{errors?.race && !getValues('race') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}
				{
					showRaceOther && (
						<Input
							keyboardType="name-phone-pad"
							inputStyle={{ width: Dimensions.get('window').width * 0.85, paddingLeft: 20 }}
							placeholder={t('createAccount.placeholders.other')}
							name={'raceOther'}
							control={control}
							error={errors.raceOther}
							multiline={personalData?.race?.description.length > 31}
						/>
					)
				}

				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.languagePreference')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<IconLanguage fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							const selectedItem = index == 0 ? { value: '', label: '' } : preferedLanguageOptions[index - 1];

							setValue('languagePreference', selectedItem.value);
							setStateOther('showPreferedLanguageOther', false);
							setValue('languagePreferenceOther', '');

							setValue('languagePreferenceLabel', v);

						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={preferedLanguageOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.languagePreference') }}
						value={getValues('languagePreference')}
					/>
				</View>
				{errors?.languagePreference && !getValues('languagePreference') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}

				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{`${t('personalInformation.marital')}*`}</Text>
				</View>
				<View style={styles.containerSelect}>
					<IconMarital />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v) => {
							if (!v) {
								setValue('maritalStatus', "");
								setValueMarital("");
								return;
							}
							setValue('maritalStatus', v);
							setValueMarital(v)
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.maritalStatus') }}
						items={items}
						value={valueMarital}
					/>
				</View>
				{errors?.maritalStatus && !valueMarital && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}

				<View style={styles.labelContainer}>
					<Text style={styles.labelSelected} maxFontSizeMultiplier={1.3}>{t('createAccount.inputs.employmentStatus')}</Text>
				</View>
				<View style={[styles.containerSelect, { marginBottom: 5 }]}>
					<IconJob fill={"#5B5C5B"} />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v, index) => {
							if(!!index) {
								const selectedItem = employmentStatusOptions[index - 1];
								setValue('employmentStatus', selectedItem.value)
								setValue('employmentStatusLabel', selectedItem.label);	
							}
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						items={employmentStatusOptions}
						style={pickerSelectStyles}
						placeholder={{ label: t('patientRegistration.placeholders.employmentStatus') }}
						value={watch('employmentStatus') ?? null}
					/>
				</View>
				{errors?.employmentStatus && !getValues('employmentStatus') && (
					<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
					</View>
				)}

				{employmentStatusRestrictions.includes(watch('employmentStatus') ?? '') ? (
					<>
						<Input
							control={control}
							icon={<User />}
							keyboardType="name-phone-pad"
							inputStyle={{
								width: Dimensions.get('window').width * 0.85
							}}
							placeholder={t('patientRegistration.placeholders.employerName')}
							label={t('createAccount.inputs.employerName')}
							name={'employerName'}
							error={errors.employerName}
							value={watch('employerName')}
							multiline={personalData?.employerName && personalData.employerName.length > 31}
						/>
						<Input
							control={control}
							icon={<MobileAlt />}
							keyboardType="numeric"
							mask={MASK.phone}
							inputStyle={{
								width: Dimensions.get('window').width * 0.85
							}}
							placeholder={t('patientRegistration.placeholders.workPhone')}
							label={t('createAccount.inputs.workPhone')}
							name={'workPhone'}
							error={errors.workPhone}
							autoCorrect={false}
							value={watch('workPhone')}
						/>
					</>
				) : (
					<></>
				)}

				<Input
					icon={<IconMail />}
					keyboardType='name-phone-pad'
					placeholder={t('personalInformation.email')}
					label={t('personalInformation.email')}
					name={'email'}
					value={personalData?.email ?? ''}
					editable={false}
					labelStyle={{ color: '#757575' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
						backgroundColor: '#DBDBDB'
					}}
				/>
				<Input
					icon={<IconPhoneRotary />}
					keyboardType='numeric'
					mask={MASK.phone}
					placeholder={t('personalInformation.mobileHome')}
					label={t('personalInformation.mobileHome')}
					name={'homePhone'}
					control={control}
					error={errors.homePhone}
					value={personalData?.homePhone ?? ''}
					labelStyle={{ color: '#022F58' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
					}}
				/>
				<Input
					icon={<MobileAlt />}
					keyboardType='numeric'
					mask={MASK.phone}
					placeholder={t('personalInformation.mobile')}
					label={t('personalInformation.mobile') + ' *'}
					name={'mobile'}
					error={errors.mobile}
					control={control}
					value={personalData?.mobile ?? ''}
					labelStyle={{ color: '#022F58' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
					}}
				/>
				<Input
					icon={<IconLocationDot />}
					placeholder={t('personalInformation.address')}
					label={t('personalInformation.address') + ' *'}
					name={'address'}
					control={control}
					error={errors.address}
					value={personalData?.address1 ?? ''}
					labelStyle={{ color: '#022F58' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85
					}}
					multiline={personalData?.address1 && personalData.address1.length > 31}				
					/>
				<Input
					icon={<IconMapMarkedAlt />}
					placeholder={t('personalInformation.zip')}
					label={t('personalInformation.zip') + ' *'}
					mask={MASK.zip}
					name={'zipCode'}
					control={control}
					error={errors.zipCode}
					value={personalData?.zipCode ?? ''}
					labelStyle={{ color: '#022F58' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85
					}}
				/>
				<Input
					icon={<IconCity />}
					placeholder={t('personalInformation.city')}
					label={t('personalInformation.city') + ' *'}
					name={'city'}
					control={control}
					error={errors.city}
					value={personalData?.city ?? ''}
					labelStyle={{ color: '#022F58' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85
					}}
					multiline={personalData?.city && personalData?.city.length > 31}

				/>
				<Input
					icon={<IconFlagUsa />}
					keyboardType='name-phone-pad'
					placeholder={t('personalInformation.state')}
					label={t('personalInformation.state')}
					name={'state'}
					control={control}
					value={personalData?.state ?? ''}
					editable={false}
					labelStyle={{ color: '#757575' }}
					inputStyle={{
						width: Dimensions.get('window').width * 0.85,
						backgroundColor: '#DBDBDB',
						marginBottom: 50
					}}
				/>
				<Button title={t('common.update')} style={{ marginBottom: 100 }} onPress={handleSubmit(sureToSaveChanges)} />
			</View>
		</KeyboardAwareScrollView>
	);
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingLeft: 20
	},
	inputAndroid: {
		fontSize: 14,
		color: '#757575',
		paddingRight: 40,
		paddingLeft: 15
	}
});