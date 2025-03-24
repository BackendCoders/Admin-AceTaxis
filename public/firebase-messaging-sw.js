/** @format */
/* eslint-env serviceworker */

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js'
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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
