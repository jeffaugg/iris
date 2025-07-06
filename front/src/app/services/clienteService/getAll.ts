import type { Cliente } from '../../entities/Clientes';
import { httpClient } from '../httpClient';

export interface IListClienteQueryParams {
	nome?: string;
	cpf?: string;
	order?: 'asc' | 'desc';
	limit?: number;
	page?: number;
}

interface IPaginationMeta {
	totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}

interface IGetAllClientesResponse {
	data: Cliente[];
	meta: IPaginationMeta;
}

export async function getAll(
	params?: IListClienteQueryParams,
): Promise<IGetAllClientesResponse> {
	const { data } = await httpClient.get<IGetAllClientesResponse>('/clientes', {
		params,
	});
	return data;
}
