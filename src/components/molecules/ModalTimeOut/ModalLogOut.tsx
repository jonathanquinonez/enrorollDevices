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

import Clock from 'icons/clock.svg';


/**
 * Render a ModalNewVisit.
 * @since 1.0.0
 */
const ModalLogOut: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Clock/>
			</View>

			{/** <Text style={styles.tittle}>{t('newVisit.welcome')}</Text>*/}
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('timeOut.sessionExpired')}</Text>

			<Button
				title={t('timeOut.acceptLogOut')}
				onPress={ props.onPrimaryPress }
			/>
		</View>
	);
};

export default ModalLogOut;

