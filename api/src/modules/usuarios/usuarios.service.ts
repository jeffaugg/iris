import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { USUARIO_REPOSITORY } from 'src/common/constants'
import { IUsuarioRepository } from 'src/shared/database/repositories/interface/usuario.repository.interface'

@Injectable()
export class UsuariosService {
  constructor (
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepo: IUsuarioRepository
  ) {}

  async getUsuariosById (id: string) {
    const usuario = await this.usuarioRepo.findById(id)

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
      deletedAt: usuario.deletedAt
    }
  }
}
