import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { SpotifyService } from 'src/spotify/spotify.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [UserService, SpotifyService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
