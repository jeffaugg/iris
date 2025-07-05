import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { PaginateInterceptor } from './common/interceptors/pagination.interceptor'
import { ZodInterceptor } from './common/interceptors/zod.interceptor'
async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalInterceptors(new PaginateInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new ZodInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  await app.listen(process.env.PORT ?? 3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
