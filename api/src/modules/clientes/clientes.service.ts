import { Inject, Injectable } from '@nestjs/common'
import { CLIENTE_REPOSITORY } from 'src/common/constants'
import { type PaginacaoDto } from 'src/common/dto/pagination.dto'
import { IClienteRepository } from 'src/shared/database/repositories/interface/cliente.repository.interface'
import { type CreateClienteDto } from './dto/create-cliente.dto'

@Injectable()
export class ClientesService {
  constructor (
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository
  ) {}

  async create (createClienteDto: CreateClienteDto) {
    return await this.clienteRepository.create(createClienteDto)
  }

  async findAll (options: PaginacaoDto) {
    return await this.clienteRepository.findAll(options)
  }

  async findOne (id: string) {
    return await this.clienteRepository.findById(id)
  }
}
