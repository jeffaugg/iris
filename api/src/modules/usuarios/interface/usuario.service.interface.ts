export interface IUsuarioService {
  getUsuariosById: (id: string) => Promise<{
    id: string
    nome: string
    email: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }>
}
