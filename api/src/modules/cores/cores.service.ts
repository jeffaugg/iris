import { Inject, Injectable } from '@nestjs/common'
import { CORES_REPOSITORY } from 'src/common/constants'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { ICoresRepository } from 'src/shared/database/repositories/interface/cores.repositories.interface'
import { type CreateCoresDto } from './dto/create-core.dto'
import { type ICoresService } from './interface/cores.service.interface'

@Injectable()
export class CoresService implements ICoresService {
  constructor (
    @Inject(CORES_REPOSITORY)
    private readonly coresRepository: ICoresRepository) {}

  async create (createCoreDto: CreateCoresDto) {
    return await this.coresRepository.create(createCoreDto)
  }

  async findAll (options: PaginacaoDto) {
    console.log('Finding all cores with options:', options)
    return await this.coresRepository.findAll(options)
  }

  async findOne (id: string) {
    return await this.coresRepository.findById(id)
  }

  async update (id: string, updateCoreDto: CreateCoresDto) {
    return await this.coresRepository.update(id, updateCoreDto)
  }

  async remove (id: string) {
    return await this.coresRepository.remove(id)
  }
}
