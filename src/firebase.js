/** @format */

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// 🔥 Firebase Config
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 🔥 Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// 🔥 Initialize Messaging
let messaging;
try {
    messaging = getMessaging(firebaseApp);
} catch (err) {
    console.error('Error initializing Firebase Messaging:', err);
}

// 🔥 Get Firebase Token
export const getFirebaseToken = async () => {
	try {
		const currentToken = await getToken(messaging, {
			vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
		});
		if (currentToken) {
			console.log('FCM Token:', currentToken);
			return currentToken;
		} else {
			console.warn('No registration token available. Request permission.');
		}
	} catch (err) {
		console.error('Error fetching Firebase token:', err);
	}
};

// 🔥 Listen for Foreground Messages
export const onForegroundMessage = (callback) => {
	return onMessage(messaging, (payload) => {
		console.log('Foreground Message Received:', payload);
		callback(payload);
	});
};
