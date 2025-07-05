import {
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { USUARIO_REPOSITORY } from 'src/common/constants'
import { UsuarioRepository } from 'src/shared/database/repositories/usuarios.repositories'
import { type JwtPayload } from 'src/shared/database/types'
import { type AuthDto } from './dto/auth.dto'
import { type IAuthService } from './interface/auth-service.interface'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepo: UsuarioRepository,
    private readonly jwtService: JwtService
  ) {}

  async authenticate (authDto: AuthDto) {
    const usuario = await this.validateUsuario(authDto.email, authDto.senha)
    const token = await this.generateToken(usuario.id)
    return { token }
  }

  private async generateToken (userId: string) {
    const payload: JwtPayload = { userId }
    return await this.jwtService.signAsync(payload)
  }

  private async validateUsuario (email: string, senha: string) {
    const usuario = await this.usuarioRepo.findByEmail(email)

    if (!usuario) throw new UnauthorizedException('Credenciais inválidas')

    if (usuario.deletedAt) { throw new UnauthorizedException('Credenciais inválidas') }

    const ok = await compare(senha, usuario.senha)
    if (!ok) throw new UnauthorizedException('Credenciais inválidas')

    return usuario
  }
}
