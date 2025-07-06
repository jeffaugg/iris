import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import type React from 'react';
import { Controller } from 'react-hook-form';

import { useCores } from '../../../app/hooks/useCores';
import formIllustration2 from '../../../assets/formIllustration2.jpg';

import { useFormController } from './useFormController';

export function FormPage() {
	const { handleSubmit, control, errors, isPending, isError } =
		useFormController();
	const { cores } = useCores();

	return (
		<div className="flex w-full h-full bg-gray-50">
			<div className="w-2/5 h-full justify-center items-center p-8 relative hidden lg:flex bg-white">
				<div className=" w-full px-8">
					<img src={formIllustration2} alt="" />
				</div>
			</div>
			<div className="w-full h-full flex items-center justify-center flex-col">
				<div className="flex items-center justify-end w-full p-4">
					<Button
						type="primary"
						onClick={() => {
							window.location.href = '/login';
						}}
					>
						Login
					</Button>
				</div>

				<div className="w-full h-full flex items-center justify-center flex-col gap-2 lg:w-3/5 ">
					<Title level={2}>Preencha o formulário abaixo</Title>
					{isError && (
						<p className="mt-4 text-red-500">
							Erro ao fazer login. Verifique suas credenciais e tente novamente.
						</p>
					)}

					<Form
						className=" flex flex-col w-2/3 gap-3"
						layout="vertical"
						onFinish={handleSubmit}
					>
						<Form.Item
							label="Nome"
							className="w-full !mb-0"
							validateStatus={errors.nome ? 'error' : ''}
							help={errors.nome?.message}
						>
							<Controller
								name="nome"
								control={control}
								render={({ field }) => (
									<Input size="large" className="w-full" {...field} />
								)}
							/>
						</Form.Item>
						<Form.Item
							label="CPF"
							className="w-full !mb-0"
							validateStatus={errors.cpf ? 'error' : ''}
							help={errors.cpf?.message}
						>
							<Controller
								name="cpf"
								control={control}
								render={({ field }) => (
									<Input
										size="large"
										className="w-full"
										type="text"
										{...field}
									/>
								)}
							/>
						</Form.Item>
						<Form.Item
							label="Email"
							className="w-full !mb-0"
							validateStatus={errors.email ? 'error' : ''}
							help={errors.email?.message}
						>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										size="large"
										className="w-full"
										type="email"
										{...field}
									/>
								)}
							/>
						</Form.Item>
						<Form.Item
							label="Cor"
							className="w-full !mb-0"
							validateStatus={errors.corId ? 'error' : ''}
							help={errors.corId?.message}
						>
							<Controller
								name="corId"
								control={control}
								render={({ field }) => (
									<Select
										className="w-full"
										size="large"
										placeholder="Selecione uma cor"
										{...field}
									>
										{cores.data?.map((core) => (
											<Select.Option
												key={core.id}
												value={core.id}
												style={{
													backgroundColor: core.codigo,
													margin: `2px 0 2px 0`,
												}}
												onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
													e.currentTarget.style.opacity = `0.7`;
												}}
												onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
													e.currentTarget.style.opacity = `1`;
												}}
											>
												<div className="flex items-center gap-2">
													<div
														style={{
															height: `12px`,
															width: `12px`,
															backgroundColor: core.codigo,
														}}
													/>
													<span
														style={{
															color: core.codigo,
														}}
														className="flex justify-center items-center"
													>
														{core.codigo}
													</span>
												</div>
											</Select.Option>
										))}
									</Select>
								)}
							/>
						</Form.Item>
						<Form.Item
							label="Descrição"
							className="w-full !mb-0"
							validateStatus={errors.observacoes ? 'error' : ''}
							help={errors.observacoes?.message}
						>
							<Controller
								name="observacoes"
								control={control}
								render={({ field }) => (
									<TextArea
										rows={4}
										className="w-full"
										placeholder="Escreva suas observações aqui..."
										{...field}
									/>
								)}
							/>
						</Form.Item>

						<Button
							className="!mt-2"
							type="primary"
							htmlType="submit"
							color="blue"
							disabled={isPending}
							size="large"
							loading={isPending}
							variant="solid"
						>
							Enviar
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
