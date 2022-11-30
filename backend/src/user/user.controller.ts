import { UpdateUserDTO } from './dto/update-user.dto'
import { createUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id)
  }

  @Post()
  postUser(@Body() user: createUserDTO): Promise<User> {
    return this.userService.saveUser(user)
  }

  @Put(':id')
  putUser(
    @Param('id') id: number,
    @Body() updateBody: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.updateUser(id, updateBody)
  }
}
