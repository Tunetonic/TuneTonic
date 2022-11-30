import { Controller, Get, Post, Headers } from '@nestjs/common';
import { UserProfileService } from 'src/userProfile/UserProfile.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(private readonly userProfileService: UserProfileService, private readonly userService: UsersService) {
    }


    @Post('addUser')
    async addUser(@Headers('Authorization') token): Promise<any> {
        const userData = await this.userProfileService.userInformations(token);
        return await this.userService.addUser(userData)
    }
}



