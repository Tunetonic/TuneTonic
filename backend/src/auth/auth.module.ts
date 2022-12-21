import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { SpotifyModule } from 'src/spotify/spotify.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SpotifyModule),
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
