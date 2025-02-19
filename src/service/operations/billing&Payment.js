/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handlePostReq } from '../apiRequestHandler';
import { billingAndPaymentEndpoints } from '../apis';

const { GET_VATOUTPUTS } = billingAndPaymentEndpoints;

export async function getVATOutputs(data) {
	const response = await handlePostReq(GET_VATOUTPUTS, data);

	console.log('GET VAT OUTPUTS API RESPONSE.........', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_VATOUTPUTS,
		// 		reqBody: null,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
}
