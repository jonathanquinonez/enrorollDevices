import React, { useState } from 'react';
import { View, Text, Dimensions, Image, Platform } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componentsr
import Button from 'src/components/atoms/Button/Button';
//Styles
import componentStyles from './ModalWelcome.styles';
//Images
import EmailIcon from 'icons/EmailIcon.svg';
import { ModalProps as Props } from 'src/components/molecules/Modal/Modal.types';
import { store } from 'adapter/store';
import { ASYNC_STORAGE } from 'config/constants/Global';
import Icon from 'src/components/atoms/Icon/Icon';
// import UseSmile from 'icons/welcomeface.svg';
import UseSmile from 'icons/ic_smile.svg';
import Row from 'src/components/atoms/Row/Row';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';

interface ModalProps {
	annualVisit: () => void;
}

/**
 * Render a ModalWelcome.
 * @since 1.0.0
 */
const ModalWelcome: React.FC<ModalProps> = (props) => {
	const { annualVisit } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { closeModal } = useBottomSheet();
	const { t } = useTranslation();

	const handleOnClose = async () => {
		try {
			await AsyncStorage.removeItem(ASYNC_STORAGE.BIOMETRICALTERMS);
			closeModal();
			annualVisit();
		} catch (error) {
		}
	};
	return (
		<View style={styles.container}>
			<View>{
				Platform.OS === "ios" ?
					<>
						<View style={styles.head}>
							<UseSmile />
						</View>
						<View>
							<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>{t('indoormodal.titleFaceId')}</Text>
							<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('indoormodal.descriptionFaceId')}</Text>
						</View>
					</>
					:
					<>
						<View style={styles.head}>
							<UseSmile />
						</View>
						<View>
							<Text style={styles.tittle} maxFontSizeMultiplier={1.3}>{t('indoormodal.titleFinger')}</Text>
							<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('indoormodal.description')}</Text>
						</View>
					</>
			}
				<View >
					<Button
						title={t('indoormodal.buttonAgree')}
						variant="Text"
						textStyle={styles.textBtn}
						onPress={handleOnClose}
					/>
				</View>
			</View>

		</View>
	);
};

export default ModalWelcome;
