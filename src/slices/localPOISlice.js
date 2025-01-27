/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	localPOIs: [],
	localPOI: null,
};

const localPoisSlice = createSlice({
	name: 'localPoi',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setLocalPOIs(state, action) {
			state.localPOIs = action.payload;
		},
		setLocalPOI(state, action) {
			state.localPOI = action.payload;
		},
	},
});

export const { setLoading, setLocalPOIs, setLocalPOI } = localPoisSlice.actions;

export default localPoisSlice.reducer;
