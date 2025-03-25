/** @format */

import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRouting } from '@/routing';
import { PathnameProvider } from '@/providers';
import { getFirebaseToken, onForegroundMessage } from './firebase';
import toast from 'react-hot-toast';
import { updateFCM } from './service/operations/gpsApi';

const BASE_URL = import.meta.env.BASE_URL;

const App = () => {
  const { settings } = useSettings();
  const [notifications, setNotifications] = useState([]);
  const [fcmToken, setFcmToken] = useState(null);

  // Theme management
  const updateTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(settings.themeMode);
  }, [settings.themeMode]);

  useEffect(() => {
    updateTheme();
  }, [updateTheme]);

  // Register service worker (moved to main.jsx)

  // Handle foreground notifications
  useEffect(() => {
    const unsubscribe = onForegroundMessage((payload) => {
      console.log('Foreground message received on Vercel:', payload);
      if (!payload?.notification) {
        console.warn('Invalid foreground notification payload:', payload);
        return;
      }

      const { title, body } = payload.notification;
      setNotifications((prev) => [...prev, { title, body }]);
      toast.success(`🔔 ${title}: ${body}`, {
        duration: 4000,
        position: 'top-right',
      });
    });

    return () => unsubscribe?.();
  }, []);

  // Request notification permission and handle FCM token
  const requestPermission = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission result:', permission);
      if (permission === 'granted') {
        const token = await getFirebaseToken();
        if (token) {
          if (token !== fcmToken) {
            setFcmToken(token);
            try {
              const response = await updateFCM(token);
              console.log('FCM token sent to API successfully:', response);
              toast.success('FCM token updated successfully!');
            } catch (error) {
              console.error('Error sending FCM token to API:', error);
              toast.error('Failed to update FCM token.');
            }
          } else {
            console.log('FCM token unchanged, skipping API call.');
          }
        } else {
          console.warn('No FCM token retrieved.');
          toast.error('Failed to retrieve FCM token.');
        }
      } else {
        console.warn('Notification permission not granted:', permission);
        toast.error('Notification permission denied. Please enable notifications.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Error requesting notification permission.');
    }
  }, [fcmToken]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return (
    <BrowserRouter basename={BASE_URL}>
      <PathnameProvider>
        <AppRouting />
      </PathnameProvider>
    </BrowserRouter>
  );
};

// Switch to default export
export default App;