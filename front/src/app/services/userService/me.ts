import { httpClient } from '../httpClient';

interface IMeResponse {
	id: string;
	nome: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export async function me() {
	const { data } = await httpClient.get<IMeResponse>('/usuarios/me');

	return data;
}
