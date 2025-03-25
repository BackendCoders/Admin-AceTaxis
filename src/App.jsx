/** @format */

import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRouting } from '@/routing';
import { PathnameProvider } from '@/providers';
import { getFirebaseToken, onForegroundMessage } from './firebase';
import toast from 'react-hot-toast';
import { updateFCM } from './service/operations/gpsApi';

// Move BASE_URL outside the component to avoid re-evaluation
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

  // Handle foreground notifications
  useEffect(() => {
    const unsubscribe = onForegroundMessage((payload) => {
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
      if (permission === 'granted') {
        const token = await getFirebaseToken();
        if (token) {
          if (token !== fcmToken) {
            setFcmToken(token); // Update local state to prevent duplicate API calls
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

  // Request permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Periodically check for token refresh (optional, if needed)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (Notification.permission === 'granted') {
        const token = await getFirebaseToken();
        if (token && token !== fcmToken) {
          setFcmToken(token);
          try {
            await updateFCM(token);
            console.log('FCM token refreshed and updated successfully.');
          } catch (error) {
            console.error('Error refreshing FCM token:', error);
          }
        }
      }
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [fcmToken]);

  return (
    <BrowserRouter basename={BASE_URL}>
      <PathnameProvider>
        <AppRouting />
      </PathnameProvider>
    </BrowserRouter>
  );
};

export { App };