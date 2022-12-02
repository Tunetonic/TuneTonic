import { createUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Get, Param, Post, Put, Headers } from '@nestjs/common'
import { User } from './user.entity'
import { UpdateUserDTO } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id)
  }

  @Get('/spotify-user')
  getSpotifyUser(@Headers("Authorization") token: string) {
    return this.userService.getUserFromSpotify(token)
  }

  @Get()
  async getPlaylists(@Headers('Authorization') token): Promise<any> {
      return await this.userService.userPlaylists(token);
  }


  @Get('/userInformations')
  async getUserInformations(@Headers('Authorization') token): Promise<any> {
      return await this.userService.userInformations(token);
  }
  

  @Post()
  postUser(@Body() user: createUserDTO): Promise<void> {
    return this.userService.saveUser({id: user?.id})
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateBody: UpdateUserDTO) {
      return await this.userService.updateUser(id, updateBody)
    }
}
