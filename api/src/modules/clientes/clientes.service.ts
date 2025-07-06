import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CLIENTE_REPOSITORY } from 'src/common/constants'
import { IClienteRepository } from 'src/shared/database/repositories/interface/cliente.repository.interface'
import { catchError } from 'src/shared/error/catch-errors'
import { type CreateClienteDto } from './dto/create-cliente.dto'
import { type QueryClienteDto } from './dto/queryCliente.dto'

@Injectable()
export class ClientesService {
  constructor (
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository
  ) {}

  async create (createClienteDto: CreateClienteDto) {
    const [error, cliente] = await catchError(
      this.clienteRepository.create(createClienteDto)
    )

    if (error) throw new ConflictException('Usuário já cadastrado')

    return cliente
  }

  async findAll (options: QueryClienteDto) {
    return await this.clienteRepository.findAll(options)
  }

  async findOne (id: string) {
    return await this.clienteRepository.findById(id)
  }
}
