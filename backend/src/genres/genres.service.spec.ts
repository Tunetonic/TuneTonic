import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GenreDist } from './entities/genre-dist.entity'
import { GenresService } from './genres.service'

describe('GenresService', () => {
  let service: GenresService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(GenreDist),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<GenresService>(GenresService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
