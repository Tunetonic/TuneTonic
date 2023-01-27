import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GenresController } from './genres.controller'
import { GenreDist } from './entities/genre-dist.entity'
import { HttpModule } from '@nestjs/axios'
import { GenresService } from './genres.service'

describe('GenresController', () => {
  let controller: GenresController
  let service: GenresService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GenresController],
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(GenreDist),
          useClass: Repository,
        },
      ],
    }).compile()

    controller = module.get<GenresController>(GenresController)
    service = module.get<GenresService>(GenresService)
  })

  describe('create', () => {
    it('should call the service with the correct parameters', async () => {
      const genres = [
        { tagName: 'action', isActive: 'true' },
        { tagName: 'comedy', isActive: 'false' },
      ]
      const userId = '123'
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve({}))
      await controller.create(genres, userId)
      expect(service.create).toHaveBeenCalledWith(genres, userId)
    })
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
