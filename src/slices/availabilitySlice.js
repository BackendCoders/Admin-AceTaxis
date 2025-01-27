/** @format */

import { createSlice } from '@reduxjs/toolkit';

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

export const { setAvailability, setLoading } = availabilitySlice.actions;

export default availabilitySlice.reducer;
