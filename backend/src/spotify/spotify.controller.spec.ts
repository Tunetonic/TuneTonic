import { Test, TestingModule } from '@nestjs/testing'
import { SpotifyController } from './spotify.controller'
import { SpotifyService } from './spotify.service'
import { SpotifyArtists } from './interface/spotify-artists';
import { SpotifyArtist } from './interface/spotify-artist';
import { SpotifyPlaylist } from './interface/spotify-playlist';
import { UserService } from '../user/user.service'
import { HttpModule } from '@nestjs/axios'
import { Repository} from 'typeorm'
import { User } from '../user/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'


describe('SpotifyController', () => {
  let spotifyController: SpotifyController;
  let spotifyService: SpotifyService;
  let module: TestingModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SpotifyController],
      providers: [
        SpotifyService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
      ],
    }).compile();

    spotifyService = module.get<SpotifyService>(SpotifyService);
    spotifyController = module.get<SpotifyController>(SpotifyController);
  });

  it('should be defined', () => {
    expect(spotifyController).toBeDefined()
  })

  describe('getArtists', () => {
    it('should return an array of SpotifyArtists', async () => {

      const mockItems = Object.create(null);
          mockItems["item1"] = { id: "0oSGxfWSnnOXhD2fKuz2Gy", name: "David Bowie", type: "artist", uri: "spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy" };
          mockItems["item2"] = { id: "6tbjWDEIzxoDsBA1FuhfPW", name: "Prince", type: "artist", uri: "spotify:artist:6tbjWDEIzxoDsBA1FuhfPW" };

          const mockArtists: SpotifyArtists[] = [
            {
              artists: {
                href: "https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy",
                items: mockItems,
                limit: 20,
                next: "https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy&offset=20",
                cursors: {
                  after: "MTA="
                },
                total: 2
              }
            }
          ]

      jest.spyOn(spotifyService, 'getFollowedArtists').mockImplementation(() => {
        return Promise.resolve(mockArtists);
      });

      const result = await spotifyController.getArtists({ spotifyToken: '123', id: '123' });

      expect(spotifyService.getFollowedArtists).toHaveBeenCalledWith({ spotifyToken: '123', id: '123' });
      expect(result).toEqual(mockArtists);
    });
  });

  describe('getArtist', () => {
    it('should return a spotify artist', async () => {

      const mockArtist = Object.create(null);
      mockArtist["item1"] = { genres:[ 'pop', 'dance pop' ]};

      const mockSpotifyArtist: SpotifyArtist = {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/3jOstUTkEu2JkjvRdBA5Gu'
        },
        followers: {
          href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu/followers',
          total: 54635
        },
        genres: mockArtist,
        href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu',
        id: '3jOstUTkEu2JkjvRdBA5Gu',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2731feba4f7ab0b8a0f9e9b3e3c',
            height: 640,
            width: 640
          }
        ],
        name: 'Dua Lipa',
        popularity: 87,
        type: 'artist',
        uri: 'spotify:artist:3jOstUTkEu2JkjvRdBA5Gu'
      }

      jest.spyOn(spotifyService, 'getArtist').mockImplementation(() => {
        return Promise.resolve(mockSpotifyArtist);
      });

      const { spotifyToken: token, id } = { spotifyToken: '123', id: '3jOstUTkEu2JkjvRdBA5Gu' };
      const result = await spotifyController.getArtist(token, id);

      expect(spotifyService.getArtist).toHaveBeenCalledWith("123", "3jOstUTkEu2JkjvRdBA5Gu");
      expect(result).toEqual(mockSpotifyArtist);
    });
  });

  describe('unfollowArtist', () => {
    it('should unfollow an artist', async () => {

      const mockArtist = Object.create(null);
      mockArtist["item1"] = { genres:[ 'pop', 'dance pop' ]};

      const mockSpotifyArtist: SpotifyArtist = {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/3jOstUTkEu2JkjvRdBA5Gu'
        },
        followers: {
          href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu/followers',
          total: 54635
        },
        genres: mockArtist,
        href: 'https://api.spotify.com/v1/artists/3jOstUTkEu2JkjvRdBA5Gu',
        id: '3jOstUTkEu2JkjvRdBA5Gu',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2731feba4f7ab0b8a0f9e9b3e3c',
            height: 640,
            width: 640
          }
        ],
        name: 'Dua Lipa',
        popularity: 87,
        type: 'artist',
        uri: 'spotify:artist:3jOstUTkEu2JkjvRdBA5Gu'
      }

      jest.spyOn(spotifyService, 'unfollowArtist').mockImplementation(() => Promise.resolve(mockSpotifyArtist));

      expect(await spotifyController.unfollowArtist("123", "3jOstUTkEu2JkjvRdBA5Gu")).toBe(mockSpotifyArtist);
    });
  });

  describe('getArtistPlaylist', () => {
    it('should return the playlist of the artist', async () => {

      const mockSpotifyPlaylists: SpotifyPlaylist[] = [
        {
          id: '123',
          name: 'My Playlist 1',
          image: 'https://example.com/playlist-image-1.jpg',
          totalTracks: 50
        },
        {
          id: '456',
          name: 'My Playlist 2',
          image: 'https://example.com/playlist-image-2.jpg',
          totalTracks: 40
        },
      ];

      jest.spyOn(spotifyService, 'getPlaylist').mockImplementation(() => {
        return Promise.resolve(mockSpotifyPlaylists);
      });

      const { spotifyToken: token, id } = { spotifyToken: '123', id: '123' };
      const result = await spotifyController.getPlaylist(token, id);

      expect(spotifyService.getPlaylist).toHaveBeenCalledWith("123", "123");
      expect(result).toEqual(mockSpotifyPlaylists);
    });
  });

});