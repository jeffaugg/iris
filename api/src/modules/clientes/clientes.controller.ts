import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'
import { CLIENTE_SERVICE } from 'src/common/constants'
import { PaginacaoDto } from 'src/common/dto/pagination.dto'
import { IsPaginated } from 'src/shared/decorators/Ispaginated'
import { isPublic } from 'src/shared/decorators/isPublic'
import { Zod } from 'src/shared/decorators/zod'
import { CreateClienteDto, CreateClienteSchema } from './dto/create-cliente.dto'
import { IClienteService } from './interface/clientes.service.interface'

@Controller('clientes')
export class ClientesController {
  constructor (
    @Inject(CLIENTE_SERVICE)
    private readonly clientesService: IClienteService) {}

  @Post()
  @isPublic()
  @Zod(CreateClienteSchema)
  async create (@Body() createClienteDto: CreateClienteDto) {
    return await this.clientesService.create(createClienteDto)
  }

  @Get()
  @IsPaginated()
  async findAll (@Query() paginacaoDto: PaginacaoDto) {
    return await this.clientesService.findAll(paginacaoDto)
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.clientesService.findOne(id)
  }
}
