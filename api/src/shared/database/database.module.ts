import { Global, Module } from '@nestjs/common'

import { CLIENTE_REPOSITORY, CORES_REPOSITORY, USUARIO_REPOSITORY } from 'src/common/constants'
import { PrismaService } from './prisma.service'
import { ClienteRepository } from './repositories/cliente.repositories'
import { CoresRepository } from './repositories/cores.repositories'
import { UsuarioRepository } from './repositories/usuarios.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioRepository
    },
    {
      provide: CLIENTE_REPOSITORY,
      useClass: ClienteRepository
    },
    {
      provide: CORES_REPOSITORY,
      useClass: CoresRepository
    }

  ],
  exports: [
    PrismaService,
    USUARIO_REPOSITORY,
    CLIENTE_REPOSITORY,
    CORES_REPOSITORY
  ]
})
export class DatabaseModule {}
