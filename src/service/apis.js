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
	GET_GENERAL_AVAILABILITY: (date) =>
		`${BASE}/api/Availability/General?date=${date}`,
	GET_REMINDER_AVAILABILITY: (key) =>
		`${BASE}/api/Availability/Reminder?key=${key}`,
};

export const accountEndpoints = {
	GETLIST_ACCOUNTS: `${BASE}/api/Accounts/GetList`,
	UPLOAD_ACCOUNTS: `${BASE}/api/Accounts/Upload`,
	GET_CLEAR_INVOICE: (invoiceNo) =>
		`${BASE}/api/Accounts/ClearInvoice?invoiceno=${invoiceNo}`,
};

export const bookingsEndpoints = {
	CREATE_BOOKING: `${BASE}/api/Bookings/Create`,
	ALLOCATE_BOOKINGS: `${BASE}/api/Bookings/Allocate`,
	COMPLETE_BOOKINGS: `${BASE}/api/Bookings/Complete`,
	BOOKING_QUOTE: `${BASE}/api/Bookings/Quote`,
	UPDATE_BOOKING_QUOTE: `${BASE}/api/Bookings/UpdateQuote`,
	REMOVE_COA: `${BASE}/api/Bookings/RemoveCOA`,
	CANCEL_BOOKING: `${BASE}/api/Bookings/Cancel`,
};

export const gpsEndpoints = {
	GET_ALL_GPS: `${BASE}/api/UserProfile/GetAllGPS`,
};
