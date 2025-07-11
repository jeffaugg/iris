import { type Usuario } from '@prisma/client'

export interface IUsuarioRepository {
  findByEmail: (email: string) => Promise<Usuario | null>
  findById: (id: string) => Promise<Usuario | null>

}
