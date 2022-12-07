import { createUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { User } from './user.entity'
import { UpdateUserDTO } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Role: admin
   */
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers()
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id)
  }

  @Post()
  postUser(@Body() user: createUserDTO): Promise<User> {
    return this.userService.saveUser(user)
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateBody: UpdateUserDTO) {
    return await this.userService.updateUser(id, updateBody)
  }
}
