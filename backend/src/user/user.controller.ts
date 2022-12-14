import { createUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { Role, User } from './user.entity'
import { UpdateUserDTO } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { SpotifyService } from 'src/spotify/spotify.service'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private spotifyService: SpotifyService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Put(':id/:secret')
  async updateUserRole(
    @Param('id') id: string,
    @Param('secret') code: string,
    @Body() updateBody: UpdateUserDTO,
  ) {
    if (code === process.env.ADMIN_CODE) {
      return await this.userService.updateUser(id, updateBody)
    }

    throw new ForbiddenException()
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/admin')
  async deleteUserByAdmin(@Param('id') id: string) {
    return await this.userService.deleteUserById(id)
  }

  @Delete(':id')
  async deleteUser(
    @Headers('Authorization') token: string,
    @Param('id') id: string,
  ) {
    const user = await this.spotifyService.getUserFromSpotify(token)

    if (user.id === id) {
      return await this.userService.deleteUserById(id)
    }

    throw new UnauthorizedException()
  }
}
