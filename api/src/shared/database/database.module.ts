import { Global, Module } from '@nestjs/common'

import { USUARIO_REPOSITORY } from 'src/common/constants'
import { PrismaService } from './prisma.service'
import { UsuarioRepository } from './repositories/usuarios.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioRepository
    }

  ],
  exports: [
    PrismaService,
    USUARIO_REPOSITORY
  ]
})
export class DatabaseModule {}
