export type Cliente = {
	id: string;
	nome: string;
	cpf: string;
	email: string;
	descricao?: string | null;
	cor: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
};
