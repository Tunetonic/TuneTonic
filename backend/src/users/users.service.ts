import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../typeorm/entities/User'

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async addUser(userData) {
        if (await this.userRepository.findOneBy({id: userData.id}) === null) {
            const user = this.userRepository.create({
                id: userData.id,
                email: userData.email,
                displayName: userData.display_name
            })
            await this.userRepository.save(user)



            return false;
        }

        return true
    }


}


