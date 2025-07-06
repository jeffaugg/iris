import { httpClient } from '../httpClient';

export interface ICreateClienteParams {
	nome: string;
	cpf: string;
	email: string;
	observacoes?: string;
	corId?: string | null;
}

interface ICreateClienteResponse {
	id: string;
	nome: string;
	cpf: string;
	email: string;
	observacoes?: string;
	corId?: string | null;
	createdAt: string;
	updatedAt: string;
}

export async function createCliente(
	body: ICreateClienteParams,
): Promise<ICreateClienteResponse> {
	const { data } = await httpClient.post<ICreateClienteResponse>(
		'/clientes',
		body,
	);
	return data;
}
