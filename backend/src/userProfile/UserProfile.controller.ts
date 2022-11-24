import {UserProfileService} from "./UserProfile.service";
import {Controller, Get} from "@nestjs/common";
import { Headers } from '@nestjs/common';


@Controller('userProfile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    async GetPLaylists(@Headers('Authorization') headers): Promise<any> {
        return await this.userProfileService.userPLaylists(headers);
    }
}
