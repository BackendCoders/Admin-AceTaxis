/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	localPOIs: [],
	localPOI: null,
};

const localPoiSlice = createSlice({
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

export const { setLoading, setLocalPOIs, setLocalPOI } = localPoiSlice.actions;

export default localPoiSlice.reducer;
