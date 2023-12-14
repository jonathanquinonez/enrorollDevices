import { ScrollView } from '@nandorojo/anchor';
import Row from 'src/components/atoms/Row/Row';

import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import componentStyles from './VitalSign.styles';
import Input from 'src/components/atoms/Input/Input';

import InfoGreen from 'assets/icons/infoGreen.svg';
import WeightScale from 'assets/icons/weight-scale.svg';
import CircleQuestion from 'assets/icons/circle-question.svg';
import HeightIcon from 'assets/icons/height-icon.svg';
import CalendarIcon from 'assets/icons/calendar-day2.svg';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { Colors } from 'config/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Column from 'src/components/atoms/Column/Column';
import Button from 'src/components/atoms/Button/Button';
import VitalSeignService from 'adapter/api/vitalsignService';
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { VitalSchema, VitalSignFormProps } from './VitalSign.types';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { filterByDate, returnGender } from '../Symtoms/utils';
import { userActions } from 'adapter/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VitalSignForm = () => {
	const { styles, colors } = useStyles(componentStyles);
	const navigation: any = useNavigation();
	const { email } = useAppSelector(userSelectors.selectUser);

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		setValue,
		getValues,
		clearErrors,
		reset,
	} = useForm<VitalSignFormProps>({
		resolver: yupResolver<any>(VitalSchema),
		mode: 'onBlur'
	})

	const [NuralogixURL] = VitalSeignService.useGenerateURLMutation();
	const userInformation = useAppSelector(userSelectors.selectUser);

	const [gender, setGender] = React.useState<string>(returnGender(userInformation.sex ?? ''))
	const [smoking, setSmoking] = React.useState<string>('')
	const [antihypertensive, setAntihypertensive] = React.useState<string>('')
	const [bloodpressuremedication, setBloodpressuremedication] = React.useState<string>('')
	const [diabetes, setDiabetes] = React.useState<string>('')
	const [diabetes2, setDiabetes2] = React.useState<string>('')
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	useEffect(() => { if (returnGender(userInformation.sex ?? '')) setValue('radio1', true) }, [userInformation])

	const [todayData, setTodayData] = useState<any[]>([])

	const getDataHistory = async () => {
		let getHistory: any = await AsyncStorage.getItem(`${email}mySanitas`);
		getHistory = JSON.parse(getHistory);
		const [todayD] = filterByDate(getHistory ?? [], new Date())
		setTodayData(todayD ?? [])
	}
	useEffect(() => {
		getDataHistory();
		AsyncStorage.setItem(`${email}mySanitas`, 'eliminar');
	}, [])

	const handlerNuralogix = async () => {
		const requestVital = {
			identifier: 1675779564811,
			age: getValues().age,
			height: getValues().height,
			weight: getValues().weight,
			gender,
			smoking,
			antihypertensive,
			bloodpressuremedication,
			diabetes
		}
		const response: any = await NuralogixURL(requestVital);
		console.log('---->>response---->>',response)
		navigation.navigate('VitalSignScanner', { url: response.data?.nuralogixUrl })
	}

	return (
		<ScrollView>
			<Row style={[styles.row_container, { marginVertical: 15 }]}>
				<InfoGreen />
				<Text style={styles.info1}>{t('wellness.vitalSign.info1')}</Text>
			</Row>
			<Row style={[styles.row_container, { justifyContent: 'space-between' }]}>
				<Input
					styleIcon={{ width: 32, paddingHorizontal: 5 }}
					noShowError
					placeholder={t('wellness.vitalSign.ph_age')}
					keyboardType="numeric"
					icon={<CalendarIcon />}
					labelStyle={styles.label_text}
					label={t('wellness.vitalSign.age')}
					name="age"
					control={control}
					autoCapitalize="none"
					inputStyle={{ width: windowDimentions.width * 0.26 }}
					error={errors.age}
				/>
				<View style={{ paddingHorizontal: 3 }}>
					<Input
						styleIcon={{ width: 32, paddingHorizontal: 5 }}
						noShowError
						placeholder={t('wellness.vitalSign.ph_height')}
						keyboardType="numeric"
						icon={<HeightIcon />}
						labelStyle={styles.label_text}
						label={t('wellness.vitalSign.height')}
						name="height"
						control={control}
						autoCapitalize="none"
						inputStyle={{ width: windowDimentions.width * 0.26 }}
						error={errors.height}
					/>
				</View>
				<Input
					styleIcon={{ width: 32, paddingHorizontal: 5 }}
					noShowError
					placeholder={t('wellness.vitalSign.ph_weight')}
					keyboardType="numeric"
					icon={<WeightScale />}
					labelStyle={styles.label_text}
					label={t('wellness.vitalSign.weight')}
					name="weight"
					control={control}
					autoCapitalize="none"
					inputStyle={{ width: windowDimentions.width * 0.26 }}
					error={errors.weight}
				/>
			</Row>
			<Row>
				<Column>
					<Text style={styles.label_text}>{t('wellness.vitalSign.text1')}<Text style={{ color: '#B50303' }}>*</Text></Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={gender === 'male'}
							onPress={() => { setGender('male'); setValue('radio1', true); clearErrors('radio1') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.male')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={gender === 'female'}
							onPress={() => { setGender('female'); setValue('radio1', true); clearErrors('radio1') }}
							title={t('wellness.vitalSign.female')}
							style={styles.radioButton}
						/>
					</View>
				</Column>
				<>
					{errors.radio1 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>
			<Row>
				<Column>
					<Text style={styles.label_text}>{t('wellness.vitalSign.text2')}<Text style={{ color: '#B50303' }}>*</Text></Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={smoking === '0'}
							onPress={() => { setSmoking('0'); setValue('radio2', true); clearErrors('radio2') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.true')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={smoking === '1'}
							onPress={() => { setSmoking('1'); setValue('radio2', true); clearErrors('radio2') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.false')}
						/>
					</View>
				</Column>
				<>
					{errors.radio2 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>
			<Row>
				<Column>
					<Text style={styles.label_text}>
						{t('wellness.vitalSign.text3')}<Text style={{ color: '#B50303' }}>*</Text>
					</Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={antihypertensive === '0'}
							onPress={() => { setAntihypertensive('0'); setValue('radio3', true); clearErrors('radio3') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.true')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={antihypertensive === '1'}
							onPress={() => { setAntihypertensive('1'); setValue('radio3', true); clearErrors('radio3') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.false')}
						/>
					</View>
				</Column>
				<>
					{errors.radio3 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>
			<Row>
				<Column>
					<Text style={styles.label_text}>{t('wellness.vitalSign.text4')}<Text style={{ color: '#B50303' }}>*</Text></Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={bloodpressuremedication === '0'}
							onPress={() => { setBloodpressuremedication('0'); setValue('radio4', true); clearErrors('radio4') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.true')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={bloodpressuremedication === '1'}
							onPress={() => { setBloodpressuremedication('1'); setValue('radio4', true); clearErrors('radio4') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.false')}
						/>
					</View>
				</Column>
				<>
					{errors.radio4 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>
			<Row>
				<Column>
					<Text style={styles.label_text}>{t('wellness.vitalSign.text5')}<Text style={{ color: '#B50303' }}>*</Text></Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={diabetes === '0'}
							onPress={() => { setDiabetes('0'); setValue('radio5', true); clearErrors('radio5') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.true')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={diabetes === '1'}
							onPress={() => { setDiabetes('1'); setValue('radio5', false); clearErrors('radio5') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.false')}
						/>
					</View>
				</Column>
				<>
					{errors.radio5 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>
			{diabetes == '0' && <Row>
				<Column>
					<Text style={styles.label_text}>{t('wellness.vitalSign.text6')}<Text style={{ color: '#B50303' }}>*</Text></Text>
				</Column>
				<Column style={styles.contentRow}>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={diabetes2 === '0'}
							onPress={() => { setDiabetes2('0'); setValue('radio6', true); clearErrors('radio6') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.type1')}
						/>
					</View>
					<View
						style={[
							styles.content_radio_button, styles.radio_button
						]}
					>
						<RadioButton
							btnType2
							isSelected={diabetes2 === '1'}
							onPress={() => { setDiabetes2('1'); setValue('radio6', true); clearErrors('radio6') }}
							style={styles.radioButton}
							title={t('wellness.vitalSign.type2')}
						/>
					</View>
				</Column>
				<>
					{errors.radio6 && (
						<View style={[{ marginBottom: 10, width: windowDimentions.width * .85 }]}>
							<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t(`errors.required`)}</Text>
						</View>
					)}
				</>
			</Row>}

			<Row style={[styles.row_container, { marginBottom: 15 }]}>
				<Button
					variant='Outlined'
					style={{ backgroundColor: 'transparent', width: undefined }}
					textStyle={{ fontFamily: 'proxima-bold', fontSize: 16, paddingHorizontal: 20 }}
					onPress={() => navigation.navigate('WellnessRecordsScreen')}
					title={t('wellness.vitalSign.seeLastReadings')}
				/>
			</Row>
			<Row style={[styles.row_container, { marginBottom: 20 }]}>
				<Button
					variant='Outlined'
					style={{ backgroundColor: 'transparent', width: 'auto', marginRight: 15 }}
					textStyle={{ fontFamily: 'proxima-bold', fontSize: 16, paddingHorizontal: 20 }}
					onPress={() => navigation.navigate('WellnessInstructionsScreen')}
					title={t('wellness.vitalSign.instructions')}
				/>
				<Button
					textStyle={{ paddingHorizontal: 20 }}
					disabled={todayData?.length >= 3}
					onPress={handleSubmit(handlerNuralogix)}
					title={t('wellness.vitalSign.start')}
				/>
			</Row>
			<Row style={[styles.row_container, { marginBottom: 80 }]}>
				<Text style={styles.info2}>{t('wellness.vitalSign.info2')}</Text>
				<CircleQuestion />
			</Row>
		</ScrollView>
	);
};
