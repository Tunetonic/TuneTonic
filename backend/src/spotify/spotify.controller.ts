import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers, UseGuards } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'
import { Role } from '../enums/role.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  getSpotifyUser(@Headers('spotifyToken') token: string): Promise<SpotifyUser> {
    return this.spotifyService.getUserFromSpotify(token)
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/users')
  getSpotifyUsers(
    @Headers('spotifyToken') token: string,
  ): Promise<SpotifyUser[]> {
    return this.spotifyService.getUsersFromSpotify(token)
  }

  @Get('/playlist')
  async getPlaylists(
    @Headers('spotifyToken') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getUserPlaylists(token)
  }

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('spotifyToken') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }
}
