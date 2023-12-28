import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MASK } from 'ui-core/utils/mask';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { CreateAccountProps as Props } from './CreateAccount.types';
import componentStyles from './CreateAccount.styles';
import Input from 'src/components/atoms/Input/Input';
//Images
import MobileAlt from 'icons/MobileAlt.svg';
import MapMarkerAlt from 'icons/MapMarkerAlt.svg';
import User from 'icons/User.svg';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import { windowDimentions } from 'ui-core/utils/globalStyles';

import RNPickerSelect from 'react-native-picker-select';
import ArrowDownIcon from 'icons/ArrowDownIcon.svg';
import { patientRelationship } from 'domain/entities/tempFormUser';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import useConsents from 'hooks/useConsents';

/**
 * Render a CreateAccount.
 * @since 1.0.0
 */
const CreateAccount: React.FC<Props> = (props) => {
	const { control, errors, elegibilityData, setValue, getValues, watch } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const {
		gendersOptions,
		sexualOrientationOptions,
		ethnicityOptions,
		raceOptions,
		preferedLanguageOptions,
		employmentStatusOptions,
		emergencyContactOptions,
	} = useConsents();

	return (
		<>
			<Text
				style={{
					alignSelf: 'flex-start',
					fontSize: 14,
					color: colors.BLUEDC1,
					fontFamily: 'proxima-bold',
					marginBottom: 18,
				}}
			>
				{t('consents.requiredFields')}
			</Text>
			<Input
				mask={MASK.phone}
				keyboardType="numeric"
				icon={<MobileAlt />}
				value={elegibilityData?.homePhone}
				editable={elegibilityData && false}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.homePhone')}
				label={t('createAccount.inputs.homePhone')}
				name={'homePhone'}
				control={control}
				error={errors.homePhone}
			/>
			<Input
				icon={<MapMarkerAlt />}
				value={elegibilityData?.address1}
				editable={elegibilityData && false}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.address1')}
				label={t('createAccount.inputs.address1')}
				name={'address1'}
				control={control}
				error={errors.address1}
			/>
			<Input
				icon={<MapMarkerAlt />}
				value={elegibilityData?.address2}
				editable={elegibilityData && false}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.address2')}
				label={t('createAccount.inputs.address2')}
				name={'address2'}
				control={control}
			/>
			<Input
				icon={<MapMarkerAlt />}
				value={elegibilityData?.city}
				editable={elegibilityData && false}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.city')}
				label={t('createAccount.inputs.city')}
				name={'city'}
				control={control}
				error={errors.city}
			/>
			<Input
				icon={<MapMarkerAlt />}
				keyboardType="numeric"
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.zip')}
				label={t('createAccount.inputs.zipCode')}
				name={'zipCode'}
				control={control}
				mask={MASK.zip}
				value={elegibilityData?.zipCode}
				editable={elegibilityData && false}
				error={errors.zipCode}
			/>
			<Input
				icon={<MapMarkerAlt />}
				keyboardType="numeric"
				value={elegibilityData?.ssn}
				editable={elegibilityData && false}
				mask={MASK.ssn}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.ssn')}
				label={'SSN'}
				name={'ssn'}
				control={control}
				error={errors.ssn}
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
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.emergencyName')}
				label={t('createAccount.inputs.emergencyName')}
				name={'emergencyContactName'}
				control={control}
				error={errors.emergencyContactName}
			/>
			<Input
				icon={<User />}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.emergencyLastName')}
				label={t('createAccount.inputs.emergencyLastName')}
				name={'emergencyContactLastName'}
				control={control}
				error={errors.emergencyContactLastName}
			/>
			<Input
				icon={<MobileAlt />}
				keyboardType="numeric"
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('patientRegistration.placeholders.emergencyMobile')}
				label={t('createAccount.inputs.emergencyMobile')}
				name={'emergencyContactMobile'}
				control={control}
				error={errors.emergencyContactMobile}
				mask={MASK.phone}
				autoCorrect={false}
			/>
			{/*  */}

			<InputSelect
				icon={<User />}
				control={control}
				style={{ width: Dimensions.get('window').width * 0.9 }}
				label={t('createAccount.inputs.emergencyRelationship')}
				items={emergencyContactOptions}
				placeholder={t('patientRegistration.placeholders.emergencyRelationship')}
				onChange={(v, index) => {
					const selectedItem =
						index == 0 ? { value: '', label: '' } : emergencyContactOptions[index - 1];
					setValue('emergencyRelationship', selectedItem.value);
				}}
				name="emergencyRelationship"
				error={errors.emergencyRelationship}
			/>
			{watch('emergencyRelationship') == 'O' && (
				<Input
					keyboardType="ascii-capable"
					inputStyle={{
						width: Dimensions.get('window').width * 0.9,
						paddingLeft: 20,
					}}
					placeholder={t('createAccount.placeholders.other')}
					name={'emergencyRelationshipOther'}
					control={control}
					error={errors.emergencyRelationshipOther}
					value={getValues('emergencyRelationshipOther')}
					onChange={(e) => {
						setValue('emergencyRelationshipOther', e.nativeEvent.text);
					}}
				/>
			)}
			{errors.emergencyRelationship && !getValues('emergencyRelationship') && (
				<View style={[{ marginBottom: 10, width: windowDimentions.width * 0.9 }]}>
					<Text
						style={{
							color: colors.DANGER,
							fontFamily: 'proxima-regular',
							fontSize: 12,
						}}
						adjustsFontSizeToFit
						maxFontSizeMultiplier={1.3}
					>
						{t(`errors.required`)}
					</Text>
				</View>
			)}

			<Text style={styles.text} maxFontSizeMultiplier={1.3}>
				{t('createAccount.inputs.emergencyContact')}
			</Text>
			<RadioGroup
				style={styles.customRow}
				onChange={(v) => {
					if (v == 1) {
						setValue('emergencyContact', true);
					} else {
						setValue('emergencyContact', false);
					}
				}}
			>
				<RadioButton
					accessibilityRole="radio"
					value={1}
					style={{
						paddingRight: 20,
					}}
					textStyle={styles.item}
					title={t('patientRegistration.placeholders.emergencyYes')}
				/>
				<RadioButton
					accessibilityRole="radio"
					value={2}
					style={{
						paddingRight: 20,
						paddingLeft: 20,
					}}
					textStyle={styles.item}
					title={t('patientRegistration.placeholders.emergencyNo')}
				/>
			</RadioGroup>
			{errors.emergencyContact && (
				<View
					style={{
						marginBottom: 20,
						marginTop: -10,
						width: windowDimentions.width * 0.9,
					}}
				>
					<Text
						style={{
							color: colors.DANGER,
							fontFamily: 'proxima-regular',
							fontSize: 12,
						}}
						adjustsFontSizeToFit
						maxFontSizeMultiplier={1.3}
					>
						{t(`errors.required`)}
					</Text>
				</View>
			)}
		</>
	);
};

export default CreateAccount;

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingLeft: 20,
	},
	inputAndroid: {
		fontSize: 14,
		color: '#757575',
		paddingRight: 40,
		paddingLeft: 15,
	},
});
