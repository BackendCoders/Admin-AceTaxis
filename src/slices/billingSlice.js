/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	driverGetChargeableJobs,
	driverGetStatements,
	getInvoices,
} from '../service/operations/billing&Payment';

const initialState = {
	loading: false,
	allInvoicesData: [],
	statementHistory: [],
	driverChargeableJobs: { priced: [], notPriced: [] },
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
		setStatementHistory(state, action) {
			state.statementHistory = action.payload;
		},
		setDriverChargeableJobs(state, action) {
			state.driverChargeableJobs = action.payload;
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

export function refreshStatementHistory(from, to, userId) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await driverGetStatements(from, to, userId);
			console.log(response);

			if (response.status === 'success') {
				const statements = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setAllInvoicesData(statements));
			}
		} catch (error) {
			console.error('Failed to refresh:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export function refreshDriverChargeableJobs(userId, scope, lastDate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await driverGetChargeableJobs(userId, scope, lastDate);
			console.log(response);

			if (response.status === 'success') {
				dispatch(
					setDriverChargeableJobs({
						priced: response.priced || [],
						notPriced: response.notPriced || [],
					})
				);
			}
		} catch (error) {
			console.error('Failed to refresh:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const {
	setLoading,
	setAllInvoicesData,
	setStatementHistory,
	setDriverChargeableJobs,
} = billingSlice.actions;

export default billingSlice.reducer;
