import { type Cores } from '@prisma/client'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { type CreateCoresDto } from '../dto/create-core.dto'

export interface ICoresService {
  create: (createCoreDto: CreateCoresDto) => Promise<Cores>
  findAll: (options: PaginacaoDto) => Promise<{ items: Cores[], total: number }>
  findOne: (id: string) => Promise<Cores | null>
  update: (id: string, updateCoreDto: CreateCoresDto) => Promise<Cores | null>
  remove: (id: string) => Promise<Cores | null>
}
