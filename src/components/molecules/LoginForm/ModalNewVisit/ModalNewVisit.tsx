import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FaceIcon from 'icons/faceIcon2.svg';

//Components
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalNewVisit.styles';
//Images
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';

/**
 * Render a ModalNewVisit.
 * @since 1.0.0
 */
const ModalNewVisit: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
    const { closeModal} = useBottomSheet();

	const handleOnClose = async () => {
		try {
			await AsyncStorage.setItem(ASYNC_STORAGE.NEW_VISIT, 'false');
            closeModal();
		} catch (error) {
		}
	};

	return (
		<View style={styles.container}>
			<View style={[styles.head, {justifyContent: 'center', alignSelf: 'center'}]}>
				<FaceIcon/>
			</View>

			<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>{t('newVisit.welcome')}</Text>
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('newVisit.p')}</Text>

			<Button
				title={t('newVisit.accept')}
				textStyle={styles.secondaryText}
				onPress={() => handleOnClose()}
			/>
		</View>
	);
};

export default ModalNewVisit;
