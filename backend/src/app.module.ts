import { globalConfig } from './config/global.config'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeormConfig } from './config/typeorm.config'
import { HttpModule } from '@nestjs/axios'
import { UserProfileController } from './userProfile/UserProfile.controller'
import { UserProfileService } from './userProfile/UserProfile.service'

@Module({
  imports: [globalConfig, typeormConfig, UserModule, HttpModule],
  controllers: [AppController, UserProfileController],
  providers: [AppService, UserProfileService],
})
export class AppModule {}
