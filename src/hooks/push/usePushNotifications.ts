import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function usePushNotifications() {
	const [FCMToken, setFCMToken] = useState<string>('');

	useEffect(() => {
		handleRequestPermissions();
	}, []);

	const requestUserPermissions = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
			await retrievePushToken();
		}
	};

	//Metodo para versiones de Android API +33
	const requestAndroidPermissions = async () => {
		if (Platform.OS === 'android' && Platform.Version >= 33) {
			console.log('Requesting for API +33');
			try {
				if (PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
					);

					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						console.log('Notification permission granted on Android');
					} else {
						console.log('Notification permission denied on Android');
					}
				} else {
					console.log('POST_NOTIFICATIONS permission is not available');
				}
			} catch (error) {
				console.log('Error solicitando Android permissions API +33:', error);
			}
		}
	};

	const retrievePushToken = async () => {
		try {
			// Obtiene el token del dispositivo
			const token = (await messaging().getToken()) ?? '';
			if (token) {
				console.log('Token de dispositivo para push notifications:', token);
				// alert('Token para push notifications: ' + token);
				setFCMToken(token);
			} else {
				console.log('No se pudo obtener el token de dispositivo');
			}
			return token;
		} catch (error) {
			console.error('Error al obtener el token de dispositivo', error);
			return '';
		}
	};

	const handleRequestPermissions = useCallback(async () => {
		await requestUserPermissions();
		await requestAndroidPermissions();
	}, []);

	return { retrievePushToken, FCMToken };
}
