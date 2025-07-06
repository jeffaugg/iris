import axios from 'axios';

import { localStorageKeys } from '../config/localStorageKeys';
import { sleep } from '../utils/sleep';

export const httpClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
});

httpClient.interceptors.request.use(async (config) => {
	const acessToken = localStorage.getItem(localStorageKeys.ACCESSTOKEN);

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
