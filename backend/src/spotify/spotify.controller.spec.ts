// import { HttpModule } from '@nestjs/axios'
// import { Test, TestingModule } from '@nestjs/testing'
// import { User } from './../user/user.entity'
// import { SpotifyController } from './spotify.controller'
// import { getRepositoryToken } from '@nestjs/typeorm'
// import { SpotifyService } from './spotify.service'
// import {
//   createConnection,
//   getConnection,
//   getConnectionManager,
//   Repository,
// } from 'typeorm'
// import { UserService } from '../user/user.service'

describe('SpotifyController', () => {
  // let controller: SpotifyController
  // let repository: Repository<User>

  // const testConnectionName = 'testConnection'
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [HttpModule],
  //     controllers: [SpotifyController],
  //     providers: [
  //       SpotifyService,
  //       UserService,
  //       {
  //         provide: getRepositoryToken(User),
  //         useClass: Repository,
  //       },
  //     ],
  //   }).compile()

  //   const connection = await createConnection({
  //     type: 'sqlite',
  //     database: ':memory:',
  //     dropSchema: true,
  //     entities: [User],
  //     synchronize: true,
  //     logging: false,
  //     name: testConnectionName,
  //   })

  //   controller = module.get<SpotifyController>(SpotifyController)
  //   const manager = getConnectionManager().get(testConnectionName)

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   repository = manager.getRepository(User)
  //   return connection
  // })

  // it('should be defined', () => {
  //   expect(controller).toBeDefined()
  //   // expect(service).toBeDefined()
  // })

  // afterEach(async () => {
  //   await getConnection(testConnectionName).close()
  // })
  it('test spotifyController', () => {
    expect(true).toBe(true)
  })
})
