/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	accountGetChargeableJobs,
	driverGetChargeableJobs,
	driverGetStatements,
	getCreditNotes,
	getInvoices,
} from '../service/operations/billing&Payment';

const initialState = {
	loading: false,
	allInvoicesData: [],
	statementHistory: [],
	invoiceHistory: [],
	driverChargeableJobs: { priced: [], notPriced: [] },
	accountChargeableJObs: { priced: [], notPriced: [] },
	creditNotes: [],
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
		setInvoiceHistory(state, action) {
			state.invoiceHistory = action.payload;
		},
		setDriverChargeableJobs(state, action) {
			state.driverChargeableJobs = action.payload;
		},
		setAccountChargeableJobs(state, action) {
			state.accountChargeableJobs = action.payload;
		},
		setCreditNotes(state, action) {
			state.creditNotes = action.payload;
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

export function refreshInvoiceHistory(from, to, accno) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getInvoices(from, to, accno);
			console.log(response);

			if (response.status === 'success') {
				const invoices = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setInvoiceHistory(invoices));
			}
		} catch (error) {
			console.error('Failed to refresh:', error);
		} finally {
			dispatch(setLoading(false));
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

				dispatch(setStatementHistory(statements));
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

export function refreshAccountChargeableJobs(accno, from, to) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await accountGetChargeableJobs(accno, from, to);
			console.log(response);

			if (response.status === 'success') {
				dispatch(
					setAccountChargeableJobs({
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

export function refreshCreditNotes(accno) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getCreditNotes(accno);
			console.log(response);

			if (response.status === 'success') {
				const credits = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setCreditNotes(credits));
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
	setInvoiceHistory,
	setDriverChargeableJobs,
	setAccountChargeableJobs,
	setCreditNotes,
} = billingSlice.actions;

export default billingSlice.reducer;
