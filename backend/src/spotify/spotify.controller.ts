import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers, UseGuards, Param } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'
import { SpotifySong } from './interface/spotify-song'
import { Role } from '../enums/role.enum'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'

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

  @Get('/playlist/:id')
  async getPlaylistSongs(
    @Headers('spotifyToken') token,
    @Param('id') id: string,
  ): Promise<SpotifySong[]> {
    return await this.spotifyService.getPlaylistSongs(token, id)
  }

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('spotifyToken') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }
}
