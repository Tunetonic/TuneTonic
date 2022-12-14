import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { SpotifyModule } from 'src/spotify/spotify.module'
import { SpotifyService } from 'src/spotify/spotify.service'
import { HttpModule } from '@nestjs/axios'
import * as path from 'path'

@Module({
  imports: [
    UserModule,
    SpotifyModule,
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, SpotifyService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
