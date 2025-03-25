/* @format */

// Import Firebase scripts
importScripts(
	'https://www.gstatic.com/firebasejs/11.5.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.5.0/firebase-messaging-compat.js'
);

// ✅ Firebase Configuration (Keep API keys secure in production)
const firebaseConfig = {
	apiKey: 'AIzaSyB4FIuijeXuTHw-5PQRsveIlAnUlCuTgrM',
	authDomain: 'test-cda92.firebaseapp.com',
	projectId: 'test-cda92',
	storageBucket: 'test-cda92.firebaseapp.com', // Fixed incorrect domain
	messagingSenderId: '682669403712',
	appId: '1:682669403712:web:b77a4199c66848acc6b9a5',
	measurementId: 'G-K788GFL7SD',
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Initialize Firebase Messaging
const messaging = firebase.messaging();

// ✅ Handle Background Push Notifications
messaging.onBackgroundMessage(({ notification }) => {
	if (!notification) return; // Prevent errors if no notification data

	const { title, body } = notification;
	const options = {
		body,
		icon: '/firebase-logo.png',
		badge: '/badge-icon.png', // Optional: Badge icon for notifications
		vibrate: [200, 100, 200], // Vibration pattern for alerts
	};

	// Show notification
	self.registration.showNotification(title, options);
});

// ✅ Handle Notification Click Events
self.addEventListener('notificationclick', (event) => {
	event.notification.close(); // Close notification when clicked

	// Open app when clicked
	event.waitUntil(
		clients
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then((clientList) => {
				for (const client of clientList) {
					if (client.url && 'focus' in client) return client.focus();
				}
				if (clients.openWindow) return clients.openWindow('/');
			})
	);
});
