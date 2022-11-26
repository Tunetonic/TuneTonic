import { Repository } from 'typeorm'
import { createUserDTO } from './dto/create-user.dto'
import { User } from './user.entity'
import { Injectable } from '@nestjs/common'
import { UpdateUserDTO } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id: id,
    })
  }

  async saveUser(user: createUserDTO): Promise<User> {
    return await this.userRepository.save(user)
  }

  async updateUser(id: number, updateBody: UpdateUserDTO): Promise<User> {
    const currentUser = await this.findUserById(id)
    const { name } = updateBody

    currentUser.name = name

    return await this.userRepository.save(currentUser)
  }
}
