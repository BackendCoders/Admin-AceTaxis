/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, setHeaders } from '../apiRequestHandler';
import { billingAndPaymentEndpoints } from '../apis';

const { GET_VATOUTPUTS } = billingAndPaymentEndpoints;

export async function getMsgConfig() {
	const response = await handleGetReq(GET_VATOUTPUTS);

	console.log('GET VAT OUTPUTS API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_VATOUTPUTS,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}
