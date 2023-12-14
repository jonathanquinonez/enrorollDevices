import React, { useCallback, useEffect, useRef, useState } from 'react';
import SafeScreen from '../../components/organisms/SafeScreen/SafeScreen';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import i18n from 'i18n/i18n';
import { ViewVim } from '@quillbot/keralty-kdc-usa-front-library-vim';

import { loaderActions } from 'adapter/loader/loaderSlice';
import { useNavigation } from '@react-navigation/native';
import { getConfigValues } from './Util';
import TemplateVim from './TemplateVim';
import useTokenizeVim from 'hooks/useTokenizeVim';
import FORMATS from 'ui-core/utils/formats';
import moment from 'moment';
import { Platform, View } from 'react-native';
import { HeaderLibrary } from 'src/components/molecules/HeaderLibrary/HeaderLibrary';

export const VimView = () => {
	const webViewRef = useRef<any>(null);
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const userData = useAppSelector(userSelectors.selectUserInfo);
	const userInformation = useAppSelector(userSelectors.selectUser);
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const { token } = useAppSelector(userSelectors.selectIsLoggedIn);
	const { requestTokenize } = useTokenizeVim();
	const [tokenize, setTokenize] = useState<string>();
	const [config, setConfig] = useState<any>(
		getConfigValues({
			lang,
			memberToken:
				'',
			userData,
		}),
	);
	const [load, setLoad] = useState<boolean>(false);

	const consult = async () => {
		try {
			const auth = {
				memberId: userInformation.ecwId,
				firstName: userInformation.firstName,
				lastName: userInformation.lastName,
				email: userInformation.email,
				dateOfBirth: moment(userInformation.birthdate).format(FORMATS.date),
				state: userInformation.state,
				phoneNumber: {
					countryDialingCode: '+1',
					number: userInformation?.phone.replace(/[()-]/g, ''), //userInformation.phone
				},
			};
			let response = await requestTokenize(token as string, auth);
			setLoad(true);
			setTokenize(response.data.token);
			setConfig(getConfigValues({ lang, memberToken: response.data.token, userData }));
		} catch (error) {
			setTokenize('NA');
			setConfig(getConfigValues({ lang, memberToken: '', userData }));
			console.log('error errrrr -->', error);
		}
	};

	useEffect(() => {
		dispatch(loaderActions.setLoading(true));
		if (userData.firstName) {
			consult();
		}
	}, []);

	const message = (event: any) => {
		const message = JSON.parse(event.nativeEvent.data);
		switch (message.type) {
			case 'vim_ok':
				dispatch(loaderActions.setLoading(false));
				setLoad(false);
				return;
			case 'vim_script_loaded':
				webViewRef?.current?.injectJavaScript(`
				document.dispatchEvent( new CustomEvent('init_vim',{ detail:${JSON.stringify(config)}}));
				true;
				`);
				return;
			case 'vim_close':
				navigation.goBack();
				return;
		}
		if (message.event === 'finished') {
			navigation.goBack();
		}
	};

	return (
		<SafeScreen>
			{Platform.OS === 'ios' ?  <HeaderLibrary styleContainer={{height:35}} styleButton={{marginTop:3}}/> : <></>}
			{userData.firstName && tokenize ? (
				<ViewVim
					//html={TemplateVim(tokenize)}
					html={TemplateVim}
					webRef={webViewRef}
					handlingMessage={message}
					isScrollEnabled={true}
				/>
			) : !userData.firstName && !tokenize ? (
				<ViewVim
					//html={TemplateVim(tokenize)}
					html={TemplateVim}
					webRef={webViewRef}
					handlingMessage={message}
					isScrollEnabled={true}
				/>
			) :<View style={{backgroundColor:'white' , flex:1}}></View>}
		</SafeScreen>
	);
};
