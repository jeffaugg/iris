import { Body, Controller, Inject, Post } from '@nestjs/common'
import { AUTH_SERVICE } from 'src/common/constants'
import { AuthDto } from './dto/auth.dto'
import { IAuthService } from './interface/auth-service.interface'

@Controller('auth')
export class AuthController {
  constructor (
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService
  ) {}

  @Post('login')
  async create (@Body() createAuthDto: AuthDto) {
    return await this.authService.authenticate(createAuthDto)
  }
}
