import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { CoresService } from '../../../app/services/colorService';

const schema = z.object({
	codigo: z
		.string()
		.trim()
		.min(1, { message: 'Código é obrigatório' })
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
			message:
				'Código deve ser uma cor hexadecimal válida (ex: #FF0000 ou #F00)',
		}),
});

export type IColorSubmission = z.infer<typeof schema>;

export function useColorController() {
	const {
		register,
		control,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<IColorSubmission>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending, isError } = useMutation({
		mutationFn: async (body: IColorSubmission) => CoresService.create(body),
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			await mutateAsync(data);
			toast.success('Cor criada com sucesso!');
		} catch {
			toast.error('Erro ao criar cor!');
		}
	});

	return { handleSubmit, register, errors, control, isPending, isError };
}
