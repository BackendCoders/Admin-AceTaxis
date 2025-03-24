/** @format */

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB4FIuijeXuTHw-5PQRsveIlAnUlCuTgrM',
	authDomain: 'test-cda92.firebaseapp.com',
	projectId: 'test-cda92',
	storageBucket: 'test-cda92.firebasestorage.app',
	messagingSenderId: '682669403712',
	appId: '1:682669403712:web:b77a4199c66848acc6b9a5',
	measurementId: 'G-K788GFL7SD',
};

// VAPID Key
const vapidKey =
	'BFgulecJClvK7U-j0Jc0_mvFS8cXFvM3phpt12T2Qpa1GP_oCGCY1-cNc9g8qtVBYSYyGhMLPnusglRxRrJI_n8';

console.log('** Firebase Config **', firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
	if (!('serviceWorker' in navigator)) {
		throw new Error('Service Worker not supported in this browser.');
	}
	const swPath = `http://localhost:5173/firebase-messaging-sw.js`;
	return window.navigator.serviceWorker
		.getRegistration(swPath)
		.then((serviceWorker) => {
			if (serviceWorker) return serviceWorker;
			return window.navigator.serviceWorker.register(swPath);
		});
};

export const getFirebaseToken = async () => {
	if (!messaging) throw new Error('Messaging not available');
	const serviceWorkerRegistration = await getOrRegisterServiceWorker();
	const permission = await Notification.requestPermission();
	if (permission === 'granted') {
		return getToken(messaging, { vapidKey, serviceWorkerRegistration });
	} else {
		throw new Error('Notification permission denied');
	}
};

export const onForegroundMessage = () => {
	if (!messaging) throw new Error('Messaging not available');
	return new Promise((resolve, reject) => {
		onMessage(
			messaging,
			(payload) => resolve(payload),
			(error) => reject(error)
		);
	}).catch((error) => {
		console.error('Error in onForegroundMessage:', error);
		throw error;
	});
};
