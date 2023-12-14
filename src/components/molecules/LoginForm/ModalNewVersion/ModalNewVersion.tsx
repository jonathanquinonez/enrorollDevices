import React, { useState } from 'react';
import { View, Text, Dimensions, Image, Platform, Linking } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalNewVersion.styles';
//Images
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';
/**
 * Render a ModalNewVersion.
 * @since 1.0.0
 */
const ModalNewVersion: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
    const { closeModal} = useBottomSheet();
	const storeValidation = Platform.OS === 'ios' ? 'App Store' : 'Play Store';

	const handleUpdate = async () => {
		if(Platform.OS === 'ios'){
            const link = 'itms-apps://apps.apple.com/id/app/mysanitas/id1600791076?l=id';
            Linking.canOpenURL(link).then(supported => {
                supported && Linking.openURL(link);
            }, (err) => console.log(err));
            // closeModal();
        }else{
            const link = 'market://details?id=com.keralty.mysanitas'
            Linking.openURL(link);
            // closeModal();
        }
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Icon name='exclamation-triangle' color='#3CA70D' size={48}  />
			</View>
			<Text style={styles.text} maxFontSizeMultiplier={1.3}>
				{t('newVersion.p1') + storeValidation + t('newVersion.p2')}
			</Text>
			<Button
                variant={'Contained'}
				title={t('newVersion.accept')}
				style={styles.button}
				textStyle={styles.secondaryText}
				onPress={handleUpdate}
			/>
		</View>
	);
};

export default ModalNewVersion;
