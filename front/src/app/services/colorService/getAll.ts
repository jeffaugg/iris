import type { Cores } from '../../entities/Cores';
import { httpClient } from '../httpClient';

type ColoresResponse = {
	data: Cores[];
	meta: {
		totalItems: number;
		itemCount: number;
		itemsPerPage: number;
		totalPages: number;
		currentPage: number;
	};
};

export async function getAll() {
	const response = await httpClient.get<ColoresResponse>('/cores');

	return {
		data: response.data.data,
		meta: response.data.meta,
	};
}
