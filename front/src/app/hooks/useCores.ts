import { useQuery } from '@tanstack/react-query';

import { CoresService } from '../services/colorService';

export function useCores() {
	const { data, isFetching } = useQuery({
		queryKey: ['cores'],
		queryFn: CoresService.getAll,
		staleTime: Infinity,
	});

	return {
		cores: {
			data: data?.data,
			meta: data?.meta,
		},
		isLoading: isFetching,
	};
}
