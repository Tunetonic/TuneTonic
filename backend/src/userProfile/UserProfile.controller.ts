import { UserProfileService } from './UserProfile.service'
import { Controller, Get, Headers } from '@nestjs/common'


@Controller('userProfile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    async GetPLaylists(@Headers('Authorization') token): Promise<any> {
        return await this.userProfileService.userPLaylists(token);
    }


    @Get('/userInformations')
    async getUserInformations(@Headers('Authorization') token): Promise<any> {
        return await this.userProfileService.userInformations(token);
    }
}
