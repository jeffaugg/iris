import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { type IUsuarioRepository } from './interface/usuario.repository.interface'
@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async findByEmail (email: string) {
    return await this.prismaService.usuario.findUnique({
      where: {
        email,
        deletedAt: null
      }
    })
  }

  async findById (id: string) {
    return await this.prismaService.usuario.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
  }
}
