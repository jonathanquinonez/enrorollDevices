import React from 'react';
import { View, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// Hooks
import useStyles from 'hooks/useStyles';
// Config
import { ASYNC_STORAGE } from 'config/constants/Global';
// Types, Styles
import componentStyles from './TabBarCustom.styles';
// Redux
import { useAppSelector, useAppDispatch } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';

import { ParamListBase } from '@react-navigation/native';
import { NavigationRoute } from './TabBarCustom.types';
import { TabBg } from 'src/components/atoms/TabBg/TabBg';

import IconMenu from 'icons/IconMenu1.svg';
import Support from 'assets/images/icons/support.svg';
import MessageIcon from 'icons/messages.svg';
import { isIphoneX } from 'src/utils/devices';

export const TabBarCustom = (props: BottomTabBarProps) => {
	const { state, descriptors, navigation } = props;
	const phoneNumber = +18446654827;
	// Hooks
	const { styles } = useStyles(componentStyles);
	const { i18n } = useTranslation();
	const dispatch = useAppDispatch();
	const insets = useSafeAreaInsets();
	const { email, firstName, lastName } = useAppSelector(userSelectors.selectUser);

	/**
	 * Opens the phone dialer with a predefined phone number.
	 * @since 1.0.0
	 */

	const openPhoneDialer = () => {
		Linking.canOpenURL(`tel:${phoneNumber}`)
			.then(() => Linking.openURL(`tel:${phoneNumber}`))
			.catch(() => console.warn("Can't open phone"));
	};

	/**
	 * Toggles the current language and saves the selection into the Storage.
	 * @since 1.0.0
	 */
	const changeLanguage = async () => {
		let currentLanguage = await AsyncStorage.getItem(ASYNC_STORAGE.LANGUAGE);
		if (currentLanguage?.includes('en')) {
			currentLanguage = 'es';
			AsyncStorage.setItem(ASYNC_STORAGE.LANGUAGE, 'es');
		} else {
			currentLanguage = 'en';
			AsyncStorage.setItem(ASYNC_STORAGE.LANGUAGE, 'en');
		}

		i18n.changeLanguage(currentLanguage);
	};

	/**
	 * Navigates to the screen/stack or executes an action depending on the name of the route.
	 * @since 1.0.0
	 * @param route Route or stack related to the tab item.
	 * @param isFocused True if the current tab item is selected.
	 */
	const onPress = (route: NavigationRoute<ParamListBase, string>, isFocused: boolean) => {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, { name: route.name, merge: true });
		}
	};

	/**
	 * Emits a tabLongPress event that could be listen on a useEffect component
	 * @since 1.0.0
	 * @param route Route or stack related to the tab item.
	 */
	const onLongPress = (route: NavigationRoute<ParamListBase, string>) => {
		navigation.emit({
			type: 'tabLongPress',
			target: route.key,
		});
	};

	return (
		<View style={[styles.container]}>
			{state.routes.map((route, index) => {
				const indexVal = index + 1;
				const { options } = descriptors[route.key];
				const isFocused = state.index === indexVal;

				return (
					<TouchableOpacity
						key={indexVal}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={() => onPress(route, isFocused)}
						onLongPress={() => onLongPress(route)}
						style={{ flex: 1 }}
					>
						{options.tabBarIcon &&
							options.tabBarIcon({ focused: isFocused, color: 'white', size: 0 })}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

type Props = BottomTabBarButtonProps & {
	bgColor?: string;
	hiddeIconMenu?: boolean;
};

export const TabBarAdvancedButton: React.FC<Props> = ({
	bgColor,
	onPress,
	hiddeIconMenu = false,
}) => (
	<View style={styles.container} pointerEvents="box-none">
		<TabBg color="#b4b4b4" style={styles.background} />
		<TouchableOpacity
			style={{
				top: -18.5,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onPress={onPress}
		>
			{!hiddeIconMenu ? <IconMenu /> : <View style={{ width: 40 }} />}
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		alignItems: 'center',
		bottom: isIphoneX() ? 49 : 34,
		zIndex: -1,
	},
	background: {
		position: 'absolute',
		top: 0,
	},
});
