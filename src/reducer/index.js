/** @format */

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import accountReducer from '../slices/accountSlice';
import localPoiReducer from '../slices/localPOISlice';
import bookingReducer from '../slices/bookingSlice';
import availabilityReducer from '../slices/availabilitySlice';

const rootReducer = combineReducers({
	auth: authReducer,
	account: accountReducer,
	availability: availabilityReducer,
	booking: bookingReducer,
	localPoi: localPoiReducer,
});

export default rootReducer;
