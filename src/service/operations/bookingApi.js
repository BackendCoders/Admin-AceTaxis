/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq } from '../apiRequestHandler';
import { bookingsEndpoints } from '../apis';

const { CANCEL_BOOKING_DATE_RANGE, GET_CARD_BOOKINGS } = bookingsEndpoints;
export async function cancelBookingByDateRange(data) {
	// Fetch current user details using token
	const response = await handlePostReq(CANCEL_BOOKING_DATE_RANGE, data);

	console.log('CANCEL BOOKING API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_ALL_GPS,
		// 		reqBody: null,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}

export async function getAllCardBookings() {
	const response = await handleGetReq(GET_CARD_BOOKINGS);
	console.log('get all card bookings response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_LOCAL_POI2,
		// 		reqBody: searchTerm,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
	return null;
}
