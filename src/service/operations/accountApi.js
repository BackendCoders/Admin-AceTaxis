/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq, setHeaders } from '../apiRequestHandler';
import { accountEndpoints } from '../apis';

const { GETLIST_ACCOUNTS, UPLOAD_ACCOUNTS, GET_CLEAR_INVOICE } =
	accountEndpoints;

export async function gstListAccount() {
	// Fetch current user details using token
	const response = await handleGetReq(GETLIST_ACCOUNTS);

	console.log('Get List Account API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GETLIST_ACCOUNTS,
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

export async function uploadAccounts(data) {
	// Upload accounts data using token
	const response = await handlePostReq(UPLOAD_ACCOUNTS, data);
	console.log('Upload Account API RESPONSE.........', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: UPLOAD_ACCOUNTS,
				reqBody: data,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}

export async function getClearInvoice(invoiceNo) {
	const response = await handleGetReq(GET_CLEAR_INVOICE(invoiceNo));

	console.log('clear invoice api response ---', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: GET_CLEAR_INVOICE(invoiceNo),
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
