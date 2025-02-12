/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, setHeaders } from '../apiRequestHandler';
import { dashBoardEndpoints, driverEarningEndpoints } from '../apis';

const { GET_DASHBOARD } = dashBoardEndpoints;
const { GET_DRIVER_EARNINGS_REPORT } = driverEarningEndpoints;

export async function dashboard() {
	const response = await handleGetReq(GET_DASHBOARD);

	console.log('GET DASHBOARD API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_DASHBOARD,
		// 		reqBody: null,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}

export async function driverEarningsReport() {
	const response = await handleGetReq(GET_DRIVER_EARNINGS_REPORT);

	console.log('GET DRIVER EARNINGS REPORT API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_DRIVER_EARNINGS_REPORT,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}
