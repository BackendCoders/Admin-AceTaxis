/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllCardBookings } from '../service/operations/bookingApi';

const initialState = {
	loading: false,
	cardBookings: [],
	cardBooking: null,
};

const bookingSlice = createSlice({
	name: 'booking',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setCardBookings: (state, action) => {
			state.bookings = action.payload;
		},
		setCardBooking: (state, action) => {
			state.booking = action.payload;
		},
	},
});

export function refreshAllCardBookings() {
	return async (dispatch) => {
		try {
			const response = await getAllCardBookings();
			console.log(response.data);

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

export const { setLoading, setCardBookings, setCardBooking } =
	bookingSlice.actions;
export default bookingSlice.reducer;
