import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { SpotifyService } from 'src/spotify/spotify.service'
import { Role } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { adminJWT } from './dto/admin-jwt'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @Get()
  async getToken(@Headers('Authorization') token): Promise<adminJWT> {
    const user = await this.spotifyService.getUserFromSpotify(token)

    if (!user) {
      throw new NotFoundException()
    }

    const databaseUser = await this.userService.findUserById(user.id)

    console.log(databaseUser)
    console.log(databaseUser.role)
    console.log(Role.Admin)

    if (databaseUser && databaseUser.role && databaseUser.role === Role.Admin) {
      console.log('hoi')
      return this.authService.createToken(databaseUser)
    }

    throw new UnauthorizedException()
  }
}
