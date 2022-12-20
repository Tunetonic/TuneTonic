import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers, Param } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  getSpotifyUser(
    @Headers('Authorization') token: string,
  ): Promise<SpotifyUser> {
    return this.spotifyService.getUserFromSpotify(token)
  }

  @Get('/playlists')
  async getPlaylists(
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getUserPlaylists(token)
  }

  @Get('/playlist/:id')
  async getPlaylist(
    @Param('id') id: string,
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist> {
    return await this.spotifyService.getPlaylist(id, token)
  }

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }
}
