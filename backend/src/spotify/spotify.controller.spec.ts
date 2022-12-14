import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyUser } from './interface/spotify-user';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserService } from './../user/user.service'
import { User } from './../user/user.entity'
import {
  createConnection,
  getConnection,
  getConnectionManager,
  Repository,
} from 'typeorm'

describe('SpotifyController', () => {
  let spotifyController: SpotifyController;
  let spotifyService: SpotifyService;
  let repository: Repository<User>

  const testConnectionName = 'testConnection'
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    })

    spotifyController = module.get<SpotifyController>(SpotifyController)
    const manager = getConnectionManager().get(testConnectionName)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    repository = manager.getRepository(User)
    return connection
  });

  async function getUser(): Promise<SpotifyUser> {
    const expectedResult: SpotifyUser = {
      country: 'US',
      display_name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      explicit_content: {
        filter_enabled: false,
        filter_locked: false,
      },
      external_urls: {
        spotify: 'https://open.spotify.com/user/abc123',
      },
      followers: {
        href: null,
        total: 100,
      },
      href: null,
      id: '12345',
      images: [
        {
          height: 200,
          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\\n"',
          width: 200,
        },
      ],
      product: 'premium',
      type: 'test',
      uri: 'test',
    };

    return Promise.resolve(expectedResult);
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyController],
      providers: [SpotifyService],
    }).compile();

    spotifyService = app.get<SpotifyService>(SpotifyService);
    spotifyController = app.get<SpotifyController>(SpotifyController);
  });

  describe('getSpotifyUser', () => {
    const userPromise = getUser();
    const expectedResult: Promise<SpotifyUser> = userPromise;

    it('should return a user object from the Spotify API', async () => {
      const token = '12345';

      jest.spyOn(spotifyService, 'getUserFromSpotify')
          .mockImplementation(() => expectedResult);

      expect(await spotifyController.getSpotifyUser(token)).toEqual(expectedResult);
    });
  });
});
