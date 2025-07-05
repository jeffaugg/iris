import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CORES_SERVICE } from 'src/common/constants'
import { PaginacaoDto } from 'src/common/dto/pagination.dto'
import { IsPaginated } from 'src/shared/decorators/Ispaginated'
import { Zod } from 'src/shared/decorators/zod'
import { CreateCoresDto, CreateCoresSchema } from './dto/create-core.dto'
import { ICoresService } from './interface/cores.service.interface'

@Controller('cores')
export class CoresController {
  constructor (
    @Inject(CORES_SERVICE)
    private readonly coresService: ICoresService) {}

  @Post()
  @Zod(CreateCoresSchema)
  async create (@Body() createCoreDto: CreateCoresDto) {
    return await this.coresService.create(createCoreDto)
  }

  @Get()
  @IsPaginated()
  async findAll (@Query() paginacaoDto: PaginacaoDto) {
    return await this.coresService.findAll(paginacaoDto)
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.coresService.findOne(id)
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateCoreDto: CreateCoresDto) {
    return await this.coresService.update(id, updateCoreDto)
  }

  @Delete(':id')
  async remove (@Param('id') id: string) {
    return await this.coresService.remove(id)
  }
}
