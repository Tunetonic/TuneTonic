import { SpotifyPlaylist } from './interface/spotify-playlist'
import { SpotifyArtists } from './interface/spotify-artists'
import { UserService } from './../user/user.service'
import { SpotifyUser } from './interface/spotify-user'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { catchError, firstValueFrom, map } from 'rxjs'
import { SpotifyArtist } from './interface/spotify-artist'
import { SpotifySong } from './interface/spotify-song'
import { User } from '../user/user.entity'

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

  async getUsersFromSpotify(token: string): Promise<SpotifyUser[]> {
    const spotifyUrl = 'https://api.spotify.com/v1/users/'

    const databaseUsers: User[] = await this.userService.findAllUsers()
    const ids: string[] = databaseUsers.map((x) => x.id)
    const spotifyUsers = []

    if (databaseUsers.length > 0) {
      for (const id of ids) {
        const user: SpotifyUser = await firstValueFrom(
          this.httpService
            .get<SpotifyUser>(spotifyUrl + id, {
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

        spotifyUsers.push(user)
      }
    }

    return spotifyUsers
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

  async getPlaylist(id: string, token: string): Promise<any> {
    const spotifyUrl = `https://api.spotify.com/v1/playlists/${id}/tracks`

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
  async getPlaylistSongs(token: string, id: string): Promise<SpotifySong[]> {
    const spotifyUrl = `https://api.spotify.com/v1/playlists/${id}`

    return await firstValueFrom(
      this.httpService
        .get<SpotifySong[]>(spotifyUrl, {
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

  async getRandomTracks(token: string, url?: string): Promise<any> {
    const characters = 'abcdefghijklmnopqrstuvwxyz'
    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length),
    )
    let randomSearch = ''
    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + '%25' // %25 = % in URL Encoding
        break
      case 1:
        randomSearch = '%25' + randomCharacter + '%25'
        break
    }
    const randomOffset = Math.floor(Math.random() * 1000)

    const spotifyUrl = url
      ? url
      : `https://api.spotify.com/v1/search?type=track&q=\'${randomSearch}\'&offset=${randomOffset}`

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
  async getFollowedArtists(token: string): Promise<SpotifyArtists[]> {
    const spotifyUrl = 'https://api.spotify.com/v1/me/following?type=artist'

    return await firstValueFrom(
      this.httpService
        .get<SpotifyArtists[]>(spotifyUrl, {
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

  async getArtist(token: string, id: string): Promise<SpotifyArtist> {
    const spotifyUrl = `https://api.spotify.com/v1/artists/${id}`

    return await firstValueFrom(
      this.httpService
        .get<SpotifyArtist>(spotifyUrl, {
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

  async unfollowArtist(token: string, id: string): Promise<SpotifyArtist> {
    const spotifyUrl = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`

    return await firstValueFrom(
      this.httpService
        .delete<SpotifyArtist>(spotifyUrl, {
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

  async getArtistPlaylists(
    token: string,
    id: string,
  ): Promise<SpotifyPlaylist[]> {
    const spotifyUrl = `https://api.spotify.com/v1/artists/${id}/albums`

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
}
