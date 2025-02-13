/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import accountReducer from '../slices/accountSlice';
import localPoiReducer from '../slices/localPOISlice';
import bookingReducer from '../slices/bookingSlice';
import availabilityReducer from '../slices/availabilitySlice';
import dashboardReducer from '../slices/dashboardSlice';
import webBookingReducer from '../slices/webBookingSlice';
import notificationReducer from '../slices/notificationSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	dashboard: dashboardReducer,
	account: accountReducer,
	availability: availabilityReducer,
	booking: bookingReducer,
	webBooking: webBookingReducer,
	localPoi: localPoiReducer,
	notification: notificationReducer,
});

export default rootReducer;
