import { Injectable } from '@nestjs/common'
import { User } from '../user/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    return {
      JWT: this.jwtService.sign(payload),
      role: user.role,
    }
  }
}
