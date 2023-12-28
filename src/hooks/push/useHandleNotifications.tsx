import { useEffect, useState } from 'react';
// import messaging from '@react-native-firebase/messaging';

/* --------------------- ATENCION ---------------------
Este codigo esta desactivado por re-definicion de alcance. NO ACTIVAR
------------------------ ANTECION ----------------------
*/

export default function useHandleNotifications(navigation: any) {
	const [notification, setNotification] = useState<any>(null);

	// useEffect(() => {
	// 	console.log('Creating listeners for notifications...');
	// 	const BackgroundHandler = () =>
	// 		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	// 			alert('Mensaje recibido en segundo plano: ' + JSON.stringify(remoteMessage));
	// 		});

	// 	const unsubscribeMessageHandler = messaging().onMessage(async (remoteMessage: any) => {
	// 		alert('FCM MESSAGE RECEIVED: ' + JSON.stringify(remoteMessage));
	// 		setNotification(remoteMessage);
	// 	});

	// 	const unsubscribeTab = messaging().onNotificationOpenedApp((remoteMessage) => {
	// 		redirectByNotification(remoteMessage, navigation);
	// 	});

	// 	messaging()
	// 		.getInitialNotification()
	// 		.then((remoteMessage) => {
	// 			if (remoteMessage) {
	// 				redirectByNotification(remoteMessage, navigation);
	// 			}
	// 		});

	// 	return () => {
	// 		unsubscribeMessageHandler();
	// 		BackgroundHandler();
	// 		unsubscribeTab();
	// 	};
	// }, []);

	const redirectByNotification = (remoteMessage: any, navigationObj: any) => {
		// console.log('User has tap notification');
	};

	// return { notification, redirectByNotification, setNotification };
	return {};
}
