/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	accounts: [],
	account: null,
};

const accountSlice = createSlice({
	name: 'account',
	initialState: initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setAccounts(state, action) {
			state.accounts = action.payload;
		},
		setAccount(state, action) {
			state.account = action.payload;
		},
	},
});

export const { setLoading, setAccounts, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
