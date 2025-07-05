import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { PaginateInterceptor } from './common/interceptors/pagination.interceptor'
async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new PaginateInterceptor(app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
