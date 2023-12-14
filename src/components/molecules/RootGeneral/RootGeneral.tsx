import React from 'react';
import { SafeAreaView, View, Text, KeyboardAvoidingView } from 'react-native';
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';
import { safeScreen } from 'ui-core/utils/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import MenuIcon from 'icons/menu.svg';
import ProfileIcon from 'icons/profile.svg';
import Header from 'src/components/molecules/Header/Header';
import Row from 'src/components/atoms/Row/Row';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IRootHeader } from './RootHeader/RootHeader.type';
import { RootHeader } from './RootHeader/RootHeader';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

export const RootGeneral = (props: IRootHeader) => {
	const { content, title, subtitle, isButton, isForm,
		filterComponent, filterBySearch, moreOptionComponent,
		data, showData, onPressGoBack, hiddenBackButton = false, stylesTitle } = props;
	const navigation = useNavigation();

	const handlerLeftDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	const handlerRigthDrawer = () => {
		const drawerNavigation: any = navigation.getParent('RigthDrawer');
		drawerNavigation?.openDrawer();
	};
	return (
		<SafeScreen>
			<LinearGradient
				colors={['#0069A7', '#003554']}
				locations={[0.18, 0.34]}
				style={{ flex: 1 }}
			>
				<Header
					logoWithoutText
					iconLeft={<MenuIcon />}
					onPressLeft={handlerLeftDrawer}
					onPressRight={handlerRigthDrawer}
					iconRight={<ProfileIcon />}
					showLine
				/>
				<Row style={{ flexGrow: 9 }}>
					<RootHeader
						isForm={isForm}
						content={content}
						onPressGoBack={onPressGoBack}
						stylesTitle={stylesTitle}
						title={title}
						subtitle={subtitle}
						isButton={isButton}
						data={data}
						showData={showData}
						filterComponent={filterComponent}
						filterBySearch={filterBySearch}
						moreOptionComponent={moreOptionComponent}
						hiddenBackButton={hiddenBackButton}
					/>
				</Row>
			</LinearGradient>

		</SafeScreen>
	);
};
