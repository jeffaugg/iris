import { type Cliente } from '@prisma/client'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateClienteDto } from '../dto/create-cliente.dto'

export interface IClienteService {
  create: (createClienteDto: CreateClienteDto) => Promise<Cliente>
  findAll: (options: PaginacaoDto) => Promise<Cliente[]>
  findOne: (id: string) => Promise<Cliente | null>
}
