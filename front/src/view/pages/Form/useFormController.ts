import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

import { clienteService } from '../../../app/services/clienteService';
import type { ICreateClienteParams } from '../../../app/services/clienteService/create';
import { isValidCPF } from '../../../app/utils/cpfValidate';

export const schema = z.object({
	nome: z
		.string()
		.trim()
		.min(1, { message: 'Nome é obrigatório' })
		.max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),

	cpf: z.string().refine((val) => isValidCPF(val), { message: 'CPF inválido' }),

	email: z
		.string()
		.email({ message: 'Email inválido' })
		.transform((val) => val.toLowerCase()),

	observacoes: z
		.string()
		.trim()
		.max(500, { message: 'Observações devem ter no máximo 500 caracteres' })
		.optional(),

	corId: z
		.string()
		.uuid({ message: 'corId deve ser um UUID válido' })
		.nullable()
		.optional(),
});

type IFormSubmission = z.infer<typeof schema>;

export function useFormController() {
	const {
		formState: { errors },
		handleSubmit: hookFormHandleSubmit,
		control,
	} = useForm<IFormSubmission>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending, isError } = useMutation({
		mutationFn: async (body: ICreateClienteParams) =>
			clienteService.createCliente(body),
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			await mutateAsync(data);
			toast.success('Cliente criado com sucesso!');
		} catch (error) {
			toast.error('Erro ao criar cliente. Tente novamente.');
		}
	});
	return { errors, handleSubmit, control, isPending, isError };
}
