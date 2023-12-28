import React, {  useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import moment from 'moment';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { userSelectors } from 'adapter/user/userSelectors';
import {  useAppSelector } from 'adapter/hooks';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n/i18n';
import { HeaderLibrary } from 'src/components/molecules/HeaderLibrary/HeaderLibrary';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import { patientInformation } from '../GetCareNow/Payment/ModalBody/ModalBody.types';
import analytics from '@react-native-firebase/analytics';

const ChatSanitas = (props: any) => {
	const navigation = useNavigation();
	const webViewRef = useRef<any>(null);
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	
	const envNode = Config.APP_ENV;
	const [currentTimeZone,setCurrentTimeZone] = useState('')
	const { firstName, email,ecwId,birthdate,sex } = useAppSelector(userSelectors.selectUser);
	let [key,setKey] = useState(false)
	let {locationSelected} = useAppSelector(userSelectors.selectIsLoggedIn)
	const user = useAppSelector(userSelectors.selectUser)
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);

	//const envNode = process.env['NODE_ENV'];
	//validation and configuration of Chat
	let cyType = props.route.params
		? props.route.params.type
			? props.route.params.type
			: 'support'
		: 'support';
	let color = '#7cbc98';
	let userName = '';
	let userEmail = '';
	let sanitasAccountNumber='';
	let gender = '';
	let authUid = '';
	let birthday: string='';
	let currenTimeZone = '';
	let state: string | undefined= '';

	const logChat = async(data: string) => {
		//Add event Analitycs only english for reports
		await analytics().logEvent('text',{ 'data' : data})
	}

	switch (cyType) {
		case 'doctor':
			if(user.state==="TN"){
				color = '#055293';
				cyType = 'provider';
				userName = firstName;
				birthday = birthdate;
				authUid = authUid;
				gender = sex;
				currenTimeZone=currentTimeZone; 
				state = locationSelected;
				sanitasAccountNumber= ecwId ? ecwId : '';
				userEmail = email;

			}else{
				color = '#055293';
				cyType = 'provider';
				userName = firstName;
				birthday = birthdate;
				authUid = authUid;
				gender = sex;
				currenTimeZone=currentTimeZone; 
				state = locationSelected;
				sanitasAccountNumber= ecwId ? ecwId : '';
				userEmail = email;
			}
			//Add event Analitycs only english for reports
			logChat('Chat with a doctor')
			break;
		case 'educator':
			color = '#00cdac';
			cyType = 'educator';
			userName = firstName;
			gender = sex;
			authUid = authUid;
			currenTimeZone=currentTimeZone; 
			birthday = birthdate;
			sanitasAccountNumber= ecwId ? ecwId : '';
			state = locationSelected;
			userEmail = email;
			logChat('Chat with care educator')
			break;
		case 'supportUser':
			cyType = 'support';
			userName = firstName;
			gender = sex;
			authUid = authUid;
			currenTimeZone=currentTimeZone; 
			birthday = birthdate;
			sanitasAccountNumber= ecwId ? ecwId : '';
			state = locationSelected;
			userEmail = email;
			logChat('Chat with support');
			break;
		default:
			break;
	}


	useEffect(() => {
		let today = new Date()
		 let utc = moment(today).utcOffset()
		const utcNow = (moment(today).utcOffset(utc).format("Z")); 
		setCurrentTimeZone(utcNow)
		if (webViewRef && previousRoute == 'ChatSanitas') {
			webViewRef.current.reload();
		}
	})

	const sourceUri =
		(Platform.OS === 'android' ? 'file:///android_asset/' : '') + 'Web.bundle/loader.html';
	const params = 'platform=' + Platform.OS;
	let enviroment = '';
	switch (true) {
		case envNode?.includes('prd'):
			enviroment = '-prod';
			break;
		case envNode?.includes('uat'): 
			enviroment = '-uat' 
			break;
		default:
			enviroment = '';
			break;
	}
	const injectedJS = `
        //Load files of chat 
        if (!window.location.search) {
            var link = document.getElementById('progress-bar');
            link.href = './chat${enviroment}/index.html?${params}';
            link.click();
        } 
        window.Sanitas_native.setConfig({
            languageOverride: "${lang}",
            actionColor: "${color}",
            backgroundColor: "${color}",
            name: '${userName}',
            email: '${userEmail}',
			state: '${state}',
			gender:'${gender}',
			currentTimeZone: '${currentTimeZone}',
			sanitasAccountNumber: '${sanitasAccountNumber}',
			authUid:'${authUid}',
			birthday:'${birthday}',
            customAttributes: { cType: '${cyType}' }
        })
        window.Sanitas_native.showChat()

        const sendRNA = async (event) => {
            window.ReactNativeWebView.postMessage(event);
        };

        window.addEventListener("message", message => {
            sendRNA(message.data.event);
        });
    `;

	const goBack = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const handlingMessage = (event: WebViewMessageEvent) => {
		if (event) {
			const data: any = event.nativeEvent.data;
			switch (true) {
				case data === 'hideChat':
					previousRoute == "ChatDoctorScreen" && currentRoute == "ChatSanitas" ?
						goBack()
						: navigation.canGoBack() ?
							navigation.goBack()
							:
							navigation.navigate('Root')
					break;
				default:
					break;
			}
		}
	}


	return (
		<View style={{ height: '100%' }}>
			<SafeScreen>
				<HeaderLibrary styleContainer={{ height: 35 }} styleButton={{ marginTop: 3 }} />
				<KeyboardAwareScrollView
					enableAutomaticScroll
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					enableOnAndroid={true}
					contentContainerStyle={{ flex: 1 }}
				>
					<WebView
						ref={webViewRef}
						onMessage={handlingMessage}
						injectedJavaScript={injectedJS}
						source={{ uri: sourceUri }}
						javaScriptEnabled={true}
						originWhitelist={['*']}
						allowFileAccess={true}
						scrollEnabled
						allowFileAccessFromFileURLs={true}
						allowUniversalAccessFromFileURLs={true}
					//onLoadEnd={() => dispatch(loaderActions.setLoading(false))}
					/>
				</KeyboardAwareScrollView>
			</SafeScreen>
		</View>
	);
};

export default ChatSanitas;
