/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, setHeaders } from '../apiRequestHandler';
import { dashBoardEndpoints } from '../apis';

const { GET_DASHBOARD } = dashBoardEndpoints;

export async function dashboard() {
	const response = await handleGetReq(GET_DASHBOARD);

	console.log('GET DASHBOARD API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_DASHBOARD,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}
