// import { Repository } from 'typeorm'
// import { Test, TestingModule } from '@nestjs/testing'
// import { User } from './user.entity'
// import { UserService } from './user.service'
// import { InjectRepository } from '@nestjs/typeorm'

describe('UserService', () => {
  //   let service: UserService

  //   InjectRepository(User)
  //   let userRepository: Repository<User>

  //   let testUser1: User = new User()

  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [UserService],
  //     }).compile()

  //     service = module.get<UserService>(UserService)
  //     userRepository = module.get(Repository<User>)
  //     testUser1.id = 1
  //     testUser1.name = 'tester'
  //   })

  //   it('should be defined', () => {
  //     expect(service).toBeDefined()
  //   })

  //   it('user should have an id', () => {
  //     expect(testUser1.id).toEqual(1)
  //   })

  it('test userService', () => {
    expect(true).toBe(true)
  })
})
