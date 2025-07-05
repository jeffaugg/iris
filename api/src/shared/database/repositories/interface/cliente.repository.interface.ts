import { type Cliente } from '@prisma/client'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateClienteDto } from 'src/modules/clientes/dto/create-cliente.dto'

export interface IClienteRepository {
  create: (data: CreateClienteDto) => Promise<Cliente>
  findAll: (pagination: PaginacaoDto) => Promise<{ items: Cliente[], total: number }>
  findById: (id: string) => Promise<Cliente | null>
}
