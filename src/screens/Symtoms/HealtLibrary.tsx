//React
import React, { useCallback, useEffect, useRef, useState } from 'react';
//Adapter
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { loaderActions } from 'adapter/loader/loaderSlice';

//Library
import { ViewHealthLibrary, ViewSensely } from '@quillbot/keralty-kdc-usa-front-library-sensely';
//Config
import appConfig from 'config/index';
import i18n from 'i18n/i18n';
import { useTranslation } from 'react-i18next';
import { HeaderLibrary } from 'src/components/molecules/HeaderLibrary/HeaderLibrary';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import HTMLSensely from './TemplateSensly';
import { useNavigation } from '@react-navigation/native';

export const HealtLibrary = () => {


	

	const dispatch = useAppDispatch();
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const userData = useAppSelector(userSelectors.selectUser);
	const { t } = useTranslation();
	const webViewRef = useRef<any>(null);
	const [show, setShow] = useState<boolean>(false);

	const theme = appConfig.HEALTH.THEME ;
	const config = lang === 'es' ? appConfig.HEALTH.ES : appConfig.HEALTH.EN;

	const { USER_NAME: username, PASSWORD: password, PROCEDURE_ID: procedureId  } = config;


	const information = {
		conversationData: {
			userInfo: {
				dob: userData.birthdate,
				gender: userData.sex,
				organization_user_id: userData?.ecwId,
				party: 'self',
			},
		},
		lang,
		password, //"fz3FJKVa6mwf",
		procedureId, //"60ff28a743e22",//"6078a07f044e6",
		username,
		theme
	};

	const run = `document.dispatchEvent( new CustomEvent('init_sensely',{ detail:${JSON.stringify(
		information,
	)}}));
  		true;
	`;

	const menssage = useCallback((state: boolean) => {
		if (state) {
			dispatch(loaderActions.setLoading(true));
		} else {
			dispatch(loaderActions.setLoading(false));
		}
	}, []);

	const handlingMessage = useCallback((event: WebViewMessageEvent) => {
		const { data } = event.nativeEvent;
		const message = JSON.parse(data);

		switch (message.type) {
			case 'sensely_ok':
				dispatch(loaderActions.setLoading(false));
				setShow(true);
				return;
			case 'sensely_script_loaded':
				webViewRef?.current?.injectJavaScript(run);
				return;
		}
	}, []);

	useEffect(() => {
		dispatch(loaderActions.setLoading(true));
	}, []);

	return (
		<>
			<ViewSensely
				html={HTMLSensely}
				webRef={webViewRef}
				handlingMessage={handlingMessage}
				webViewBar={show ? <HeaderLibrary title={t('library.health')} /> : <></>}
			/>
		</>
	);
};

