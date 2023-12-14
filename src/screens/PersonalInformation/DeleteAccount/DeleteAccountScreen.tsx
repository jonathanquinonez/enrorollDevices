import React from 'react';
import componentStyles from './Root.styles';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import useStyles from 'hooks/useStyles';
import MenuIcon from 'icons/menu.svg';
import ProfileIcon from 'icons/profile.svg';
import { LinearGradient } from 'expo-linear-gradient';
import Row from 'src/components/atoms/Row/Row';

import { useTranslation } from 'react-i18next';
import Header from 'src/components/molecules/Header/Header';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import DeleteAccountBody from 'src/components/organisms/DeleteAccount/DeleteAccountBody';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { extraScrollHeigth } from 'src/utils/devices';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';

const DeleteAccountScreen = (props: any) => {
	const { styles, colors } = useStyles(componentStyles);
	const navigation = useNavigation();
	const { t } = useTranslation();

	const handlerLeftDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	const handlerRigthDrawer = () => {
		const drawerNavigation = navigation.getParent('RigthDrawer');
		drawerNavigation?.openDrawer();
	};

	const extraScrollHeight = extraScrollHeigth();


	return (
		<RootGeneral
			title={t('deleteAccount.tittle')}
			stylesTitle={{ fontSize: 24, marginTop: 15 }}
			subtitle={''}
			content={<DeleteAccountBody motive={''} />}
			isButton={false}
		/>
	);
};

export default DeleteAccountScreen;