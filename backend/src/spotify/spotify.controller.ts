import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyService } from './spotify.service'
import { Controller, Get, Headers } from '@nestjs/common'
import { SpotifyUser } from './interface/spotify-user'
import { SpotifyArtists } from './interface/spotify-artists'

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

  @Get('/seeds')
  async getGenreSeeds(
    @Headers('Authorization') token,
  ): Promise<SpotifyPlaylist[]> {
    return await this.spotifyService.getGenreSeeds(token)
  }

  @Get('/artists')
  async getArtists(
      @Headers('Authorization') token,
  ): Promise<SpotifyArtists[]> {
    console.log(token)
    return await this.spotifyService.getFollowedArtists(token)
  }
}
