import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './modules/auth/auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import { ClientesModule } from './modules/clientes/clientes.module'
import { CoresModule } from './modules/cores/cores.module'
import { UsuariosModule } from './modules/usuarios/usuarios.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ClientesModule,
    CoresModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
