/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handleGetReq, handlePostReq, setHeaders } from '../apiRequestHandler';
import { settingsEndpoints } from '../apis';

const {
	GET_COMPANY_CONFIG,
	SET_COMPANY_CONFIG,
	GET_MSG_CONFIG,
	SET_MSG_CONFIG,
	GET_TARIFF_CONFIG,
	SET_TARIFF_CONFIG,
} = settingsEndpoints;

export async function getMsgConfig() {
	const response = await handleGetReq(GET_MSG_CONFIG);

	console.log('GET MSG CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_MSG_CONFIG,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}

export async function setMsgConfig(data) {
	const response = await handlePostReq(SET_MSG_CONFIG, data);

	console.log('SET MSG CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: SET_MSG_CONFIG,
				reqBody: data,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}

export async function getCompanyConfig() {
	const response = await handleGetReq(GET_COMPANY_CONFIG);

	console.log('GET COMPANY CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_COMPANY_CONFIG,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}

export async function setCompanyConfig(data) {
	const response = await handlePostReq(SET_COMPANY_CONFIG, data);

	console.log('SET COMPANY CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: SET_COMPANY_CONFIG,
				reqBody: data,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}

export async function getTariffConfig() {
	const response = await handleGetReq(GET_TARIFF_CONFIG);

	console.log('GET TARIFF CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: GET_TARIFF_CONFIG,
				reqBody: null,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}

export async function setTariffConfig(data) {
	const response = await handlePostReq(SET_TARIFF_CONFIG, data);

	console.log('SET TARIFF CONFIG API RESPONSE.........', response);

	if (response.status === 'success') {
		sendLogs(
			{
				url: SET_TARIFF_CONFIG,
				reqBody: data,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
}
