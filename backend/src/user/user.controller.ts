import { createUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { User } from './user.entity'
import { Role } from '../enums/role.enum'
import { UpdateUserDTO } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { SpotifyService } from '../spotify/spotify.service'

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

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id)
  }

  @Post()
  postUser(@Body() user: createUserDTO): Promise<User> {
    return this.userService.saveUser(user)
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateBody: UpdateUserDTO) {
    return await this.userService.updateUser(id, updateBody)
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/:secret/:role')
  async updateUserRole(
    @Param('id') id: string,
    @Param('secret') code: string,
    @Param('role') role: Role,
  ) {
    if (code === process.env.ADMIN_CODE) {
      const databaseUser = await this.userService.findUserById(id)

      if (!databaseUser) {
        throw new NotFoundException()
      }

      const user = { ...databaseUser, role: role }

      return await this.userService.updateUser(id, user)
    }

    throw new ForbiddenException()
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/admin')
  async deleteUserByAdmin(@Param('id') id: string) {
    return await this.userService.deleteUserById(id)
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(
    @Headers('spotifyToken') token: string,
    @Param('id') id: string,
  ) {
    const user = await this.spotifyService.getUserFromSpotify(token)

    if (user.id === id) {
      return await this.userService.deleteUserById(id)
    }

    throw new UnauthorizedException()
  }
}
