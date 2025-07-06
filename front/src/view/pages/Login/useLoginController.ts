import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';
import type { ISigninParams } from '../../../app/services/authService/signin';

const schema = z.object({
	email: z
		.string()
		.nonempty('E-mail é obrigatório')
		.email('Informe um e-mail válido'),
	senha: z
		.string()
		.nonempty('Senha é obrigatória')
		.min(8, 'Senha deve conter pelo menos 8 dígitoss'),
});

type ILoginSubmission = z.infer<typeof schema>;

export function useLoginController() {
	const {
		register,
		control,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<ILoginSubmission>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending, isError } = useMutation({
		mutationFn: async (body: ISigninParams) => authService.signin(body),
	});

	const { signin } = useAuth();

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const { token } = await mutateAsync(data);
			signin(token);
		} catch {
			toast.error('Credenciais inválidas!');
		}
	});

	return { handleSubmit, register, errors, control, isPending, isError };
}
