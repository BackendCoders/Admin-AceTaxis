/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq } from '../apiRequestHandler';
import { webBookingEndpoints } from '../apis';

const { GET_WEB_BOOKINGS, ACCEPT_WEB_BOOKING, REJECT_WEB_BOOKING } =
	webBookingEndpoints;
export async function getWebBookings() {
	// Fetch current user details using token
	const response = await handleGetReq(GET_WEB_BOOKINGS);

	console.log('GET WEB BOOKINGS API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_WEB_BOOKINGS,
		// 		reqBody: null,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}

export async function acceptWebBookings(data) {
	// Fetch current user details using token
	const response = await handlePostReq(ACCEPT_WEB_BOOKING, data);

	console.log('ACCEPT WEB BOOKINGS API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: ACCEPT_WEB_BOOKING,
		// 		reqBody: data,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}

export async function rejectWebBookings(data) {
	// Fetch current user details using token
	const response = await handlePostReq(REJECT_WEB_BOOKING, data);

	console.log('GET WEB BOOKINGS API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: REJECT_WEB_BOOKING,
		// 		reqBody: data,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}
