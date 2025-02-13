/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq } from '../apiRequestHandler';
import { notificationEndpoints } from '../apis';

const { GET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } = notificationEndpoints;
export async function getNotifications() {
	// Fetch current user details using token
	const response = await handleGetReq(GET_NOTIFICATIONS);

	console.log('GET NOTIFICATION API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_NOTIFICATIONS,
		// 		reqBody: null,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}

export async function clearNotification(id) {
	const response = await handleGetReq(CLEAR_NOTIFICATIONS(id));

	console.log('CLEAR NOTIFICATION API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		//     {
		//         url: CLEAR_NOTIFICATIONS(id),
		//         reqBody: null,
		//         headers: setHeaders(),
		//         response: response,
		//     },
		//     'info'
		// );
		return true;
	}
}
