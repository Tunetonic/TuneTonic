import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers, Param, Delete } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'
import { SpotifyArtists } from './interface/spotify-artists'
import { SpotifyArtist } from './interface/spotify-artist'
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

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('spotifyToken') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }

  @Get('/artists')
  async getArtists(
      @Headers('Authorization') token,
  ): Promise<SpotifyArtists[]> {
    return await this.spotifyService.getFollowedArtists(token)
  }

  @Get('/artist/:id')
  async getArtist(
      @Headers('Authorization') token,
      @Param('id') id: string
  ): Promise<SpotifyArtist> {
    return await this.spotifyService.getArtist(token, id)
  }

  @Delete('/artist/:id')
  async unfollowArtist(
      @Headers('Authorization') token,
      @Param('id') id: string) {
    return await this.spotifyService.unfollowArtist(token, id)
  }

  @Get('/playlist/:id')
  async getArtistPlaylists(
      @Headers('Authorization') token,
      @Param('id') id: string
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getArtistPlaylists(token, id)
  }
}
