import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpModule } from '@nestjs/axios'
import { UserProfileController } from './userProfile/UserProfile.controller'
import { UserProfileService } from './userProfile/UserProfile.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './typeorm/entities/User'

@Module({
  imports: [HttpModule,
  TypeOrmModule.forRoot({
    type: '',
    host: '',
    port: ,
    username: '',
    password: '',
    database: '',
    entities: [User],
    synchronize: true
  })
  ],
  controllers: [AppController, UserProfileController],
  providers: [AppService, UserProfileService],
})
export class AppModule {
}
