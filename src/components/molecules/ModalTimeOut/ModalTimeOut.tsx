import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Input from 'src/components/atoms/Input/Input';
import Modal from 'src/components/molecules/Modal/Modal';
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalTimeOut.styles';
//Images
import EmailIcon from 'icons/EmailIcon.svg';
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { store } from 'adapter/store';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import IconWarning from 'icons/IconWarning.svg';

/**
 * Render a ModalNewVisit.
 * @since 1.0.0
 */
const ModalTimeOut: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<IconWarning />
			</View>

			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('timeOut.sessionToExpir')}</Text>

			<Button
				title={t('timeOut.accept')}
				onPress={props.onPrimaryPress}
			/>
			<Button
				variant='Underline'
				style={{ marginVertical: 20 }}
				textStyle={{fontFamily: 'proxima-bold', fontSize: 16, color: '#0071A3'}}
				title={t('common.cancel')}
				onPress={props.onCancel}
			/>
		</View>
	);
};

export default ModalTimeOut;

