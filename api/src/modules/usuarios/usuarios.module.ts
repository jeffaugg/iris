import { Module } from '@nestjs/common'
import { USUARIO_SERVICE } from 'src/common/constants'
import { UsuariosController } from './usuarios.controller'
import { UsuariosService } from './usuarios.service'

@Module({
  controllers: [UsuariosController],
  providers: [
    {
      provide: USUARIO_SERVICE,
      useClass: UsuariosService
    }
  ]
})
export class UsuariosModule {}
