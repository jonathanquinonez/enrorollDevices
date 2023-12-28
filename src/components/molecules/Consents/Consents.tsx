import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, Platform, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import useStyles from 'hooks/useStyles';
// Types, Styles
import { ConsentsYup, ConsentsList, ConsentsProps as Props } from './Consents.types';
import componentStyles from './Consents.styles';
import { CheckboxController } from 'src/components/atoms/Checkbox/Checkbox';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import Input from 'src/components/atoms/Input/Input';
import Button from 'src/components/atoms/Button/Button';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import { useForm } from 'react-hook-form';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
import RegisterService from 'adapter/api/registerService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useAppSelector } from 'adapter/hooks';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { userSelectors } from 'adapter/user/userSelectors';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useAppDispatch } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from '../ModalWarning/ModalWarning';
import SecondData from 'src/components/organisms/PatientRegistration/SecondData/SecondData';
import { TouchableWithoutFeedback } from 'react-native';

// Images
/**
 * Render a LoginForm.
 * @since 3.0.0
 */
const Consents = (props: Props) => {
	const { handlerNext, firstData, secondData, openwarning, statusMaintenance } = props;
	const { t, i18n } = useTranslation();
	const lng: string = i18n.language.slice(0, 2);
	const { styles, colors } = useStyles(componentStyles);
	const [isAccepted1, setIsAccepted1] = useState(false);
	const [isAccepted2, setIsAccepted2] = useState(false);
	const [isAccepted3, setIsAccepted3] = useState(false);
	const [isAccepted4, setIsAccepted4] = useState(false);
	const [isAccepted5, setIsAccepted5] = useState(false);
	const [isAccepted6, setIsAccepted6] = useState(false);
	const [isAccepted7, setIsAccepted7] = useState(false);
	const [isAccepted8, setIsAccepted8] = useState(false);
	const [isAccepted9, setIsAccepted9] = useState(false);
	const [finalSave] = RegisterService.useFinalSaveMutation();
	const [updateConsents] = RegisterService.useUpdateConsentsMutation();
	const [asyncError, setAsyncError] = useState<string | undefined>();
	const [tempValues, setTempValues] = useState<any>();
	const { setModal, closeModal } = useBottomSheet();
	const { reset, navigate }: any = useNavigation();
	const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation();
	const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);
	const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const navigation: any = useNavigation();

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		setError,
		watch,
		formState: { errors },
	} = useForm<ConsentsList>({
		resolver: yupResolver(ConsentsYup),
		mode: 'onSubmit',
	});

	const getItemInfo = async () => {
		let values: any;
		values = await AsyncStorage.getItem('loadUserInfoByCode');
		let valuesParse = JSON.parse(values);
		setTempValues(valuesParse);
		setValue('date', new Date());

		const name = `${ valuesParse?.patientInformation?.firstName ?? valuesParse?.firstName } ${valuesParse?.patientInformation?.lastName ?? valuesParse?.lastName}`;
		setValue('firm', name);
	};
	const dispatch = useAppDispatch();

	useEffect(() => {
		getItemInfo();
	}, [handlerNext]);


	const { setAlertErrorMessage } = useErrorAlert();

	const onValidSubmitFinalSave = useCallback(async () => {
		try {
			let info = {
				tempSessionId: tempSessionId,
				state: tempValues?.patientInformation
					? tempValues?.patientInformation?.state
					: tempValues?.state,
			};
			const response = editAccountdata?.isNewVersion
				? true
				: await verifyPartialRegister(info).unwrap();

			if (response === true) {
				let email = getValues('email');
				let phone = getValues('phone');
				let messagePush = getValues('messagePush');
				const isEnglish = lng != 'es';
				let isNewVersion = editAccountdata?.isNewVersion;
				let consentHippa = Boolean(getValues('consentHippa'));
				dispatch(
					userActions.setLocation(
						tempValues?.patientInformation
							? tempValues?.patientInformation.state
							: tempValues?.state,
					),
				);

				if (editAccountdata?.isNewVersion) {
					await updateConsents({
						isNewVersion,
						authUid,
						email,
						phone,
						messagePush,
						firstData,
						secondData,
						tempValues,
						isEnglish,
						editAccountdata,
						consentHippa,
						signature: getValues('firm')
					}).unwrap();
					navigation.navigate('Home');
				} else {
					await finalSave({
						isNewVersion,
						authUid,
						email,
						phone,
						messagePush,
						firstData,
						secondData,
						tempValues,
						isEnglish,
						editAccountdata,
						consentHippa,
						signature: getValues('firm')
					}).unwrap();
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
		} catch (error) {
			if (error == 80) {
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
				return;
			} else if (error == 290) {
				setAsyncError('290');
				return;
			}
			setAlertErrorMessage(
				t(`errors.code${error == '100' || error == '80' ? '101' : error}`),
			);
		}
	}, [finalSave, tempValues, firstData, secondData, editAccountdata]);

	const resetLogin = () => {
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerForm}>
				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('consents.financial')}
				</Text>
				<View
					style={{
						marginBottom: 10,
					}}
				/>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.theDoc')}
				</Text>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.copays')}
				</Text>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.insurance')}
				</Text>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.noInsurance')}
				</Text>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.medicare')}
				</Text>
				<View
					style={{
						borderBottomColor: '#999999',
						borderBottomWidth: 1,
						marginVertical: 16,
					}}
				/>
				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('consents.consentTreatment')}
				</Text>
				<View
					style={{
						marginBottom: 16,
					}}
				/>
				<View>
					<FlatList
						style={styles.li}
						data={[
							{ key: t('consents.tests') },
							{ key: t('consents.exams') },
							{ key: t('consents.screening') },
							{ key: t('consents.diagnostic') },
							{ key: t('consents.recognize') },
						]}
						renderItem={({ item }) => (
							<View style={styles.row}>
								<Text style={styles.item} maxFontSizeMultiplier={1.3}>
									{' ' + '\u2022' + ' '}
								</Text>
								<View style={{ flex: 1, marginLeft: 4 }}>
									<Text style={styles.item} maxFontSizeMultiplier={1.3}>
										{item.key}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.ConsentTreatmentOfMinor')}
				</Text>

				<View
					style={{
						borderBottomColor: '#999999',
						borderBottomWidth: 1,
						marginVertical: 16,
					}}
				/>

				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('consents.patientAcknow')}
				</Text>
				<View
					style={{
						marginBottom: 16,
					}}
				/>
				<View>
					<FlatList
						style={styles.li}
						data={[
							{ key: t('consents.noticeOfPrivacy'), position: 1 },
							{ key: t('consents.medicineStudents'), position: 2 },
							{ key: t('consents.medicalInformationBold'), position: 3 },
						]}
						renderItem={({ item }) => (
							<View style={[styles.row, { marginBottom: 20 }]}>
								<Text style={styles.item} maxFontSizeMultiplier={1.3}>
									{' ' + '\u2022' + ' '}
								</Text>
								<View style={{ flex: 1, marginLeft: 4 }}>
									{item.position == 1 && (
										<Text style={styles.item} maxFontSizeMultiplier={1.3}>
											{t('consents.noticeOfPrivacy1')}
											<Text
												style={[styles.item, { color: 'blue' }]}
												maxFontSizeMultiplier={1.3}
											>
												<TouchableWithoutFeedback
													onPress={() =>
														Linking.openURL(
															'https://www.mysanitas.com/en/legal/notice-privacy-practices',
														)
													}
												>
													<Text
														style={[styles.item, { color: 'blue' }]}
														maxFontSizeMultiplier={1.3}
													>
														{t('consents.noticeOfPrivacyLink1')}
													</Text>
												</TouchableWithoutFeedback>
											</Text>
											<Text style={styles.item} maxFontSizeMultiplier={1.3}>
												{t('consents.noticeOfPrivacy2')}
												<Text>
													<TouchableWithoutFeedback
														onPress={() =>
															Linking.openURL('contact@mysanitas.com')
														}
													>
														<Text
															style={[styles.item, { color: 'blue' }]}
															maxFontSizeMultiplier={1.3}
														>
															{t('consents.noticeOfPrivacyLink2')}
														</Text>
													</TouchableWithoutFeedback>
													{t('consents.noticeOfPrivacy3')}
												</Text>
											</Text>
										</Text>
									)}

									{item.position == 2 && (
										<Text style={[styles.itemBold]} maxFontSizeMultiplier={1.3}>
											{t('consents.medicineStudentsBold')}
											<Text style={styles.item} maxFontSizeMultiplier={1.3}>
												{t('consents.medicineStudents')}
											</Text>
										</Text>
									)}
									{item.position == 3 && (
										<Text style={[styles.itemBold]} maxFontSizeMultiplier={1.3}>
											{t('consents.medicalInformationBold')}
											<Text style={styles.item} maxFontSizeMultiplier={1.3}>
												{t('consents.medicalInformation')}
											</Text>
										</Text>
									)}
								</View>
							</View>
						)}
					/>
				</View>

				<Text style={[styles.itemBold]} maxFontSizeMultiplier={1.3}>
					{t('consents.myParticipationBold')}
					<Text style={styles.item} maxFontSizeMultiplier={1.3}>
						{t('consents.myParticipation')}
					</Text>
				</Text>

				<View
					style={{
						borderBottomColor: '#999999',
						borderBottomWidth: 1,
						marginVertical: 16,
					}}
				/>
				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('consents.consentEmail')}
				</Text>
				<View
					style={{
						marginBottom: 16,
					}}
				/>
				<View>
					<FlatList
						style={styles.li}
						data={[{ key: t('consents.l1') }]}
						renderItem={({ item }) => (
							<View style={styles.row}>
								<Text style={styles.item} maxFontSizeMultiplier={1.3}>
									{' ' + '\u2022' + ' '}
								</Text>
								<View style={{ flex: 1, marginLeft: 4 }}>
									<Text style={styles.item} maxFontSizeMultiplier={1.3}>
										{item.key}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>

				
				<Text style={[styles.item]} maxFontSizeMultiplier={1.3}>
					{t('consents.consentComunication1')}
					<Text style={styles.itemBold} maxFontSizeMultiplier={1.3}>
						{t('consents.consentComunicationBol1')}
						<Text style={styles.item} maxFontSizeMultiplier={1.3}>
							{t('consents.consentComunication2')}
							<Text style={styles.itemBold} maxFontSizeMultiplier={1.3}>
								{t('consents.consentComunicationBol2')}
								<Text style={styles.item} maxFontSizeMultiplier={1.3}>
									{t('consents.consentComunication3')}
									<Text style={styles.itemBold} maxFontSizeMultiplier={1.3}>
										{t('consents.consentComunicationBol3')}
										<Text style={styles.item} maxFontSizeMultiplier={1.3}>
											{t('consents.consentComunication4')}
										</Text>
									</Text>
								</Text>
							</Text>
						</Text>
					</Text>
				</Text>

				<View
					style={{
						marginBottom: 6,
					}}
				/>

				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{t('consents.email')}
				</Text>

				<RadioGroup
					style={styles.customRow}
					onChange={(v) => {
						setValue('email', v == 1 ? true : false);
						setError('email', {});
					}}
				>
					<RadioButton
						accessibilityRole="radio"
						value={1}
						style={{
							paddingRight: 20,
						}}
						textStyle={styles.item}
						title={t('consents.yes')}
					/>
					<RadioButton
						accessibilityRole="radio"
						value={2}
						style={{
							paddingRight: 20,
							paddingLeft: 20,
						}}
						textStyle={styles.item}
						title={t('consents.no')}
					/>
				</RadioGroup>
				{errors.email?.message && (
					<View style={{ marginBottom: 10, width: '100%', alignSelf: 'center' }}>
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

				<View style={{ marginTop: -20 }}>
					<Text style={styles.text} maxFontSizeMultiplier={1.3}>
						{t('consents.phone')}
					</Text>
				</View>
				<RadioGroup
					style={styles.customRow}
					onChange={(v) => {
						setValue('phone', v == 1 ? true : false);
						setError('phone', {});
					}}
				>
					<RadioButton
						accessibilityRole="radio"
						value={1}
						style={{
							paddingRight: 20,
						}}
						textStyle={styles.item}
						title={t('consents.yes')}
					/>
					<RadioButton
						accessibilityRole="radio"
						value={2}
						style={{
							paddingRight: 20,
							paddingLeft: 20,
						}}
						textStyle={styles.item}
						title={t('consents.no')}
					/>
				</RadioGroup>
				{errors.phone?.message && (
					<View style={{ marginBottom: 10, width: '100%', alignSelf: 'center' }}>
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
				<View style={{ marginTop: -20 }}>
					<Text style={styles.text} maxFontSizeMultiplier={1.3}>
						{t('consents.pushMessages')}
					</Text>
				</View>
				<RadioGroup
					style={styles.customRow}
					onChange={(v) => {
						setValue('messagePush', v == 1 ? true : false);
						setError('messagePush', {});
					}}
				>
					<RadioButton
						accessibilityRole="radio"
						value={1}
						style={{
							paddingRight: 20,
						}}
						textStyle={styles.item}
						title={t('consents.yes')}
					/>
					<RadioButton
						accessibilityRole="radio"
						value={2}
						style={{
							paddingRight: 20,
							paddingLeft: 20,
						}}
						textStyle={styles.item}
						title={t('consents.no')}
					/>
				</RadioGroup>
				{errors.messagePush?.message && (
					<View style={{ marginBottom: 10, width: '100%', alignSelf: 'center' }}>
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

				<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
					{t('consents.photographicIdentification')}
				</Text>
				<View
					style={{
						marginBottom: 16,
					}}
				/>
				<View>
					<FlatList
						style={styles.li}
						data={[{ key: t('consents.voluntarily') }]}
						renderItem={({ item }) => (
							<View style={styles.row}>
								<Text style={styles.item} maxFontSizeMultiplier={1.3}>
									{' ' + '\u2022' + ' '}
								</Text>
								<View style={{ flex: 1, marginLeft: 4 }}>
									<Text style={styles.item} maxFontSizeMultiplier={1.3}>
										{item.key}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>
				<View
					style={{
						marginBottom: 16,
					}}
				/>

				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents patient check'
			accesibilityLabel='Consents patient check' */
						accessibilityRole="checkbox"
						name="accepted1"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted1}
						onPress={() => setIsAccepted1(!isAccepted1)}
						error={errors.accepted1}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkPatient')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.consentsTreatment')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents Acknow check'
			accesibilityLabel='Consents Acknow check' */
						accessibilityRole="checkbox"
						name="accepted2"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted2}
						onPress={() => setIsAccepted2(!isAccepted2)}
						error={errors.accepted2}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkPatient')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.clickAknow')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted3"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted3}
						onPress={() => setIsAccepted3(!isAccepted3)}
						error={errors.accepted3}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkAcknow')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.CheboxHIPP1')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted4"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted4}
						onPress={() => setIsAccepted4(!isAccepted4)}
						error={errors.accepted4}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkAcknow')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.CheboxHIPP2')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted5"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted5}
						onPress={() => setIsAccepted5(!isAccepted5)}
						error={errors.accepted5}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkAcknow')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.CheboxHIPP3')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted6"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted6}
						onPress={() => setIsAccepted6(!isAccepted6)}
						error={errors.accepted6}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkAcknow')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.CheboxHIPP4')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted7"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted7}
						onPress={() => setIsAccepted7(!isAccepted7)}
						error={errors.accepted7}
					// children={}
					/>
					<View style={{ flex: 1 }}>
						<Text style={styles.textCheckbox} maxFontSizeMultiplier={1.3}>
							{t('consents.healthInsuranceCompany')}
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted8"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted8}
						onPress={() => setIsAccepted8(!isAccepted8)}
						error={errors.accepted8}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkFinancial')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.clickFinancial')}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.customRowCheck}>
					<CheckboxController
						/* accesibilityHint='Consents finanlcial check'
			accesibilityLabel='Consents financial check' */
						accessibilityRole="checkbox"
						name="accepted9"
						control={control}
						colorCheckbox={colors.GREENDC1}
						value={isAccepted9}
						onPress={() => setIsAccepted9(!isAccepted9)}
						error={errors.accepted9}
					/>
					<View style={{ flex: 1 }}>
						<Text style={[styles.textCheckbox]} maxFontSizeMultiplier={1.3}>
							{t('consents.checkFinancial')}
							<Text style={styles.textLink} maxFontSizeMultiplier={1.3}>
								{t('consents.sanitasPhotoIdentification')}
							</Text>
						</Text>
					</View>
				</View>
				<View
					style={{
						borderBottomColor: '#999999',
						borderBottomWidth: 1,
						marginBottom: 22,
					}}
				/>
				{tempValues?.patientInformation?.state == 'FL' ? (
					<>
						<View style={{ marginBottom: 16 }}>
							<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
								{t('consents.floridaOnly')}
							</Text>
							<Text style={styles.text} maxFontSizeMultiplier={1.3}>
								{t('consents.floridaOnlyText')}
							</Text>
						</View>

						<RadioGroup
							style={{
								marginBottom: 0, flexDirection: 'row', width: '100%',
								flexWrap: 'wrap', alignItems: 'flex-start'
							}}
							onChange={(v) => {
								setValue('consentHippa', v == 1 ? true : false);
								setError('consentHippa', {});
							}}
						>

							<RadioButton
								accessibilityRole="radio"
								value={1}
								style={{
									paddingRight: 10,

								}}

							/>
							<View style={{ width: '90%', marginLeft: 4, paddingBottom: 15 }}>
								<Text style={[styles.item]} maxFontSizeMultiplier={1.3}>
									{t('consents.yes') + ','}
									<Text style={styles.itemBold} maxFontSizeMultiplier={1.3}>
										{t('consents.iGiveMyConsent')}
										<Text style={styles.item} maxFontSizeMultiplier={1.3}>
											{t('consents.myConsentTextend')}
										</Text>
									</Text>
								</Text>
							</View>


							<RadioButton
								accessibilityRole="radio"
								value={2}
								style={{
									paddingRight: 10,


								}}

							/>
							<View style={{ width: '90%', marginLeft: 4, paddingBottom: 15 }}>
								<Text style={[styles.item]} maxFontSizeMultiplier={1.3}>
									{t('consents.no') + ','}
									<Text style={styles.itemBold} maxFontSizeMultiplier={1.3}>
										{t('consents.iDoNotGiveMyConsent')}
										<Text style={styles.item} maxFontSizeMultiplier={1.3}>
											{t('consents.notMyConsentTextend')}
										</Text>
									</Text>
								</Text>
							</View>

						</RadioGroup>
						{errors.consentHippa?.message && (
							<View style={{ marginBottom: 10, width: '100%', alignSelf: 'center' }}>
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
					</>
				) : (
					<>
						<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>
							{t('consents.NTAndTP')}
						</Text>
						<Text style={styles.text} maxFontSizeMultiplier={1.3}>
							{t('consents.inAccordance')}
						</Text>
					</>
				)}
				<Text
					style={[styles.text, styles.itemBold, { marginBottom: 16 }]}
					maxFontSizeMultiplier={1.3}
				>
					{t('consents.myConsent').toUpperCase()}
				</Text>

				<View style={styles.date}>
					<DatePickerController
						pikerStyle={{ width: Dimensions.get('window').width * 0.9 }}
						control={control}
						valueDate={moment(new Date())}
						editable={false}
						labelStyle={styles.label}
						name={'date'}
						label={t('consents.date')}
						error={errors.date}
						style={{ width: Dimensions.get('window').width * 0.9 }}
					/>
				</View>

				{tempValues?.patientInformation?.firstName || tempValues?.firstName ? (
					<Input
						inputStyle={styles.firm}
						label={t('consents.type')}
						placeholder={t('consents.placeholderSign')}
						setDisabled={false}
						labelStyle={styles.label}
						value={watch('firm')}
						control={control}
						error={errors.firm}
						name="firm"
						onChange={(e) => {
							setValue('firm', e.nativeEvent.text);
						}}
					/>
				) : (
					<></>
				)}
				<View
					style={{
						borderBottomColor: '#999999',
						borderBottomWidth: 1,
						marginVertical: 16,
					}}
				/>
				<View style={styles.button}>
					<Button
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: handleSubmit(onValidSubmitFinalSave)
						}
						accesibilityLabel={t('accessibility.btnCA')}
						title={t('consents.create')}
						style={{ height: 50 }}
					/>
				</View>
				{asyncError && (
					<View style={{ marginBottom: 10, width: '85%', alignSelf: 'center' }}>
						<Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>
							{t(`errors.code${asyncError}`)}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default Consents;
