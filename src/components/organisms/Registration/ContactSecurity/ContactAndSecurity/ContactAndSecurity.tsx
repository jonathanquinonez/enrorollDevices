import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ContactSecurityInfo, ContactAndSecurityProps as Props } from './ContactAndSecurity.types';
import componentStyles from './ContactAndSecurity.styles';
import Input from 'src/components/atoms/Input/Input';
//Images
import IdCard from 'icons/IdCard.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactSecurityCredentials } from 'domain/entities/ContactSecurityCredentials';
import Password from '../Password/Password';
import { MASK } from 'ui-core/utils/mask';
import Button from 'src/components/atoms/Button/Button';
import RegisterService from 'adapter/api/registerService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import useVersion from 'hooks/useVersion';
import verifyDomain from 'hooks/verifyDomain';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { validateNonRepeatingDomains } from 'ui-core/utils/validateNonRepeatingDomains';
import { userSelectors } from 'adapter/user/userSelectors';

/**
 * Render a ContactAndSecurity.
 * @since 1.0.0
 */
const ContactAndSecurity: React.FC<Props> = (props) => {
	const { handleNext, accountInfo, resetForm } = props;
	const selectSSO = useAppSelector(userSelectors.selectSSO);
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [asyncError, setAsyncError] = useState<string | undefined>();
	const [validateAccountContactMethods] =
		RegisterService.useValidateAccountContactMethodsMutation();

	const dispatch = useAppDispatch();
	const { requestToken } = useVersion();
	const { requestVerifyDomain } = verifyDomain();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue,
		setError,
		reset,
	} = useForm<ContactSecurityCredentials>({
		resolver: yupResolver(ContactSecurityInfo),
		mode: 'onSubmit',
	});

	useEffect(() => {
		reset();
	}, [resetForm]);

	const { setAlertErrorMessage } = useErrorAlert();
	const onValidSubmit = useCallback(
		async (values: ContactSecurityCredentials) => {
			try {
				dispatch(loaderActions.setLoading(true));
				const correctedMailDomain = validateNonRepeatingDomains(values?.email);

				if (!correctedMailDomain) {
					dispatch(loaderActions.setLoading(false));
					setError('email', {
						type: 'manual',
						message: 'invalidEmail',
					});
					return;
				}
				const email = values?.email;
				const notDomain = email.split('@')[1];
				const responseTwo = await requestVerifyDomain(notDomain);
				dispatch(loaderActions.setLoading(false));

				if (responseTwo.data) {
					const response = await validateAccountContactMethods({
						...values,
						...accountInfo,
					}).unwrap();
					if(response.matchEmail || response.matchPhone) {
						if(selectSSO?.tokenFB != undefined && selectSSO?.tempUserSSO != undefined){
							handleNext(
								{
									...values,
									state: response?.state,
									isFBMax: true,
									id: selectSSO?.tempUserSSO
								},
								4,
							)
						}else{
							handleNext(
								{
									...values,
									state: response?.state,
									isFBMax: !(response?.userId == 'NO_FB'),
									id: response?.userId == 'NO_FB' ? '' : response?.userId,
								},
								4,
							)
						}
					}else{
						setAsyncError('190' as string);
					}
					/*response.matchEmail || response.matchPhone
						? handleNext(
								{
									...values,
									state: response?.state,
									isFBMax: !(response?.userId == 'NO_FB'),
									id: response?.userId == 'NO_FB' ? '' : response?.userId,
								},
								4,
						  )
						: setAsyncError('190' as string);*/
				} else {
					setError('email', {
						message: 'emailNotValid',
					});
				}
			} catch (error) {
				dispatch(loaderActions.setLoading(false));
				setAlertErrorMessage(t(`errors.code${error}`));
			}
		},
		[validateAccountContactMethods, accountInfo],
	);

	return (
		<>
			<Text
				style={{
					alignSelf: 'flex-start',
					fontSize: 14,
					color: colors.BLUEDC1,
					fontFamily: 'proxima-bold',
					marginTop: -5,
					marginBottom: 5,
				}}
			>
				{t('consents.requiredFields')}
			</Text>

			<Input
				icon={<IdCard />}
				keyboardType="email-address"
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('createAccount.placeholders.eMail')}
				label={t('createAccount.inputs.eMail')}
				name={'email'}
				control={control}
				error={errors.email}
			/>
			<Input
				icon={<IdCard />}
				keyboardType="numeric"
				mask={MASK.phone}
				labelStyle={{ color: colors.BLUEDC1 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
				placeholder={t('createAccount.placeholders.mobile')}
				label={t('createAccount.inputs.mobile')}
				name={'mobile'}
				control={control}
				error={errors.mobile}
			/>
			<Password control={control} errors={errors} setValue={setValue} />
			{asyncError && (
				<View style={{ marginBottom: 10, width: '85%' }}>
					<Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>
						{t(`errors.code${asyncError}`)}
					</Text>
				</View>
			)}
			<Button
				style={{ width: 200, marginBottom: 15 }}
				title={t('createAccount.buttons.next')}
				accesibilityLabel={t('accessibility.next')}
				onPress={handleSubmit(onValidSubmit)}
			/>
		</>
	);
};

export default ContactAndSecurity;
