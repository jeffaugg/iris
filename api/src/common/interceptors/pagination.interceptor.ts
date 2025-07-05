import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common'
import { type Reflector } from '@nestjs/core'
import { type Request } from 'express'
import { type Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PAGINATE_KEY } from 'src/shared/decorators/Ispaginated'

interface PaginateResult<T> {
  items: T[]
  total: number
}

export class PaginateInterceptor implements NestInterceptor {
  constructor (private readonly reflector: Reflector) {}
  intercept (
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const paginateEnabled = this.reflector.getAllAndOverride<boolean>(
      PAGINATE_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!paginateEnabled) {
      return next.handle()
    }

    return next.handle().pipe(
      map((result: PaginateResult<any>) => {
        const { items, total } = result

        const req: Request = context.switchToHttp().getRequest()

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const meta = {
          totalItems: total,
          itemCount: items.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(total / limit),
          currentPage: page
        }

        return { data: items, meta }
      })
    )
  }
}
