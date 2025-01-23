/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
	LOGIN: `${BASE}/api/UserProfile/Login`,
	REGISTER: `${BASE}/api/UserProfile/Register`,
	GET_USER: (username) =>
		`${BASE}/api/UserProfile/GetUser?username=${username}`,
};
