import { httpClient } from '../httpClient';

export interface ISigninParams {
	email: string;
	senha: string;
}

interface ISigninResponse {
	token: string;
}

export async function signin(body: ISigninParams) {
	const { data } = await httpClient.post<ISigninResponse>('/auth/login', body);

	return data;
}
