/** @format */

importScripts(
	'https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
	apiKey: 'AIzaSyB4FIuijeXuTHw-5PQRsveIlAnUlCuTgrM',
	authDomain: 'test-cda92.firebaseapp.com',
	projectId: 'test-cda92',
	storageBucket: 'test-cda92.firebasestorage.app',
	messagingSenderId: '682669403712',
	appId: '1:682669403712:web:b77a4199c66848acc6b9a5',
	measurementId: 'G-K788GFL7SD',
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 🔔 Background Notifications
messaging.onBackgroundMessage((payload) => {
	console.log('Background Message Received:', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/firebase-logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
