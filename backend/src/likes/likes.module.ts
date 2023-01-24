import {Module} from '@nestjs/common';
import {LikesController} from './likes.controller'
import {LikesService} from './likes.service'
import {HttpModule} from "@nestjs/axios";
import {Like} from "./like.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Like, User]), HttpModule],
    controllers: [LikesController],
    providers: [LikesService, UserService],
})
export class LikesModule {
}
