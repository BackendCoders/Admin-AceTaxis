/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
	driverLockout,
	driverResendLogin,
	driverShowAllJobs,
	driverShowHvsJobs,
	getAllDrivers,
} from '../service/operations/driverApi';
import toast from 'react-hot-toast';

const initialState = {
	loading: false,
	drivers: [],
	driver: null,
};

const driverSlice = createSlice({
	name: 'driver',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setDrivers(state, action) {
			state.drivers = action.payload;
		},
		setDriver(state, action) {
			state.driver = action.payload;
		},
	},
});

export function refreshAllDrivers() {
	return async (dispatch) => {
		try {
			const response = await getAllDrivers();
			console.log(response.data);

			if (response.status === 'success') {
				const driversArray = Object.keys(response)
					.filter((key) => key !== 'status') // Exclude 'status' field
					.map((key) => response[key]);

				dispatch(setDrivers(driversArray));
			}
		} catch (error) {
			console.error('Failed to refresh drivers:', error);
		}
	};
}

export function handleLockJobs(id, lockout) {
	return async (dispatch) => {
		try {
			const response = await driverLockout(id, lockout);

			if (response.status === 'success') {
				toast.success('Driver Locked Successfully');
				dispatch(refreshAllDrivers());
			}
		} catch (error) {
			console.error('Failed to refresh drivers:', error);
		}
	};
}

export function handleShowAllJobs(id, turnOn) {
	return async (dispatch) => {
		try {
			const response = await driverShowAllJobs(id, turnOn);

			if (response.status === 'success') {
				toast.success('Driver Show Jobs Successfully');
				dispatch(refreshAllDrivers());
			}
		} catch (error) {
			console.error('Failed to refresh drivers:', error);
		}
	};
}

export function handleShowHvsJobs(id, turnOn) {
	return async (dispatch) => {
		try {
			const response = await driverShowHvsJobs(id, turnOn);

			if (response.status === 'success') {
				toast.success('Driver Show HVS Successfully');
				dispatch(refreshAllDrivers());
			}
		} catch (error) {
			console.error('Failed to refresh drivers:', error);
		}
	};
}

export function handleSendJobs(id) {
	return async (dispatch) => {
		try {
			const response = await driverResendLogin(id);

			if (response.status === 'success') {
				toast.success('Driver send Successfully');
				dispatch(refreshAllDrivers());
			}
		} catch (error) {
			console.error('Failed to refresh drivers:', error);
		}
	};
}

export const { setLoading, setDrivers, setDriver } = driverSlice.actions;

export default driverSlice.reducer;
