import { Module } from '@nestjs/common'
import { CORES_SERVICE } from 'src/common/constants'
import { CoresController } from './cores.controller'
import { CoresService } from './cores.service'

@Module({
  controllers: [CoresController],
  providers: [{
    provide: CORES_SERVICE,
    useClass: CoresService
  }]
})
export class CoresModule {}
