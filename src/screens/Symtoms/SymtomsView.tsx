import { ViewSensely } from '@quillbot/keralty-kdc-usa-front-library-sensely';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import i18n from 'i18n/i18n';
import { getConfigValues } from './utils';
import HTMLSensely from './TemplateSensly';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'adapter/hooks';
import { loaderActions } from 'adapter/loader/loaderSlice';

import { WebViewMessageEvent } from 'react-native-webview';
import { HeaderLibrary } from 'src/components/molecules/HeaderLibrary/HeaderLibrary';
import { useTranslation } from 'react-i18next';
import useTokenizeSensly from 'hooks/useTokenSensly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { extraScrollHeigth } from 'src/utils/devices';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { KeyboardAvoidingView } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { userActions } from 'adapter/user/userSlice';

export const SymtomsView = (props: any) => {
	const typeParam = props.route.params ? props.route.params.action : '';
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const {
		typeSensly = typeParam === 'ASSISTANT'
			? 'VIRTUAL_ASSISTANT'
			: typeParam == 'LIFESTYLE_LIB'
			? 'LIFESTYLE_LIB'
			: 'SYMPTOM_CHECKER',
	} = props;

	const webViewRef = useRef<any>(null);
	const userData = useAppSelector(userSelectors.selectUser);
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const navigation: any = useNavigation();
	const [show, setShow] = useState<boolean>(false);
	const { requestTokenize } = useTokenizeSensly();
	const { token } = useAppSelector(userSelectors.selectIsLoggedIn);
	const [accessToken, setAccessToken] = useState<string>();
	const extraScrollHeight = extraScrollHeigth();
	const { previousRoute } = useAppSelector(userSelectors.selectRoute);

	const consultToken = async () => {
		try {
			let body = {
				locale: lang,
			};
			let response = await requestTokenize(token as string, body);
			setAccessToken(response.data.access_token);
		} catch (error) {
			console.log('error ->', error);
		}
	};

	useEffect(() => {
		dispatch(loaderActions.setLoading(true));
		if (!!userData.authUid) {
			consultToken();
		}
	}, []);

	const config = getConfigValues({
		type: typeSensly,
		userData,
		lang,
		token: accessToken as string,
		userType: !props?.route?.params ? 'public' : 'nonpublic',
	});

	const run = `document.dispatchEvent( new CustomEvent('init_sensely',{ detail:${JSON.stringify(
		config,
	)}}));
  		true;m
	`;

	const validateAction = async (menuAction: string) => {
		console.log('--_>>menuAction', menuAction);
		switch (true) {
			case menuAction === 'bookappointment':
				await analytics().logEvent('text', { data: 'Book appointment' });
				navigation.navigate('VimView');
				break;
			case menuAction === 'prevappointment':
				dispatch(userActions.setIsBeWell(false));
				navigation.navigate('PreviusBookingScreen');
				break;
			case menuAction === 'upcappointment':
				dispatch(userActions.setIsBeWell(false));
				navigation.navigate('UpcomingBookingScreen');
				break;
			case menuAction === 'televisit':
				navigation.navigate('VideoCallScreen');
				break;
			case menuAction === 'doctorchat':
				//	navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': previousRoute });
				dispatch(userActions.setStateVewChat({ queue: 'provider', stateView: true }));
				break;

			default:
				break;
		}
	};

	const handlingMessage = useCallback((event: WebViewMessageEvent) => {
		const { data } = event.nativeEvent;
		const message = JSON.parse(data);

		console.log('message--..>', message);
		switch (message.type) {
			case 'sensely_ok':
				dispatch(loaderActions.setLoading(false));
				setShow(true);
				return;
			case 'sensely_script_loaded':
				webViewRef?.current?.injectJavaScript(run);
				return;
			case 'sensely_message':
				const payload = message.payload;
				if (payload.KERALTY_ACTION === 'menu') {
					validateAction(payload.MENU);
				}
				break;
		}
	}, []);

	useEffect(() => {
		dispatch(loaderActions.setLoading(true));
	}, []);

	return (
		<SafeScreen>
			<KeyboardAvoidingView behavior="padding" style={{ flexGrow: 1 }}>
				{userData.authUid && accessToken ? (
					<ViewSensely
						html={HTMLSensely}
						webRef={webViewRef}
						handlingMessage={handlingMessage}
						webViewBar={
							show ? (
								<HeaderLibrary
									title={
										typeParam === 'ASSISTANT'
											? t('library.virtual')
											: typeParam == 'LIFESTYLE_LIB'
											? t('library.library')
											: t('library.check')
									}
								/>
							) : (
								<></>
							)
						}
					/>
				) : !userData.authUid && !accessToken ? (
					<ViewSensely
						html={HTMLSensely}
						webRef={webViewRef}
						handlingMessage={handlingMessage}
						webViewBar={
							show ? (
								<HeaderLibrary
									title={
										typeParam === 'ASSISTANT'
											? t('library.virtual')
											: typeParam == 'LIFESTYLE_LIB'
											? t('library.library')
											: t('library.check')
									}
								/>
							) : (
								<></>
							)
						}
					/>
				) : (
					<></>
				)}
			</KeyboardAvoidingView>
		</SafeScreen>
	);
};
