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
	GET_AVAILABILITY_LOG: (userId, date) =>
		`${BASE}/api/AdminUI/AvailabilityLog?userid=${userId}&date=${date}`,
	GET_AVAILABILITY: (userId, date) =>
		`${BASE}/api/AdminUI/GetAvailability?userid=${userId}&date=${date}`,
	DELETE_AVAILABILITY: (id) =>
		`${BASE}/api/AdminUI/DeleteAvailability?availabilityId=${id}`,
	SET_AVAILABILITY: `${BASE}/api/AdminUI/SetAvailability`,
	AVAILABILITY_REPORT: `${BASE}/api/AdminUI/AvailabilityReport`,
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
	SEND_REMINDER_CARD_PAYMENT: `${BASE}/api/AdminUI/SendCardPaymentReminder`,
	BOOKING_AUDIT: (id) => `${BASE}/api/AdminUI/BookingAudit?bookingId=${id}`,
	BOOKING_STATUS: (date, scope, status) =>
		`${BASE}/api/AdminUI/BookingsByStatus?date=${date}&scope=${scope}${status ? `&status=${status}` : ''}`,
	ALLOCATE_BOOKING: `${BASE}/api/Bookings/Allocate`,
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
	GET_WEB_CHANGE_REQUEST: `${BASE}/api/AdminUI/GetWebChangeRequests`,
	UPDATE_WEB_CHANGE_REQUEST: (id) =>
		`${BASE}/api/AdminUI/UpdateWebChangeRequest?reqId=${id}`,
	ACCEPT_WEB_BOOKING: `${BASE}/api/WeBooking/Accept`,
	REJECT_WEB_BOOKING: `${BASE}/api/WeBooking/Reject`,
	GET_DURATION: (id) => `${BASE}/api/WeBooking/GetDuration?wid=${id}`,
	CANCEL_BOOKING: `${BASE}/api/Bookings/Cancel`,
};

export const notificationEndpoints = {
	GET_NOTIFICATIONS: `${BASE}/api/AdminUI/GetNotifications`,
	CLEAR_NOTIFICATIONS: (id) => `${BASE}/api/AdminUI/ClearNotification?id=${id}`,
	CLEAR_ALL_NOTIFICATIONS: (type) =>
		`${BASE}/api/AdminUI/ClearAllNotifications?type=${type}`,
	CLEAR_ALL_NOTIFICATIONS_WITHOUT_TYPE: `${BASE}/api/AdminUI/ClearAllNotifications`,
};

export const driverEndpoints = {
	DRIVER_EXPENSES: `${BASE}/api/AdminUI/DriverExpenses`,
	GET_DRIVER_LIST: `${BASE}/api/AdminUI/DriversList`,
	ADD_DRIVER: `${BASE}/api/AdminUI/DriverAdd`,
	UPDATE_DRIVER: `${BASE}/api/AdminUI/DriverUpdate`,
	DELETE_DRIVER: (userId) =>
		`${BASE}/api/AdminUI/DriverDelete?userId=${userId}`,
	GET_DRIVER_RESEND_LOGIN: (userId) =>
		`${BASE}/api/AdminUI/DriverResendLogin?userId=${userId}`,
	GET_DRIVER_SHOW_ALL_JOBS: (userId, turnOn) =>
		`${BASE}/api/AdminUI/DriverShowAllJobs?userId=${userId}&turnOn=${turnOn}`,
	GET_DRIVER_SHOW_HVS_JOBS: (userId, turnOn) =>
		`${BASE}/api/AdminUI/DriverShowHVSJobs?userId=${userId}&turnOn=${turnOn}`,
	GET_DRIVER_LOCKOUT: (userId, lockout) =>
		`${BASE}/api/AdminUI/DriverShowHVSJobs?userId=${userId}&lockout=${lockout}`,
};
