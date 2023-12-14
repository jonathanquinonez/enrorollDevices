import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	useDrawerStatus,
} from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { DrawerActions } from '@react-navigation/native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { AsideDrawerProps as Props } from './AsideDrawerRigth.types';
import componentStyles from './AsideDrawerRigth.styles';
// Components
import Row from 'src/components/atoms/Row/Row';

import MenuLogo from 'assets/images/logo/LogoMenu.svg';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Icon from 'src/components/atoms/Icon/Icon';

import LogoutIcon from 'assets/icons/logout.svg';
import Language from 'assets/images/menu/Language.svg';
import PersonalInformation from 'assets/images/menu/PersonalInfo.svg';
import Insurance from 'assets/images/menu/Insurance.svg';
import AsideMenuItem from 'src/components/atoms/AsideMenuItem/AsideMenuItem';
import Button from 'src/components/atoms/Button/Button';
import { useAppDispatch } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
import DeviceInfo from 'react-native-device-info';
import useLogout from 'hooks/useLogout';


const AsideDrawerRigth: React.FC<DrawerContentComponentProps & Props> = (props) => {
	const { t } = useTranslation();
	const { navigation } = props;
	const { styles } = useStyles(componentStyles);
	const { handleLogout } = useLogout();

	const handlerLogout = async () => {
		handleLogout();
	};

	const appVersion = DeviceInfo.getVersion();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Row style={{ justifyContent: 'center' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 20,
						alignItems: 'center',
					}}
				>
					<IconButton
						accessibilityLabel={t('accessibility.closeMenu')}
						accessibilityRole='button'
						style={{ backgroundColor: '#055293' }}
						icon={<Icon name="arrow-left" />}
						onPress={() => {
							navigation.dispatch(DrawerActions.toggleDrawer());
						}}
					/>
					<MenuLogo />
				</View>
			</Row>
			<Row style={{ flexGrow: 6 }}>
				<ScrollView>
					<View style={styles.container}>
						<AsideMenuItem
							text={t('menuRightHome.personalInfo')}
							icon={
								<PersonalInformation
									accessibilityLabel={t('menuRightHome.personalInfo')}
								/>
							}
							onPress={() =>
								navigation.navigate('PersonalInformationScreen', {})
							}
							style={{ paddingLeft: 8 }}
							styleText={{ paddingRight: -5 }}
						/>
						<AsideMenuItem
							text={t('menuRightHome.myInsurance')}
							icon={<Insurance accessibilityLabel={t('menuRightHome.myInsurance')} />}
							onPress={() => navigation.navigate('MyInsurance', {})}
							styleText={{ paddingLeft: 5 }}
						/>
						<AsideMenuItem
							text={t('menuRightHome.language')}
							icon={<Language accessibilityLabel={t('menuRightHome.language')} />}
							onPress={() => {
								navigation.navigate('LanguageScreen');
							}}
							styleText={{ paddingLeft: 5 }}
						/>
					</View>
				</ScrollView>
			</Row>
			<Row>
				<View style={styles.logoutContainer}>
					<Row width={2} style={{ alignItems: 'flex-start' }}>
						<Button
							title={t('menuRightHome.logOut')}
							variant="Text"
							icon={
								<View
									style={{
										backgroundColor: '#E5E5E5',
										padding: 10,
										borderRadius: 50,

									}}
								>
									<LogoutIcon color={'#055293'} />
								</View>
							}
							textStyle={styles.buttonText}
							onPress={handlerLogout}
						/>
					</Row>
					<Row style={{ marginTop: 5 }}>
						<Text style={styles.visitText} maxFontSizeMultiplier={1.3}>
							{t('menuLeftHome.version')}
							{appVersion}
						</Text>
					</Row>
				</View>
			</Row>
		</SafeAreaView>
	);
};

export default AsideDrawerRigth;
