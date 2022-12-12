import { Repository } from 'typeorm'
import { createUserDTO } from './dto/create-user.dto'
import { User } from './user.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findUserById(id: string): Promise<User> {
    const res = await this.userRepository.findOneBy({
      id: id,
    })

    if (!res) throw new NotFoundException()

    return res
  }

  async updateUser(id: string, updateBody: UpdateUserDTO): Promise<User> {
    await this.userRepository.update(id, updateBody)
    return await this.findUserById(id)
  }

  async saveUser(createUserBody: createUserDTO): Promise<User> {
    return await this.userRepository.save(createUserBody)
  }

  async deleteUserById(id: string): Promise<User> {
    const user: User = await this.findUserById(id)
    return await this.userRepository.remove(user)
  }
}
