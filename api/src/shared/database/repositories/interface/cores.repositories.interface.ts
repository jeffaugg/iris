import { type Cores } from '@prisma/client'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateCoresDto } from 'src/modules/cores/dto/create-core.dto'

export interface ICoresRepository {
  create: (data: CreateCoresDto) => Promise<Cores>
  findAll: (pagination: PaginacaoDto) => Promise<{ items: Cores[], total: number }>
  findById: (id: string) => Promise<Cores | null>
  update: (id: string, data: CreateCoresDto) => Promise<Cores>
  remove: (id: string) => Promise<Cores>
}
