import { type Cliente } from '@prisma/client'
import { type CreateClienteDto } from '../dto/create-cliente.dto'
import { type QueryClienteDto } from '../dto/queryCliente.dto'

export interface IClienteService {
  create: (createClienteDto: CreateClienteDto) => Promise<Cliente>
  findAll: (options: QueryClienteDto) => Promise<Cliente[]>
  findOne: (id: string) => Promise<Cliente | null>
}
