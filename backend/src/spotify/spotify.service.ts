import { SpotifyPlaylist } from './interface/spotify-playlist'
import { UserService } from './../user/user.service'
import { SpotifyUser } from './interface/spotify-user'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { catchError, firstValueFrom, map } from 'rxjs'

@Injectable()
export class SpotifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  /**
   * get's user from spotify.
   * if user doesn't exist with us, he gets saved
   */
  async getUserFromSpotify(token: string): Promise<SpotifyUser> {
    const spotifyUrl = 'https://api.spotify.com/v1/me'

    const user: SpotifyUser = await firstValueFrom(
      this.httpService
        .get<SpotifyUser>(spotifyUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            throw error.response.data
          }),
        ),
    )

    const userExist = (await this.userService.findAllUsers()).some(
      (e) => e.id === user.id,
    )

    if (!userExist) {
      this.userService.saveUser(user)
    }

    return user
  }

  async getUserPlaylists(token: string): Promise<SpotifyPlaylist[]> {
    const spotifyUrl = 'https://api.spotify.com/v1/me/playlists'

    return await firstValueFrom(
      this.httpService
        .get<SpotifyPlaylist[]>(spotifyUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            throw error.response.data
          }),
        ),
    )
  }

  async getGenreSeeds(token: string): Promise<any[]> {
    const spotifyUrl =
      'https://api.spotify.com/v1/recommendations/available-genre-seeds'

    return await firstValueFrom(
      this.httpService
        .get(spotifyUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            throw error.response.data
          }),
        ),
    )
  }
}
