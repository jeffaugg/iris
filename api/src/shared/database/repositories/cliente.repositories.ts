import { Injectable } from '@nestjs/common'

import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateClienteDto } from 'src/modules/clientes/dto/create-cliente.dto'
import { PrismaService } from '../prisma.service'
import { type IClienteRepository } from './interface/cliente.repository.interface'

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async create (data: CreateClienteDto) {
    return await this.prismaService.cliente.create({
      data
    })
  }

  async findAll ({ skip, limit }: PaginacaoDto) {
    const where = { deletedAt: null }

    const [total, items] = await this.prismaService.$transaction([
      this.prismaService.cliente.count({ where }),
      this.prismaService.cliente.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      })
    ])

    return { items, total }
  }

  async findById (id: string) {
    return await this.prismaService.cliente.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
  }
}
