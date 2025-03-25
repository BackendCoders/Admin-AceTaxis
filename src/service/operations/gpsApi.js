/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq } from '../apiRequestHandler';
import { gpsEndpoints } from '../apis';

const { GET_ALL_GPS, UPDATE_FCM } = gpsEndpoints;
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

export async function updateFCM(fcm) {
	// Fetch current user details using token
	const response = await handlePostReq(UPDATE_FCM(fcm), null);

	console.log('UPDATE FCM.........', response);

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
