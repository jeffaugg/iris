import { Injectable } from '@nestjs/common'

import { type CreateClienteDto } from 'src/modules/clientes/dto/create-cliente.dto'
import { type QueryClienteDto } from 'src/modules/clientes/dto/queryCliente.dto'
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

  async findAll ({ skip, limit, cpf, order }: QueryClienteDto) {
    const where = {
      deletedAt: null,
      cpf: cpf ?? undefined
    }

    const [total, items] = await this.prismaService.$transaction([
      this.prismaService.cliente.count({ where }),
      this.prismaService.cliente.findMany({
        where,
        orderBy: { createdAt: order },
        skip,
        take: limit,
        include: {
          cor: true
        }
      })
    ])

    const transformedItems = items.map(item => ({
      ...item,
      cor: item.cor?.codigo ?? null,
      corId: undefined
    }))

    return { items: transformedItems, total }
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
