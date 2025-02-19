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
	CREATE_LOCAL_POI: `${BASE}/api/AdminUI/AddPOI`,
	UPDATE_LOCAL_POI: `${BASE}/api/AdminUI/UpdatePOI`,
	DELETE_LOCAL_POI: (id) => `${BASE}/api/AdminUI/DeletePOI?id=${id}`,
	GET_ALL_POIS: `${BASE}/api/AdminUI/GetPOIs`,
};

export const availabilityEndpoints = {
	GET_GENERAL_AVAILABILITY: (date) =>
		`${BASE}/api/Availability/General?date=${date}`,
	GET_REMINDER_AVAILABILITY: (key) =>
		`${BASE}/api/Availability/Reminder?key=${key}`,
};

export const accountEndpoints = {
	CREATE_ACCOUNTS: `${BASE}/api/AdminUI/AddAccount`,
	GET_ACCOUNTS: `${BASE}/api/AdminUI/GetAccounts`,
	UPDATE_ACCOUNTS: `${BASE}/api/AdminUI/UpdateAccount`,
	DELETE_ACCOUNTS: (accno) =>
		`${BASE}/api/AdminUI/DeleteAccount?accno=${accno}`,
	REGISTER_ACCOUNT_WEB_BOOKER: `${BASE}/api/AdminUI/RegisterAccountWebBooker`,
	GET_CLEAR_INVOICE: (invoiceNo) =>
		`${BASE}/api/Accounts/ClearInvoice?invoiceno=${invoiceNo}`,
};

export const bookingsEndpoints = {
	GET_CARD_BOOKINGS: `${BASE}/api/AdminUI/CardBookings`,
	CANCEL_BOOKING_DATE_RANGE: `${BASE}/api/AdminUI/CancelBookingsInRange`,
};

export const gpsEndpoints = {
	GET_ALL_GPS: `${BASE}/api/UserProfile/GetAllGPS`,
};

export const dashBoardEndpoints = {
	GET_DASHBOARD: `${BASE}/api/AdminUI/Dashboard`,
	SEND_DIRECT_MSG_TO_DRIVER: (driver, msg) =>
		`${BASE}/api/AdminUI/SendMessageToDriver?driver=${driver}&message=${encodeURIComponent(msg)}`,
	SEND_GLOBAL_MSG_TO_DRIVER: (msg) =>
		`${BASE}/api/AdminUI/SendMessageToAllDrivers?message=${encodeURIComponent(msg)}`,
};

export const driverEarningEndpoints = {
	GET_ALL_DRIVERS: `${BASE}/api/UserProfile/ListUsers`,
	GET_DRIVER_EARNINGS_REPORT: `${BASE}/api/AdminUI/DriverEarningsReport`,
};

export const settingsEndpoints = {
	GET_MSG_CONFIG: `${BASE}/api/AdminUI/GetMessageConfig`,
	UPDATE_MSG_CONFIG: `${BASE}/api/AdminUI/UpdateMessageConfig`,
	GET_COMPANY_CONFIG: `${BASE}/api/AdminUI/GetCompanyConfig`,
	UPDATE_COMPANY_CONFIG: `${BASE}/api/AdminUI/UpdateCompanyConfig`,
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

export const notificationEndpoints = {
	GET_NOTIFICATIONS: `${BASE}/api/AdminUI/GetNotifications`,
	CLEAR_NOTIFICATIONS: (id) => `${BASE}/api/AdminUI/ClearNotification?id=${id}`,
	CLEAR_ALL_NOTIFICATIONS: (type) =>
		`${BASE}/api/AdminUI/ClearAllNotifications?type=${type}`,
	CLEAR_ALL_NOTIFICATIONS_WITHOUT_TYPE: `${BASE}/api/AdminUI/ClearAllNotifications`,
};
