import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, Image, Platform, Linking } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalTelevisit.styles';
//Images
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';

import appConfig from 'config/index';
import { useNavigation } from '@react-navigation/native';
import AuthService from 'adapter/api/authService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';

interface ModalProps {
	setAlertErrorMessage: (value: string) => void;
}

/**
 * Render a ModalNewVersion.
 * @since 1.0.0
 */
const ModalTelevisit: React.FC<ModalProps> = (props) => {

	const { setAlertErrorMessage } = props;

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { closeModal } = useBottomSheet();
	const navigation = useNavigation();
	const { ecwId } = useAppSelector(userSelectors.selectUser);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

	const [updateAnnualVisitCode] = AuthService.useUpdateAnnualVisitCodeMutation();

	const updateAnnualVisit = useCallback(
		async () => {
			try {
				if (ecwId)
					await updateAnnualVisitCode({ code: ecwId, state: locationSelected || '' }).unwrap();
			} catch (error) {
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[updateAnnualVisitCode, locationSelected, ecwId],
	);

	const handleTelevisit= async () => {
        await Linking.openURL(appConfig.TELADOC_URL);
		//updateAnnualVisit();
		closeModal();
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Icon name='check-circle' color='#3CA70D' size={48} />
			</View>
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('televisit.body')}</Text>
			<Button
				variant={'Contained'}
				title={t('televisit.accept')}
				style={styles.button}
				textStyle={styles.secondaryText}
				onPress={handleTelevisit}
			/>
		</View>
	);
};

export default ModalTelevisit;
