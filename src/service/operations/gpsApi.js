/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq } from '../apiRequestHandler';
import { gpsEndpoints } from '../apis';

const { GET_ALL_GPS } = gpsEndpoints;
export async function gstAllGPS() {
	// Fetch current user details using token
	const response = await handleGetReq(GET_ALL_GPS);

	console.log('GET ME API RESPONSE.........', response);

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
