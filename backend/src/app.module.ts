import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpModule } from '@nestjs/axios'
import { UserProfileController } from './userProfile/UserProfile.controller'
import { UserProfileService } from './userProfile/UserProfile.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './typeorm/entities/User'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'

@Module({
  imports: [HttpModule,
     TypeOrmModule.forFeature([User]),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    entities: [User],
    synchronize: true
  }),
  ],
  controllers: [AppController, UserProfileController, UsersController],
  providers: [AppService, UserProfileService, UsersService],
})
export class AppModule {}
