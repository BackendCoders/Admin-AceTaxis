/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAvailability } from '../service/operations/availabilityApi';

const initialState = {
	loading: false,
	availability: [],
};

const availabilitySlice = createSlice({
	name: 'availability',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setAvailability: (state, action) => {
			state.loading = true;
			state.availability = action.payload;
			state.loading = false;
		},
	},
});

export function refreshAvailability(userId, date) {
	return async (dispatch) => {
		try {
			const response = await getAvailability(userId, date);
			console.log(response.data);

			if (response.status === 'success') {
				const availabilityArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setAvailability(availabilityArray));
			}
		} catch (error) {
			console.error('Failed to refresh availability:', error);
		}
	};
}

export const { setAvailability, setLoading } = availabilitySlice.actions;

export default availabilitySlice.reducer;
