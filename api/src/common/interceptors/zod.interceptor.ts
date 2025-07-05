// src/shared/interceptors/zod.interceptor.ts
import {
  BadRequestException,
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { type Observable } from 'rxjs'
import { ZOD_SCHEMA } from 'src/shared/decorators/zod'
import type { ZodSchema } from 'zod'

@Injectable()
export class ZodInterceptor implements NestInterceptor {
  constructor (private readonly reflector: Reflector) {}

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const schema = this.reflector.get<ZodSchema>(
      ZOD_SCHEMA,
      context.getHandler()
    )
    if (!schema) return next.handle()

    const req = context.switchToHttp().getRequest()
    try {
      req.body = schema.parse(req.body)
    } catch (err: any) {
      throw new BadRequestException(err.errors)
    }

    return next.handle()
  }
}
