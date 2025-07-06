import { Injectable } from '@nestjs/common'

import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateCoresDto } from 'src/modules/cores/dto/create-core.dto'
import { PrismaService } from '../prisma.service'
import { type ICoresRepository } from './interface/cores.repositories.interface'

@Injectable()
export class CoresRepository implements ICoresRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async create (data: CreateCoresDto) {
    return await this.prismaService.cores.create({
      data
    })
  }

  async findAll ({ page, limit }: PaginacaoDto) {
    const where = { deletedAt: null }

    const [total, items] = await this.prismaService.$transaction([
      this.prismaService.cores.count({ where }),
      this.prismaService.cores.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: page ? (page - 1) * limit : 0,
        take: limit
      })
    ])

    return { items, total }
  }

  async findById (id: string) {
    return await this.prismaService.cores.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
  }

  async update (id: string, data: CreateCoresDto) {
    return await this.prismaService.cores.update({
      where: { id },
      data
    })
  }

  async remove (id: string) {
    return await this.prismaService.cores.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }
}
