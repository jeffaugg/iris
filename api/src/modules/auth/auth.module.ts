import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AUTH_SERVICE } from 'src/common/constants'
import { env } from 'src/shared/config/environments'
import { DatabaseModule } from 'src/shared/database/database.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    }
  ]
})
export class AuthModule {}
