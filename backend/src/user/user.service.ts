import { Repository } from 'typeorm'
import { createUserDTO } from './dto/create-user.dto'
import { User } from './user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly httpService: HttpService
  ) { }

  async getUserFromSpotify(token: string) {
    const spotifyUrl = 'https://api.spotify.com/v1/me'

    return await firstValueFrom(this.httpService.get(spotifyUrl, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      }
    }).pipe(
      map(response => response.data),
      catchError((error) => {
        throw error.response.data;
      }),
    ),
    )
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({
      id: id,
    })
  }

  async updateUser(id: string, updateBody: UpdateUserDTO): Promise<User> {
    await this.userRepository.update(id, updateBody)
    return await this.findUserById(id)
  }

  async saveUser(createUserBody: createUserDTO): Promise<void> {
    const userFound = (await this.userRepository.find()).some(user => user.id === createUserBody.id)

    if (!userFound) {
      await this.userRepository.save(createUserBody)
    }
  }

  async userInformations(token: string): Promise<any> {
    return await firstValueFrom(
      this.httpService.get('https://api.spotify.com/v1/me', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token,
        }
      }).pipe(
        map(response => response.data),
        catchError((error) => {
          throw error.response.data;
        }),
      ),
    )
  }

  async userPlaylists(token: string): Promise<any> {
    return await firstValueFrom(
      this.httpService.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token,
        }
      }).pipe(
        map(response => response.data),
        catchError((error) => {
          throw error.response.data;
        }),
      ),
    )
  }
}
