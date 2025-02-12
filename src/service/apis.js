/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
	LOGIN: `${BASE}/api/UserProfile/Login`,
	REGISTER: `${BASE}/api/UserProfile/Register`,
	GET_USER: (username) =>
		`${BASE}/api/UserProfile/GetUser?username=${username}`,
	RESET_PASSWORD: (userId) =>
		`${BASE}/api/UserProfile/ResetPassword?userId=${userId}`,
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

export const dashBoardEndpoints = {
	GET_DASHBOARD: `${BASE}/api/AdminUI/Dashboard`,
};

export const driverEarningEndpoints = {
	GET_DRIVER_EARNINGS_REPORT: `${BASE}/api/AdminUI/DriverEarningsReport`,
};

export const settingsEndpoints = {
	GET_MSG_CONFIG: `${BASE}/api/AdminUI/GetMessageConfig`,
	SET_MSG_CONFIG: `${BASE}/api/AdminUI/SetMessageConfig`,
	GET_COMPANY_CONFIG: `${BASE}/api/AdminUI/GetCompanyConfig`,
	SET_COMPANY_CONFIG: `${BASE}/api/AdminUI/SetCompanyConfig`,
	GET_TARIFF_CONFIG: `${BASE}/api/AdminUI/GetTariffConfig`,
	SET_TARIFF_CONFIG: `${BASE}/api/AdminUI/SetTariffConfig`,
};

export const billingAndPaymentEndpoints = {
	GET_VATOUTPUTS: `${BASE}/api/AdminUI/VATOutputs`,
};

export const webBookingEndpoints = {
	GET_WEB_BOOKINGS: `${BASE}/api/WeBooking/GetWebBookings`,
	ACCEPT_WEB_BOOKING: `${BASE}/api/WeBooking/Accept`,
	REJECT_WEB_BOOKING: `${BASE}/api/WeBooking/Reject`,
	GET_DURATION: (id) => `${BASE}/api/WeBooking/GetDuration?wid=${id}`,
};
