import { UserService } from './../user/user.service'
import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { SpotifyService } from './spotify.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'

describe('SpotifyService', () => {
  let service: SpotifyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        SpotifyService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<SpotifyService>(SpotifyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
