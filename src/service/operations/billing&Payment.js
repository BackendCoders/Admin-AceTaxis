/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq } from '../apiRequestHandler';
import { billingAndPaymentEndpoints } from '../apis';

const {
	GET_VATOUTPUTS,
	DRIVER_PRICE_JOB_BY_MILEAGE,
	DRIVER_POST_OR_UNPOST_JOBS,
	DRIVER_GET_CHARGEABLE_JOBS,
	DRIVER_UPDATE_CHARGES_DATA,
	DRIVER_CREATE_STATEMENTS,
	DRIVER_GET_STATEMENTS,
	MARK_STATEMENT_AS_PAID,
	ACCOUNT_PRICE_MANUALLY,
	ACCOUNT_PRICE_JOB_BY_MILEAGE,
	ACCOUNT_PRICE_JOB_HVS,
	ACCOUNT_POST_OR_UNPOST_JOBS,
	ACCOUNT_GET_CHARGEABLE_JOBS,
	ACCOUNT_UPDATE_CHARGES_DATA,
	ACCOUNT_CREATE_INVOICE,
	MARK_INVOICE_AS_PAID,
	DELETE_INVOICE,
	CLEAR_INVOICE,
	GET_INVOICES,
} = billingAndPaymentEndpoints;

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

export async function driverPriceJobByMileage(data) {
	const response = await handlePostReq(DRIVER_PRICE_JOB_BY_MILEAGE, data);

	console.log(
		'GET DRIVER_PRICE_JOB_BY_MILEAGE API RESPONSE.........',
		response
	);

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
export async function driverPostOrUnpostJobs(postJob, id) {
	const response = await handlePostReq(DRIVER_POST_OR_UNPOST_JOBS(postJob), [
		id,
	]);

	console.log('GET DRIVER_POST_OR_UNPOST_JOBS API RESPONSE.........', response);

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
	return response;
}
export async function driverGetChargeableJobs(userId, scope, lastDate) {
	const response = await handlePostReq(
		DRIVER_GET_CHARGEABLE_JOBS(userId, scope, lastDate),
		null
	);

	console.log('GET DRIVER_GET_CHARGEABLE_JOBS API RESPONSE.........', response);

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
export async function driverUpdateChargesData(data) {
	const response = await handlePostReq(DRIVER_UPDATE_CHARGES_DATA, data);

	console.log('GET DRIVER_UPDATE_CHARGES_DATA API RESPONSE.........', response);

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
export async function driverCreateStatements(data) {
	const response = await handlePostReq(DRIVER_CREATE_STATEMENTS, data);

	console.log('GET DRIVER_CREATE_STATEMENTS API RESPONSE.........', response);

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
export async function driverGetStatements(from, to, userId) {
	const response = await handlePostReq(
		DRIVER_GET_STATEMENTS(from, to, userId),
		null
	);

	console.log('GET DRIVER_GET_STATEMENTS API RESPONSE.........', response);

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
export async function markStatementAsPaid(statementNo) {
	const response = await handleGetReq(MARK_STATEMENT_AS_PAID(statementNo));

	console.log('GET MARK_STATEMENT_AS_PAID API RESPONSE.........', response);

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
	return response;
}
export async function accountPriceManually(data) {
	const response = await handlePostReq(ACCOUNT_PRICE_MANUALLY, data);

	console.log('GET ACCOUNT_PRICE_MANUALLY API RESPONSE.........', response);

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
	return response;
}

export async function accountPriceJobByMileage(data) {
	const response = await handlePostReq(ACCOUNT_PRICE_JOB_BY_MILEAGE, data);

	console.log(
		'GET ACCOUNT_PRICE_JOB_BY_MILEAGE API RESPONSE.........',
		response
	);

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
	return response;
}

export async function accountPriceJobHVS(data) {
	const response = await handlePostReq(ACCOUNT_PRICE_JOB_HVS, data);

	console.log('GET ACCOUNT_PRICE_JOB_HVS API RESPONSE.........', response);

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
	return response;
}

export async function accountPostOrUnpostJobs(postJob, id) {
	const response = await handlePostReq(ACCOUNT_POST_OR_UNPOST_JOBS(postJob), [
		id,
	]);

	console.log(
		'GET ACCOUNT_POST_OR_UNPOST_JOBS API RESPONSE.........',
		response
	);

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
	return response;
}

export async function accountGetChargeableJobs(accNo, from, to) {
	const response = await handlePostReq(
		ACCOUNT_GET_CHARGEABLE_JOBS(accNo, from, to)
	);

	console.log(
		'GET ACCOUNT_GET_CHARGEABLE_JOBS API RESPONSE.........',
		response
	);

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
	return response;
}

export async function accountUpdateChargesData(data) {
	const response = await handlePostReq(ACCOUNT_UPDATE_CHARGES_DATA, data);

	console.log(
		'GET ACCOUNT_UPDATE_CHARGES_DATA API RESPONSE.........',
		response
	);

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
	return response;
}

export async function accountCreateInvoice(emailInvoices, data) {
	const response = await handlePostReq(
		ACCOUNT_CREATE_INVOICE(emailInvoices),
		data
	);

	console.log('GET ACCOUNT_CREATE_INVOICE API RESPONSE.........', response);

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
	return response;
}

export async function markInvoiceAsPaid(invoiceNo) {
	const response = await handleGetReq(MARK_INVOICE_AS_PAID(invoiceNo));

	console.log('GET MARK_INVOICE_AS_PAID API RESPONSE.........', response);

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
	return response;
}

export async function deleteInvoice(invoiceNo) {
	const response = await handleGetReq(DELETE_INVOICE(invoiceNo));

	console.log('GET DELETE_INVOICE API RESPONSE.........', response);

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
	return response;
}

export async function clearInvoice(invoiceNo) {
	const response = await handleGetReq(CLEAR_INVOICE(invoiceNo));

	console.log('GET CLEAR_INVOICE API RESPONSE.........', response);

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
	return response;
}

export async function getInvoices(from, to, userId) {
	const response = await handlePostReq(GET_INVOICES(from, to, userId));

	console.log('GET GET_INVOICES API RESPONSE.........', response);

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
	return response;
}
