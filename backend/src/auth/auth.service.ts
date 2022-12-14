import { Injectable } from '@nestjs/common'
import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    return this.jwtService.sign(payload)
  }
}
