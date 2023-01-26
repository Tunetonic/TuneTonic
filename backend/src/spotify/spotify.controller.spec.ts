import { Test } from '@nestjs/testing'
import { SpotifyController } from './spotify.controller'
import { SpotifyService } from './spotify.service'
import { SpotifyArtists } from './interface/spotify-artists'
import { SpotifyArtist } from './interface/spotify-artist'
import { SpotifyPlaylist } from './interface/spotify-playlist'
import { UserService } from '../user/user.service'
import { HttpModule } from '@nestjs/axios'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { SpotifyTrack } from './interface/spotify-track'

describe('SpotifyController', () => {
  let spotifyController: SpotifyController
  let spotifyService: SpotifyService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SpotifyController],
      providers: [
        SpotifyService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile()

    spotifyService = module.get<SpotifyService>(SpotifyService)
    spotifyController = module.get<SpotifyController>(SpotifyController)
  })

  it('should be defined', () => {
    expect(spotifyController).toBeDefined()
  })

  describe('getRandomTracks', () => {
    it('should return an array of tracks', async () => {
      const mockTracks: SpotifyTrack[] = [
        {
          artist_name: 'Kanye West',
          duration_ms: 311866,
          id: '0j2T0R9dR9qdJYsB7ciXhf',
          image:
            'https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a',
          name: 'Stronger',
          preview_url:
            'https://p.scdn.co/mp3-preview/23771e17f5cc8853beee8ffee1ddc99fdefbcfa1?cid=c199b03bf99a4f869d1b96a44171d543',
          track_number: 3,
          type: 'track',
          uri: 'spotify:track:0j2T0R9dR9qdJYsB7ciXhf',
        },
        {
          artist_name: 'Kabouter Plop',
          duration_ms: 235226,
          id: '4UxMdVVoR68ZS2iCR7bJf0',
          image:
            'https://i.scdn.co/image/ab67616d0000b273ccb6abbf2da4aedad40fc69a',
          name: 'Kabouterdans',
          preview_url:
            'https://p.scdn.co/mp3-preview/4e53c10efb043701216e3126b7613589c832ca0d?cid=c199b03bf99a4f869d1b96a44171d543',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:4UxMdVVoR68ZS2iCR7bJf0',
        },
        {
          artist_name: 'MAGIC!',
          duration_ms: 224840,
          id: '6RtPijgfPKROxEzTHNRiDp',
          image:
            'https://i.scdn.co/image/ab67616d0000b273604f8ac39f15d287e251f193',
          name: 'Rude',
          preview_url:
            'https://p.scdn.co/mp3-preview/b2a7b00f0de0eebc99af0b7342e4567cfccb5a32?cid=c199b03bf99a4f869d1b96a44171d543',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:6RtPijgfPKROxEzTHNRiDp',
        },
        {
          artist_name: 'Lil Kleine',
          duration_ms: 179978,
          id: '3oQaT7XX1MpFtDABwHtYoo',
          image:
            'https://i.scdn.co/image/ab67616d0000b2732e3794e83bb9e95672f65880',
          name: 'Honderd Ruggen',
          preview_url:
            'https://p.scdn.co/mp3-preview/cbcaf0b5d6a86548fb25ada8c2b6989ef935eea6?cid=c199b03bf99a4f869d1b96a44171d543',
          track_number: 13,
          type: 'track',
          uri: 'spotify:track:3oQaT7XX1MpFtDABwHtYoo',
        },
        {
          artist_name: 'Andre Hazes',
          duration_ms: 246706,
          id: '3K9DdzUlsLa1SynqM5XhLj',
          image:
            'https://i.scdn.co/image/ab67616d0000b273044eab3f11954c8fe20a2851',
          name: 'Het Is Koud Zonder Jou',
          preview_url:
            'https://p.scdn.co/mp3-preview/1c5bfcade3a6632e4483e694a0a10954ede1c9d8?cid=c199b03bf99a4f869d1b96a44171d543',
          track_number: 6,
          type: 'track',
          uri: 'spotify:track:3K9DdzUlsLa1SynqM5XhLj',
        },
      ]

      jest.spyOn(spotifyService, 'getRandomTracks').mockImplementation(() => {
        return Promise.resolve(mockTracks)
      })
      const result = await spotifyController.getRandomTracks('Bearer 123') // spotifyToken
      expect(spotifyService.getRandomTracks).toHaveBeenCalledWith('Bearer 123')
      expect(spotifyService.getRandomTracks).toHaveReturned()
      expect(spotifyController.getRandomTracks).toReturnWith<SpotifyTrack[]>(
        mockTracks,
      )
      expect(result).toEqual(mockTracks)
    })
  })

  describe('getArtists', () => {
    it('should return an array of SpotifyArtists', async () => {
      const mockItems = Object.create(null)
      mockItems['item1'] = {
        id: '0oSGxfWSnnOXhD2fKuz2Gy',
        name: 'David Bowie',
        type: 'artist',
        uri: 'spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy',
      }
      mockItems['item2'] = {
        id: '6tbjWDEIzxoDsBA1FuhfPW',
        name: 'Prince',
        type: 'artist',
        uri: 'spotify:artist:6tbjWDEIzxoDsBA1FuhfPW',
      }

      const mockArtists: SpotifyArtists[] = [
        {
          artists: {
            href: 'https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy',
            items: mockItems,
            limit: 20,
            next: 'https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy&offset=20',
            cursors: {
              after: 'MTA=',
            },
            total: 2,
          },
        },
      ]

      jest
        .spyOn(spotifyService, 'getFollowedArtists')
        .mockImplementation(() => {
          return Promise.resolve(mockArtists)
        })

      const result = await spotifyController.getArtists({
        spotifyToken: '123',
        id: '123',
      })

      expect(spotifyService.getFollowedArtists).toHaveBeenCalledWith({
        spotifyToken: '123',
        id: '123',
      })
      expect(result).toEqual(mockArtists)
    })
  })

  describe('getArtist', () => {
    it('should return a spotify artist', async () => {
      const mockArtist = Object.create(null)
      mockArtist['item1'] = { genres: ['pop', 'dance pop'] }

      const mockSpotifyArtist: SpotifyArtist = {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/3jOstUTkEu2JkjvRdBA5Gu',
        },
        followers: {
          href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu/followers',
          total: 54635,
        },
        genres: mockArtist,
        href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu',
        id: '3jOstUTkEu2JkjvRdBA5Gu',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2731feba4f7ab0b8a0f9e9b3e3c',
            height: 640,
            width: 640,
          },
        ],
        name: 'Dua Lipa',
        popularity: 87,
        type: 'artist',
        uri: 'spotify:artist:3jOstUTkEu2JkjvRdBA5Gu',
      }

      jest.spyOn(spotifyService, 'getArtist').mockImplementation(() => {
        return Promise.resolve(mockSpotifyArtist)
      })

      const { spotifyToken: token, id } = {
        spotifyToken: '123',
        id: '3jOstUTkEu2JkjvRdBA5Gu',
      }
      const result = await spotifyController.getArtist(token, id)

      expect(spotifyService.getArtist).toHaveBeenCalledWith(
        '123',
        '3jOstUTkEu2JkjvRdBA5Gu',
      )
      expect(result).toEqual(mockSpotifyArtist)
    })
  })

  describe('unfollowArtist', () => {
    it('should unfollow an artist', async () => {
      const mockArtist = Object.create(null)
      mockArtist['item1'] = { genres: ['pop', 'dance pop'] }

      const mockSpotifyArtist: SpotifyArtist = {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/3jOstUTkEu2JkjvRdBA5Gu',
        },
        followers: {
          href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu/followers',
          total: 54635,
        },
        genres: mockArtist,
        href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu',
        id: '3jOstUTkEu2JkjvRdBA5Gu',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2731feba4f7ab0b8a0f9e9b3e3c',
            height: 640,
            width: 640,
          },
        ],
        name: 'Dua Lipa',
        popularity: 87,
        type: 'artist',
        uri: 'spotify:artist:3jOstUTkEu2JkjvRdBA5Gu',
      }

      jest
        .spyOn(spotifyService, 'unfollowArtist')
        .mockImplementation(() => Promise.resolve(mockSpotifyArtist))

      expect(
        await spotifyController.unfollowArtist('123', '3jOstUTkEu2JkjvRdBA5Gu'),
      ).toBe(mockSpotifyArtist)
    })
  })

  describe('getArtistPlaylist', () => {
    it('should return the playlist of the artist', async () => {
      const mockSpotifyPlaylists: SpotifyPlaylist[] = [
        {
          id: '123',
          name: 'My Playlist 1',
          image: 'https://example.com/playlist-image-1.jpg',
          totalTracks: 50,
        },
        {
          id: '456',
          name: 'My Playlist 2',
          image: 'https://example.com/playlist-image-2.jpg',
          totalTracks: 40,
        },
      ]

      jest.spyOn(spotifyService, 'getPlaylist').mockImplementation(() => {
        return Promise.resolve(mockSpotifyPlaylists)
      })

      const { spotifyToken: token, id } = { spotifyToken: '123', id: '123' }
      const result = await spotifyController.getPlaylist(token, id)

      expect(spotifyService.getPlaylist).toHaveBeenCalledWith('123', '123')
      expect(result).toEqual(mockSpotifyPlaylists)
    })
  })
})
