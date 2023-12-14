import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n/i18n';
import { HeaderLibrary } from 'src/components/molecules/HeaderLibrary/HeaderLibrary';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';
import { isIphone } from 'src/utils/devices';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import Colors from 'config/constants/Colors';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { userActions } from 'adapter/user/userSlice';
import Button from 'src/components/atoms/Button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

const VitalSignWebView = (props: any) => {
	const [showWebView, setShowWebView] = React.useState(false);
	const navigation = useNavigation();
	const webViewRef = useRef<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [text, setText] = useState<string>('');
	const { email } = useAppSelector(userSelectors.selectUser);

	const { setModal, closeModal } = useBottomSheet();
	const dispatch = useAppDispatch();
	const isIOS = isIphone();
	const permission: Permission = isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
	const urlCallbackResults = 'https://www.colsanitas.com/success_deepaffex?'
	const sourceUri = props.route.params ? props.route.params.url : '';
	const injectedJS = `
        const sendRNA = async (event) => {
            window.ReactNativeWebView.postMessage(event);
        };

        window.addEventListener("message", message => {
            sendRNA(message.data.event);
        });

    `;

	const goBack = () => {
		navigation.goBack();
	};

	const handlingMessage = (event: WebViewMessageEvent) => {
		if (event) {
			console.log(event);
		}
	};

	const handlerRequestPermission = () => {
		request(permission).then((result) => {
			if (result === RESULTS.GRANTED) {
				setShowWebView(true);
			}
		});
	}

	const saveData = async (result: any) => {
		let getHistory: any = await AsyncStorage.getItem(`${email}mySanitas`);
		getHistory = JSON.parse(getHistory);
		console.log('1.....result.....1', getHistory)

		let listHistory: any[] = getHistory?.length ? getHistory : [];
		listHistory.push(result);
		console.log('.....result.....', result)
		await AsyncStorage.setItem(`${email}mySanitas`, JSON.stringify(listHistory));
	}

	const handlerChangeURL = async (webState: WebViewNavigation) => {
		const { url } = webState;
		console.log('URL ======>', url)
		if (url.indexOf(urlCallbackResults) > -1) {
			if (url.indexOf('error=') > -1) {
				setShowWebView(false);
				handlerMessage('Error in service ANURA', 'Error Worker Scan');
			} else if (url.indexOf('results=') > -1) {
				const dataEncode = url.split('=')[1];
				setText(dataEncode)
				const result = { date: new Date().toISOString(), data: dataEncode }
				await saveData(result);
				dispatch(userActions.setVitalResult(result));
				navigation.navigate<any>('VitalSignResults')
			}
		}
	}

	const handlerMessage = (message: string, title: string = 'Permission Camera') => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					title={title}
					warningText={message}
					textButton={'OK'}
					onPress={() => {
						closeModal(); goBack();
					}}
				/>
			),
			height: 600,
			blockModal: true,
		});
	}

	const permissionValidate = async () => {
		check(permission)
			.then((result) => {
				switch (result) {
					case RESULTS.UNAVAILABLE:
						handlerMessage('This feature is not available on this device');
						break;
					case RESULTS.DENIED:
						handlerRequestPermission();
						break;
					case RESULTS.LIMITED:
						handlerMessage('The permission is limited: some actions are possible')
						break;
					case RESULTS.GRANTED:
						setShowWebView(true);
						break;
					case RESULTS.BLOCKED:
						handlerMessage('The permission is denied and not requestable anymore')
						break;
				}
			})
			.catch((error) => {
				console.log(error)
			});
	};

	React.useEffect(() => {
		permissionValidate();
	}, []);

	if (!showWebView) {
		return (
			<View style={{ flex: 1, backgroundColor: '#034268' }}>

			</View>
		);
	}

	return (
		<View style={{ height: '100%' }}>
			<SafeScreen>
				<KeyboardAwareScrollView
					enableAutomaticScroll
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					enableOnAndroid={true}
					contentContainerStyle={{ flex: 1 }}
				>
					<WebView
						ref={webViewRef}
						onMessage={handlingMessage}
						source={{ uri: sourceUri }}
						injectedJavaScript={injectedJS}
						javaScriptEnabled={true}
						originWhitelist={['*']}
						scrollEnabled
						allowsInlineMediaPlayback
						mediaPlaybackRequiresUserAction={false}
						onNavigationStateChange={(event) => {
							handlerChangeURL(event)
						}}
					/>
				</KeyboardAwareScrollView>
			</SafeScreen>
		</View>
	);
};

export default VitalSignWebView;

