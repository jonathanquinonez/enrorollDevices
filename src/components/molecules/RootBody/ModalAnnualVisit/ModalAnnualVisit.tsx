import React, { useCallback } from 'react';
import { View, Text, Linking } from 'react-native';
import useStyles from 'hooks/useStyles';
import appConfig from 'config/index';
import { useTranslation } from 'react-i18next';

//Componentsr
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalAnnualVisit.styles';
//Images
import IconMedical from 'icons/hand-holding-medical.svg';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import AuthService from 'adapter/api/authService';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useNavigation } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userActions } from 'adapter/user/userSlice';
import { loaderActions } from 'adapter/loader/loaderSlice';
import moment from 'moment';
import ScheduleCode from 'src/screens/GetCareNow/Payment/configAvailability';
import analytics from '@react-native-firebase/analytics';


interface ModalProps {
	setAlertErrorMessage: (value: string) => void;
}
/**
 * Render a ModalAnnualVisit.
 * @since 1.0.0
 */
const ModalAnnualVisit: React.FC<ModalProps> = (props) => {
	const { setAlertErrorMessage } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { closeModal } = useBottomSheet();
	const { t } = useTranslation();
	const { ecwId } = useAppSelector(userSelectors.selectUser);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

	const [updateAnnualVisitCode] = AuthService.useUpdateAnnualVisitCodeMutation();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const updateAnnualVisit = useCallback(
		async () => {
			try {
				if (ecwId) await updateAnnualVisitCode({ code: ecwId, state: locationSelected || '' }).unwrap();
			} catch (error) {
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[updateAnnualVisitCode, locationSelected, ecwId],
	);

	const navigate = async () => {
		await Linking.openURL(appConfig.TELADOC_URL);
		updateAnnualVisit();
	};

	const remindMeLater = () => {
		AsyncStorage.setItem('isTempAcceptAnnualVisit', 'ok')
	}

	const navigateTelevisit = async () => {
		closeModal();
		dispatch(userActions.setIsTelevisitNavigate(true))
		navigation.navigate('GetCareScreen')
	}

	return (
		<View style={styles.container}>
			<View style={styles.icon}>
				<IconMedical />
			</View>
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('modalAnnualVisit.title')}</Text>

			<Button onPress={() => navigateTelevisit()} title={t('modalAnnualVisit.btn')} />
			<Button
				accessibilityRole='link'
				onPress={() => { closeModal(); remindMeLater() }}
				style={{ marginTop: 15 }}
				textStyle={styles.btnText}
				title={t('modalAnnualVisit.textLink1')}
				variant={'Underline'} />
			<Button
				accessibilityRole='link'
				onPress={() => { closeModal(); updateAnnualVisit() }}
				style={{ marginTop: 15, marginBottom: 20 }}
				textStyle={styles.btnText}
				title={t('modalAnnualVisit.textLink2')}
				variant={'Underline'} />
		</View>
	);
};

export default ModalAnnualVisit;
