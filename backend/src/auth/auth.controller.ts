import { Controller, Get, Headers, NotFoundException } from '@nestjs/common'
import { SpotifyService } from '../spotify/spotify.service'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { authInfo } from './dto/auth-info'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @Get()
  async getToken(@Headers('spotifyToken') token): Promise<authInfo> {
    const user = await this.spotifyService.getUserFromSpotify(token)

    if (!user) {
      throw new NotFoundException()
    }

    const databaseUser = await this.userService.findUserById(user.id)

    if (!databaseUser) {
      throw new NotFoundException()
    }

    return this.authService.createToken(databaseUser)
  }
}
