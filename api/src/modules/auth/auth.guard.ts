import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { type Request } from 'express'
import { type JwtPayload } from 'src/shared/database/types'
import { IS_PUBLIC_KEY } from 'src/shared/decorators/isPublic'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getClass(), context.getHandler()]
    )

    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Token não encontrado')
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token)
      request.userId = payload.userId
    } catch {
      throw new UnauthorizedException('Token inválido')
    }

    return true
  }

  private extractTokenFromHeader (request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1]
  }
}
