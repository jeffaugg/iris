import { Button, Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

import { useLoginController } from './useLoginController';

export function Login() {
	const { handleSubmit, control, errors, isPending, isError } =
		useLoginController();

	return (
		<>
			<header className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
					Entre em sua conta
				</h1>
			</header>

			{isError && (
				<p className="mt-4 text-red-500">
					Erro ao fazer login. Verifique suas credenciais e tente novamente.
				</p>
			)}
			<Form
				className="mt-8 flex flex-col gap-4"
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Form.Item
					label="E-mail"
					validateStatus={errors.email ? 'error' : ''}
					help={errors.email?.message}
				>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input type="email" placeholder="Email" {...field} size="large" />
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Senha"
					validateStatus={errors.senha ? 'error' : ''}
					help={errors.senha?.message}
				>
					<Controller
						name="senha"
						control={control}
						render={({ field }) => (
							<Input.Password placeholder="Senha" {...field} size="large" />
						)}
					/>
				</Form.Item>

				<Button
					className="mt-2 h-[52px]"
					color="blue"
					size="large"
					variant="solid"
					disabled={isPending}
					htmlType="submit"
					loading={isPending}
					type="primary"
				>
					Entrar
				</Button>
			</Form>
		</>
	);
}
