import {
  createParamDecorator,
  type ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { type Request } from 'express'

export const activeUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest()

    if (!request.userId) {
      throw new UnauthorizedException('Usuário não autenticado')
    }

    return request.userId
  }
)
