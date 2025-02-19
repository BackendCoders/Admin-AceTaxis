/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handlePostReq } from '../apiRequestHandler';
import { bookingsEndpoints } from '../apis';

const { CANCEL_BOOKING_DATE_RANGE } = bookingsEndpoints;
export async function cancelBookingByDateRange() {
	// Fetch current user details using token
	const response = await handlePostReq(CANCEL_BOOKING_DATE_RANGE);

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
