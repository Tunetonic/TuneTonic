import { UserService } from './../user/user.service'
import { SpotifyController } from './spotify.controller'
import { SpotifyService } from './spotify.service'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { User } from 'src/user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [SpotifyService, UserService],
  controllers: [SpotifyController],
})
export class SpotifyModule {}
