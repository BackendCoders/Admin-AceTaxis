/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	bookings: [],
	booking: null,
};

const bookingSlice = createSlice({
	name: 'booking',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setBookings: (state, action) => {
			state.bookings = action.payload;
		},
		setBooking: (state, action) => {
			state.booking = action.payload;
		},
	},
});

export const { setLoading, setBookings, setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
