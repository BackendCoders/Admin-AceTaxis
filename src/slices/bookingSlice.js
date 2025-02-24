/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	getAllCardBookings,
	getBookingAudit,
	getBookingByStatus,
} from '../service/operations/bookingApi';

const initialState = {
	loading: false,
	cardBookings: [],
	auditBookings: [],
	bookingsByStatus: [],
	booking: null,
};

const bookingSlice = createSlice({
	name: 'booking',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setCardBookings: (state, action) => {
			state.cardBookings = action.payload;
		},
		setAuditBookings: (state, action) => {
			state.auditBookings = action.payload;
		},
		setBookingsByStatus: (state, action) => {
			state.bookingsByStatus = action.payload;
		},
		setBooking: (state, action) => {
			state.booking = action.payload;
		},
	},
});

export function refreshAllCardBookings() {
	return async (dispatch) => {
		try {
			const response = await getAllCardBookings();
			console.log(response);
			if (response.status === 'success') {
				const cardBookingsArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setCardBookings(cardBookingsArray));
			}
		} catch (error) {
			console.error('Failed to refresh card Bookings:', error);
		}
	};
}

export function refreshAuditBookings(id) {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getBookingAudit(id);
			console.log(response);
			if (response.status === 'success') {
				const auditBookingsArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setAuditBookings(auditBookingsArray));
			}
		} catch (error) {
			console.error('Failed to refresh card Bookings:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export function refreshBookingsByStatus(date, scope, status) {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await getBookingByStatus(date, scope, status);
			console.log(response);
			if (response.status === 'success') {
				const bookingsArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setBookingsByStatus(bookingsArray));
			}
		} catch (error) {
			console.error('Failed to refresh Bookings by status:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const {
	setLoading,
	setCardBookings,
	setAuditBookings,
	setBookingsByStatus,
	setBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
