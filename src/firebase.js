/** @format */

import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from 'firebase/messaging';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is incomplete:', firebaseConfig);
  throw new Error('Firebase configuration is incomplete. Check environment variables.');
}

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Singleton for messaging instance
let messaging = null;

// Initialize messaging if supported
const initializeMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(firebaseApp);
      console.log('Firebase Messaging initialized successfully.');
    } else {
      console.warn('Firebase Messaging is not supported in this environment.');
    }
    return supported;
  } catch (error) {
    console.error('Error initializing Firebase Messaging:', error);
    return false;
  }
};

// Initialize messaging on load
(async () => {
  const isMessagingSupported = await initializeMessaging();
  if (!isMessagingSupported) {
    console.warn('Firebase Messaging will not work in this environment.');
  }
})();

// Get FCM Token
export const getFirebaseToken = async () => {
  if (!messaging) {
    console.warn('Firebase Messaging not available. Cannot fetch token.');
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });
    if (!token) {
      console.warn('No FCM token available. Ensure notifications are enabled.');
    }
    return token || null;
  } catch (error) {
    console.error('Failed to fetch FCM token:', error);
    return null;
  }
};

// Listen for Foreground Messages
export const onForegroundMessage = (callback) => {
  if (!messaging) {
    console.warn('Firebase Messaging not available. Cannot listen for messages.');
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload);
    callback(payload);
  });
};