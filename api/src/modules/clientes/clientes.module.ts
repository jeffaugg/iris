import { Module } from '@nestjs/common'
import { CLIENTE_SERVICE } from 'src/common/constants'
import { ClientesController } from './clientes.controller'
import { ClientesService } from './clientes.service'

@Module({
  controllers: [ClientesController],
  providers: [
    {
      provide: CLIENTE_SERVICE,
      useClass: ClientesService
    }
  ]
})
export class ClientesModule {}
