import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpModule} from "@nestjs/axios";
import {UserProfileController} from "./userProfile/UserProfile.controller";
import {UserProfileService} from "./userProfile/UserProfile.service";


@Module({
    imports: [HttpModule],
    controllers: [AppController, UserProfileController],
    providers: [AppService, UserProfileService],
})
export class AppModule {
}
