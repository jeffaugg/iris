import { type Cliente } from '@prisma/client'
import { type CreateClienteDto } from 'src/modules/clientes/dto/create-cliente.dto'
import { type QueryClienteDto } from 'src/modules/clientes/dto/queryCliente.dto'

export type ClienteWithColor = Omit<Cliente, 'corId'> & {
  cor: string | null
}

export interface IPaginatedClientes {
  items: ClienteWithColor[]
  total: number
}

export interface IClienteRepository {
  create: (createClienteDto: CreateClienteDto) => Promise<Cliente>
  findAll: (options: QueryClienteDto) => Promise<IPaginatedClientes>
  findById: (id: string) => Promise<Cliente | null>
}
