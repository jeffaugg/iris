import { Button } from 'antd';
import Title from 'antd/es/typography/Title';

export function ConflictPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			<Title
				level={1}
				className="!text-red-600 whitespace-pre-line text-center mb-4"
			>
				{`Oops! Parece que esses dados já foram cadastrados
no sistema anteriormente.`}
			</Title>

			<div className="text-center max-w-md mx-4 mb-6">
				<p className="text-base text-gray-600">
					Para evitar duplicatas, não foi possível completar o cadastro.
					Verifique se as informações já existem ou tente com dados diferentes.
				</p>
			</div>

			<img
				src="https://httpcats.com/409.jpg"
				alt="Gato representando erro 409 - Conflito"
				className="mb-6 max-w-xs mx-auto rounded-lg shadow-lg"
				onError={(e) => {
					e.currentTarget.style.display = 'none';
				}}
			/>

			<Button
				type="primary"
				href="/"
				size="large"
				className="bg-blue-600 hover:bg-blue-700"
			>
				Voltar ao Formulário
			</Button>
		</div>
	);
}
