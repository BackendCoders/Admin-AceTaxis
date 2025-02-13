/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	clearNotification,
	getNotifications,
} from '../service/operations/notificationApi';

const initialState = {
	loading: false,
	allNotifications: [],
	webNotifications: [],
	notification: null,
	unreadCount: 0,
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setALLNotifications(state, action) {
			state.allNotifications = action.payload;
			state.unreadCount = action.payload.filter((n) => n.status === 0).length;
		},
		setWebNotifications(state, action) {
			state.webNotifications = action.payload;
		},
		setNotification(state, action) {
			state.notification = action.payload;
		},
		clearUnreadCount(state) {
			state.unreadCount = 0;
		},
	},
});

export function refreshNotifications() {
	return async (dispatch) => {
		try {
			const response = await getNotifications();
			console.log(response);

			if (response.status === 'success') {
				const resultArray = Object.keys(response)
					.filter((key) => key !== 'status')
					.map((key) => response[key]);

				const webNotificationsArray = resultArray.filter(
					(data) => data?.event === 2
				);
				dispatch(setALLNotifications(resultArray));
				dispatch(setWebNotifications(webNotificationsArray));
			}
		} catch (error) {
			console.error('Failed to refresh users:', error);
		}
	};
}

export function markAsReadNotification(id) {
	return async (dispatch) => {
		try {
			const response = await clearNotification(id);
			if (response) {
				dispatch(refreshNotifications());
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export const {
	setLoading,
	setALLNotifications,
	setNotification,
	setWebNotifications,
	clearUnreadCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
