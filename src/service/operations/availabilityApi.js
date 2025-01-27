/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, setHeaders } from '../apiRequestHandler';
import { availabilityEndpoints } from '../apis';

const { GET_GENERAL_AVAILABILITY, GET_REMINDER_AVAILABILITY } =
	availabilityEndpoints;
export async function gstGeneralAvailability(date) {
	// Fetch current user details using token
	const response = await handleGetReq(GET_GENERAL_AVAILABILITY(date));

	console.log('Get general Availability API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_GENERAL_AVAILABILITY,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}

export async function getReminderAvailability(key) {
	const response = await handleGetReq(GET_REMINDER_AVAILABILITY(key));

	console.log('Get reminder Availability API RESPONSE.........', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: GET_REMINDER_AVAILABILITY(key),
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}
