import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../typeorm/entities/User'

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    addUser(userData){
        console.log(userData)
const user = this.userRepository.create({
    id: userData.id,
    email: userData.email,
    displayName: userData.display_name
})
       return this.userRepository.save(user)
    }


}


