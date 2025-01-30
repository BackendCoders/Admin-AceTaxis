/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import accountReducer from '../slices/accountSlice';
import localPoiReducer from '../slices/localPOISlice';
import bookingReducer from '../slices/bookingSlice';
import availabilityReducer from '../slices/availabilitySlice';
import dashboardReducer from '../slices/dashboardSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	dashboard: dashboardReducer,
	account: accountReducer,
	availability: availabilityReducer,
	booking: bookingReducer,
	localPoi: localPoiReducer,
});

export default rootReducer;
