/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getInvoices } from '../service/operations/billing&Payment';

const initialState = {
	loading: false,
	allInvoicesData: [],
};

const billingSlice = createSlice({
	name: 'billing',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setAllInvoicesData(state, action) {
			state.allInvoicesData = action.payload;
		},
	},
});

export function refreshInvoiceProcessorData(from, to, userId) {
	return async (dispatch) => {
		try {
			const response = await getInvoices(from, to, userId);
			console.log(response);

			if (response.status === 'success') {
				const invoiceArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setAllInvoicesData(invoiceArray));
			}
		} catch (error) {
			console.error('Failed to refresh:', error);
		}
	};
}

export const { setLoading, setAllInvoicesData } = billingSlice.actions;

export default billingSlice.reducer;
