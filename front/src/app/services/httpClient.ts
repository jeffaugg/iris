import axios from 'axios';

import { localStorageKeys } from '../config/localStorageKeys';
import { sleep } from '../utils/sleep';

export const httpClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
});

httpClient.interceptors.request.use(async (config) => {
	const acessToken = localStorage.getItem(localStorageKeys.ACCESSTOKEN);

	console.log('Requesição para API:', {
		baseURL: httpClient.defaults.baseURL,
		envBaseURL: import.meta.env.VITE_API_URL,
		url: config.url,
		method: config.method,
		data: config.data,
		headers: config.headers,
	});

	if (acessToken) {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${acessToken}`;
	}
	return config;
});

httpClient.interceptors.response.use(
	async (response) => {
		await sleep(300);
		return response;
	},
	async (error) => {
		if (error.response && error.response.status === 409) {
			window.location.href = '/conflict';
		}
		return Promise.reject(error);
	},
);
