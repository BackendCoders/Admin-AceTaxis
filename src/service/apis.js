/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
	LOGIN: `${BASE}/api/UserProfile/Login`,
	REGISTER: `${BASE}/api/UserProfile/Register`,
	GET_USER: (username) =>
		`${BASE}/api/UserProfile/GetUser?username=${username}`,
};

export const LocalPoiEndpoints = {
	CREATE_LOCAL_POI: `${BASE}/api/LocalPOI/Create`,
	UPDATE_LOCAL_POI: `${BASE}/api/LocalPOI/Update`,
	DELETE_LOCAL_POI: `${BASE}/api/LocalPOI/Delete`,
	UPLOAD_LOCAL_POI: `${BASE}/api/LocalPOI/Upload`,
	GET_LOCAL_POI: `${BASE}/api/LocalPOI/GetPOI`,
	GET_LOCAL_POI2: `${BASE}/api/LocalPOI/GetPOI2`,
};

export const availabilityEndpoints = {
	GET_GENERAL_AVAILABILITY: `${BASE}/api/Availability/General`,
	GET_REMINDER_AVAILABILITY: `${BASE}/api/Availability/Reminder`,
};

export const accountEndpoints = {
	GETLIST_ACCOUNTS: `${BASE}/api/Accounts/GetList`,
	UPLOAD_ACCOUNTS: `${BASE}/api/Accounts/Upload`,
	GET_CLEAR_INVOICE: `${BASE}/api/Accounts/ClearInvoice`,
};

export const bookingsEndpoints = {
	CANCEL_BOOKING: `${BASE}/api/Bookings/Cancel`,
};

export const gpsEndpoints = {
	GET_ALL_GPS: `${BASE}/api/UserProfile/GetAllGPS`,
};
