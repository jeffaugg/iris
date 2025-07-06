import { httpClient } from '../httpClient';

type ColoresResponse = {
	id: string;
	codigo: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

export async function create(
	data: Omit<ColoresResponse, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
) {
	const response = await httpClient.post<ColoresResponse>('/cores', data);

	return {
		response,
	};
}
