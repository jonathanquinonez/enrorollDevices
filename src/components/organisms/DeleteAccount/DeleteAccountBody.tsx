import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import useStyles from 'hooks/useStyles';
import AuthService from 'adapter/api/authService';
import RNPickerSelect from 'react-native-picker-select';
import { yupResolver } from '@hookform/resolvers/yup';

//Components
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import {
	DeleteAccountBodyProps,
	DeleteAccountBodyProps2,
	DeleteAccountBodyProps as Props,
	DeleteSchema,
	DeleteSchema2,
} from './DeleteAccountBody.types';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
//Types

//Styles
import componentStyles from './DeleteAccountBody.styles';
import Row from 'src/components/atoms/Row/Row';
import { ScrollView } from 'react-native-gesture-handler';

//Icons
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import ModalDeleteAccount from 'src/screens/PersonalInformation/ModalDeleteAccount/ModalDeleteAccount';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
import Input from 'src/components/atoms/Input/Input';
import BackIcon from 'icons/BackIcon.svg';
import { useForm, UseFormSetValue } from 'react-hook-form';
import Question from 'icons/Question.svg';
import ArrowDownIcon from 'icons/ArrowDownIcon.svg';
import useLogout from 'hooks/useLogout';

const DeleteAccountBody: React.FC<Props> = (props) => {
	const { styles, colors } = useStyles(componentStyles);
	const [screen, setScreen] = useState(1);
	const { t } = useTranslation();
	const navigation = useNavigation<any>();
	const { closeModal, setModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue,
		getValues,
		setError, watch
	} = useForm<DeleteAccountBodyProps>({
		resolver: yupResolver(DeleteSchema),
		mode: 'onSubmit',
	});

	const {
		control: control2,
		formState: { errors: errors2 },
		getValues: getValues2,
		setError: setError2
	} = useForm<DeleteAccountBodyProps2>({
		resolver: yupResolver(DeleteSchema2),
		mode: 'onBlur',
	});
	const [values, setValues] = useState('');

	const [isAccountDeleted, setIsAccountDeleted] = useState(false);

	const userInfo = useAppSelector(userSelectors.selectUser);
	const email = userInfo.email;
	const state = userInfo.state;
	const [deleteAccount] = AuthService.useDeleteMutation();

	const sendReason = () => {
		let send;
		if (values === t('deleteAccount.other')) {
			send = getValues2('other');

		} else {
			send = getValues('motive');
		}
		return send ?? '';
	};

	const validateErrors = () => {
		if (getValues2('other')?.length > 0) {
			if (sendReason().length < 3) {
				setError2('other', { message: 'min', type: "min" })
			} else {
				setScreen(3)
			}

		} else {
			setError2('other', { message: 'required', type: "required" })
		}
	}

	const { handleLogout } = useLogout();


	const handlerLogout = async () => {
		closeModal();
		handleLogout();
		setIsAccountDeleted(false)
	};

	const onValidateForm = useCallback(() => {
		if (values == t('deleteAccount.other') && errors2.other) {
		} else {
			control
			setScreen(3)
		}
	}, [errors2, values])

	const deleteAccountAction = async () => {
		try {
			if (isAccountDeleted) {
				handlerLogout()
			} else {
				await deleteAccount({ motive: sendReason(), email: email, state: state }).unwrap();
				setModal({
					render: () => (<ModalDeleteAccount />),
				});
			}
			setIsAccountDeleted(true)
			setTimeout(() => {
				handlerLogout()
			}, 7000);
			return;
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	};

	const Content1 = () => {
		return (
			<>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('deleteAccount.first')}</Text>

				<Button
					accesibilityLabel={t('accessibility.btnCancel')}
					title={t('deleteAccount.cancel')}
					style={styles.buttonBlue}
					onPress={() => navigation.navigate('PersonalInformationScreen')}
				/>
				<Button
					accesibilityLabel={t('accessibility.next')}
					title={t('deleteAccount.continue')}
					style={styles.button}
					textStyle={styles.secondaryText}
					onPress={() => setScreen(2)}
				/>
			</>
		);
	};

	const Content2 = () => {
		useEffect(() => {
			const subcription = watch((data) => {
				//console.log('data', data)
				sendReason()
			}
			)

			return () => {
				subcription.unsubscribe();
			}
		}, [watch, errors])

		return (
			<>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('deleteAccount.second')}</Text>
				<View style={[styles.containerSelect]}>
					<Question />
					<RNPickerSelect
						useNativeAndroidPickerStyle={false}
						onValueChange={(v) => {
							setValue('motive', v);
							setValues(v)
						}}
						Icon={() => <ArrowDownIcon style={[styles.icon2, styles.pickerWithIcon2]} />}
						touchableWrapperProps={{
							style: [styles.pickerContainer],
						}}
						style={pickerSelectStyles}
						placeholder={{ label: t('deleteAccount.reason') }}
						value={values}
						items={[
							{
								key: 1,
								value: t('deleteAccount.duplicate'),
								label: t('deleteAccount.duplicate'),
							},
							{
								key: 2,
								value: t('deleteAccount.spam'),
								label: t('deleteAccount.spam')
							},
							{
								key: 3,
								value: t('deleteAccount.privacy'),
								label: t('deleteAccount.privacy'),
							},
							{
								key: 4,
								value: t('deleteAccount.anyValue'),
								label: t('deleteAccount.anyValue'),
							},
							{
								key: 5,
								value: t('deleteAccount.other'),
								label: t('deleteAccount.other'),
							},
						]}
					/>
				</View>

				{(errors.motive) && !values ?
					<View style={{ marginBottom: 10, marginTop: -5, alignSelf: 'flex-start', marginLeft: '8%' }}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} maxFontSizeMultiplier={1.3}>{t(`errors.${errors.motive.message}`)}</Text>
					</View> : <></>}

				{values == t('deleteAccount.other') ? (
					<Input
						placeholder={t('deleteAccount.write')}
						name='other'
						inputStyle={styles.textArea}
						styleError={{ width: Dimensions.get('window').width * 0.85 }}
						multiline={true}
						maxLength={250}
						control={control2}
						error={errors2.other}
					/>
				) : <></>}

				<Button
					accesibilityLabel={t('accessibility.btnCancel')}
					title={t('deleteAccount.cancel')}
					style={styles.buttonBlue}
					onPress={() => navigation.navigate('PersonalInformationScreen')}
				/>
				<Button
					accesibilityLabel={t('accessibility.next')}
					title={t('deleteAccount.continue')}
					style={styles.button}
					textStyle={styles.secondaryText}
					onPress={(values == t('deleteAccount.other') && (sendReason().length <= 3)) ?
						(() => validateErrors()) : handleSubmit(onValidateForm)
					}

				/>
			</>
		);
	};

	const Content3 = () => {
		return (
			<>
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('deleteAccount.third')}</Text>

				<Button
					accesibilityLabel={t('accessibility.btnCancel')}
					title={t('deleteAccount.cancel')}
					style={styles.buttonBlue}
					onPress={() => navigation.navigate('PersonalInformationScreen')}
				/>
				<Button
					accesibilityLabel={t('accessibility.next')}
					title={t('deleteAccount.continue')}
					style={styles.button}
					textStyle={styles.secondaryText}
					onPress={() => deleteAccountAction()}
				/>
			</>
		);
	};

	let show;
	if (screen === 1) {
		show = <Content1 />;
	}
	if (screen === 2) {
		show = <Content2 />;
	}
	if (screen === 3) {
		show = <Content3 />;
	}

	return (
		<ScrollView style={styles.layout}>
			<View style={styles.body}>
				<View style={styles.head}>
					<Image
						style={styles.logo_image}
						source={require('assets/images/deleteicon.png')}
					/>
				</View>
				<>{show}</>
			</View>
		</ScrollView>
	);
};

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingLeft: 20
	},
	inputAndroid: {
		fontSize: 14,
		color: '#757575',
		paddingRight: 40,
		paddingLeft: 15
	},
	placeholder: {
		color: '#5B5C5B', // Color del placeholder
	},
});

export default DeleteAccountBody;
