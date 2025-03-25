/* @format */

// ✅ Import Firebase scripts (Load only necessary modules)
importScripts(
	'https://www.gstatic.com/firebasejs/11.5.0/firebase-app-compat.js',
	'https://www.gstatic.com/firebasejs/11.5.0/firebase-messaging-compat.js'
  );
  
  // ✅ Firebase Configuration (Keep API keys secure in production)
  const firebaseConfig = {
	apiKey: 'AIzaSyCoKELS2o8EsCHAcpdoyFBd1zQ2ld0t69o',
	authDomain: 'joyride-cba49.firebaseapp.com',
	projectId: 'joyride-cba49',
	storageBucket: 'joyride-cba49.firebasestorage.app',
	messagingSenderId: '498604695616',
	appId: '1:498604695616:web:0b4dee2178c510c421bfa5',
	measurementId: 'G-FB4PHGWCCF',
  };
  
  // ✅ Initialize Firebase App & Messaging
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  // ✅ Handle Background Push Notifications
  messaging.onBackgroundMessage(({ notification }) => {
	if (!notification) return; // Exit if no notification data
  
	const { title, body } = notification;
	const options = {
	  body,
	  icon: '/firebase-logo.png', // Notification icon
	  badge: '/badge-icon.png', // Badge icon (optional)
	  vibrate: [200, 100, 200], // Vibration pattern
	};
  
	// Display notification
	self.registration.showNotification(title, options);
  });
  
  // ✅ Handle Notification Click Events
  self.addEventListener('notificationclick', (event) => {
	event.notification.close(); // Close notification
  
	event.waitUntil(
	  clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
		for (const client of clientList) {
		  if (client.url && 'focus' in client) return client.focus();
		}
		return clients.openWindow && clients.openWindow('/'); // Open app if no window is focused
	  })
	);
  });