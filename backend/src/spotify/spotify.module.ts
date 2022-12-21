import { UserService } from './../user/user.service'
import { SpotifyController } from './spotify.controller'
import { SpotifyService } from './spotify.service'
import { forwardRef, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { User } from 'src/user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    forwardRef(() => UserModule),
  ],
  providers: [SpotifyService],
  exports: [SpotifyService],
  controllers: [SpotifyController],
})
export class SpotifyModule {}
