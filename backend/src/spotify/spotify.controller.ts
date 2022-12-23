import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers, Param } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'
import { SpotifySong } from './interface/spotify-song'

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  getSpotifyUser(
    @Headers('Authorization') token: string,
  ): Promise<SpotifyUser> {
    return this.spotifyService.getUserFromSpotify(token)
  }

  @Get('/playlist')
  async getPlaylists(
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getUserPlaylists(token)
  }

  @Get('/playlist/:id')
  async getPlaylistSongs(
    @Headers('Authorization') token,
    @Param('id') id: string,
  ): Promise<SpotifySong[]> {
    return await this.spotifyService.getPlaylistSongs(token, id)
  }

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }
}
