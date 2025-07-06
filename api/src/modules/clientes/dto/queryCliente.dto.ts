import { IsOptional, IsString } from 'class-validator'
import { PaginacaoDto } from 'src/common/dto/pagination.dto'

export class QueryClienteDto extends PaginacaoDto {
  @IsOptional()
  @IsString()
    cpf?: string

  @IsOptional()
  @IsString()
    order: 'asc' | 'desc' = 'desc'
}
