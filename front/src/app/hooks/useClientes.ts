import { useQuery } from '@tanstack/react-query';

import { clienteService } from '../services/clienteService';

interface IUseClientesParams {
	cpf?: string;
	nome?: string;
	order?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}

export function useClientes(params?: IUseClientesParams) {
	const { data, isFetching } = useQuery({
		queryKey: ['clientes', params],
		queryFn: () => clienteService.getAll(params),
		staleTime: 5 * 60 * 1000,
	});

	return {
		clientes: data,
		isLoading: isFetching,
	};
}
