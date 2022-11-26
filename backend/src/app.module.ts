import { globalConfig } from './config/global.config'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeormConfig } from './config/typeorm.config'

@Module({
  imports: [globalConfig, typeormConfig, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
