import React, { useState } from 'react';
import { View, Text, Dimensions, Image, Platform, Linking } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalErrorChat.styles';
//Images
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';

import appConfig from 'config/index';
import { useNavigation } from '@react-navigation/native';
import IconExclamationY from 'icons/IconExclamationY.svg';

/**
 * Render a ModalNewVersion.
 * @since 1.0.0
 */
const ModalErrorChat: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
    const { closeModal} = useBottomSheet();
	const navigation = useNavigation();

	const handleChat= async () => {
		navigation.goBack();
		closeModal();
	};

	return (
		<View style={styles.container}>
			<IconExclamationY width={45} color="#E7A304" />
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('getCareNow.videoCall.errorModal')}</Text>
			<Button
        variant={'Contained'}
				title={t('getCareNow.videoCall.accept')}
				style={styles.button}
				textStyle={styles.secondaryText}
				onPress={handleChat}
			/>
		</View>
	);
};

export default ModalErrorChat;
