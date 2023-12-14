import React, { useState } from 'react';
import { View, Text, Dimensions, Image, Platform, Linking } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalErrorTelevisit.styles';
//Images
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';

import appConfig from 'config/index';
import { useNavigation } from '@react-navigation/native';
import MessageIcon from 'icons/messages.svg';

/**
 * Render a ModalNewVersion.
 * @since 1.0.0
 */
const ModalErrorTelevisit: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
    const { closeModal} = useBottomSheet();
	const navigation = useNavigation();

	const handleTelevisit= async () => {
		navigation.goBack();
		closeModal();
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<MessageIcon width={30}  />
			</View>
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('getCareNow.videoCall.error')}</Text>
			<Button
                variant={'Contained'}
				title={t('getCareNow.videoCall.close')}
				style={styles.button}
				textStyle={styles.secondaryText}
				onPress={handleTelevisit}
			/>
		</View>
	);
};

export default ModalErrorTelevisit;
