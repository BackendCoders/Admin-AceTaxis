/** @format */

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/11.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.5.0/firebase-messaging-compat.js');

// Firebase Configuration
// WARNING: These values should be injected during the build process in production
const firebaseConfig = {
  apiKey: 'AIzaSyCoKELS2o8EsCHAcpdoyFBd1zQ2ld0t69o',
  authDomain: 'joyride-cba49.firebaseapp.com',
  projectId: 'joyride-cba49',
  storageBucket: 'joyride-cba49.firebasestorage.app',
  messagingSenderId: '498604695616',
  appId: '1:498604695616:web:0b4dee2178c510c421bfa5',
  measurementId: 'G-FB4PHGWCCF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle Background Push Notifications
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received on Vercel:', payload);
  const notification = payload.notification;
  if (!notification) {
    console.warn('Invalid background notification payload:', payload);
    return;
  }

  const { title, body } = notification;
  const options = {
    body,
    icon: '/firebase-logo.png',
    badge: '/badge-icon.png',
    vibrate: [200, 100, 200],
    timestamp: Date.now(),
  };

  self.registration.showNotification(title, options);
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        const existingClient = clientList.find(
          (client) => client.url && 'focus' in client
        );
        if (existingClient) return existingClient.focus();
        if (clients.openWindow) return clients.openWindow('/');
      })
      .catch((error) => {
        console.error('Error handling notification click:', error);
      })
  );
});