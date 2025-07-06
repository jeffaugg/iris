import { useQuery } from '@tanstack/react-query';

import { CoresService } from '../services/colorService';

export function useColors() {
	const { data, isFetching } = useQuery({
		queryKey: ['colors'],
		queryFn: CoresService.getAll,
		staleTime: Infinity,
	});

	return {
		colors: data,
		isLoading: isFetching,
	};
}
