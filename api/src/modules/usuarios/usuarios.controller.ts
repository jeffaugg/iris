import { Controller, Get, Inject, Req } from '@nestjs/common'

import { USUARIO_SERVICE } from 'src/common/constants'
import { activeUserId } from 'src/shared/decorators/activeUserId'
import { IUsuarioService } from './interface/usuario.service.interface'

@Controller('usuarios')
export class UsuariosController {
  constructor (
    @Inject(USUARIO_SERVICE)
    private readonly usuariosService: IUsuarioService) {}

  @Get('me')
  async me (@Req() request: Request, @activeUserId() userId: string) {
    return await this.usuariosService.getUsuariosById(userId)
  }
}
