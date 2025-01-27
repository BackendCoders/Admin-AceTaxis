/** @format */

import { sendLogs } from '../../utils/getLogs';
import { handlePostReq, setHeaders } from '../apiRequestHandler';
import { LocalPoiEndpoints } from '../apis';

const {
	GET_LOCAL_POI,
	GET_LOCAL_POI2,
	CREATE_LOCAL_POI,
	UPLOAD_LOCAL_POI,
	UPDATE_LOCAL_POI,
	DELETE_LOCAL_POI,
} = LocalPoiEndpoints;

export async function getPoi(searchTerm) {
	const response = await handlePostReq(GET_LOCAL_POI, searchTerm);
	console.log('get local poi response ---', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: GET_LOCAL_POI,
				reqBody: searchTerm,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}

export async function getPoi2(searchTerm) {
	const response = await handlePostReq(GET_LOCAL_POI2, searchTerm);
	console.log('get local poi2 response ---', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: GET_LOCAL_POI2,
				reqBody: searchTerm,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}

export async function createPoi(data) {
	const response = await handlePostReq(CREATE_LOCAL_POI, data);
	console.log('create local poi response ---', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: CREATE_LOCAL_POI,
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

export async function updatePoi(data) {
	const response = await handlePostReq(UPDATE_LOCAL_POI, data);
	console.log('update local poi response ---', response);

	if (response.status === 200) {
		sendLogs(
			{
				url: UPDATE_LOCAL_POI,
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

export async function uploadPoi(file) {
	const response = await handlePostReq(UPLOAD_LOCAL_POI, file);
	console.log('upload local poi response ---', response);
	if (response.status === 200) {
		sendLogs(
			{
				url: UPLOAD_LOCAL_POI,
				reqBody: file,
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return null;
}

export async function deletePoi(id) {
	const response = await handlePostReq(DELETE_LOCAL_POI, { id });
	console.log('delete local poi response ---', response);
	if (response.status === 200) {
		sendLogs(
			{
				url: DELETE_LOCAL_POI,
				reqBody: { id },
				headers: setHeaders(),
				response: response,
			},
			'info'
		);
		return response;
	}
	return false;
}
