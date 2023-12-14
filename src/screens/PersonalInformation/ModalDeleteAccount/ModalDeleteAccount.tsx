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
import componentStyles from './ModalDeleteAccount.styles';
//Images
import EmailIcon from 'icons/EmailIcon.svg';
import { ModalDeleteAccountProps as Props } from './ModalDeleteAccount.types';
import { useAppDispatch } from 'adapter/hooks';
import { store } from 'adapter/store';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import AuthService from 'adapter/api/authService';
import { userActions } from 'adapter/user/userSlice';
import useLogout from 'hooks/useLogout';





/**
 * Render a ModalNewVisit.
 * @since 1.0.0
 */
const ModalDeleteAccount: React.FC<Props> = (props) => {

	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [deleteAccount] = AuthService.useDeleteMutation();
    const { closeModal} = useBottomSheet();
	const { handleLogout } = useLogout();

	
	const handlerLogout = async () => {
		closeModal();
		handleLogout();
	};

	const deleteAccountAction = async () => {	

		try{			
		await deleteAccount({ motive:'idUser', email:'emailUser' }).unwrap();		
		return;
	   }
		 catch (error) {		
			
			
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Image style={styles.logo_image} source={require('assets/images/times.png')} />
				
				
			</View>

			<Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('deleteAccount.successDelete')}</Text>
			

			<Button
				title={t('deleteAccount.close')}
				style={styles.button}
				onPress={handlerLogout}
				
			/>
		</View>
	);
};

export default ModalDeleteAccount;
function setAsyncError(arg0: string) {
	throw new Error('Function not implemented.');
}

