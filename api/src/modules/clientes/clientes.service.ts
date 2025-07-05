import { Injectable } from '@nestjs/common'
import { type CreateClienteDto } from './dto/create-cliente.dto'

@Injectable()
export class ClientesService {
  create (createClienteDto: CreateClienteDto) {
    return 'This action adds a new cliente'
  }

  findAll () {
    return 'This action returns all clientes'
  }

  findOne (id: number) {
    return `This action returns a #${id} cliente`
  }

  remove (id: number) {
    return `This action removes a #${id} cliente`
  }
}
