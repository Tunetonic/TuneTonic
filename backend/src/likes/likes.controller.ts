import {Body, Controller, Get, Headers, HttpStatus, Param, Post, Put, Response} from '@nestjs/common'
import {LikesService} from "./likes.service";
import {LikeDTO} from "./likeDTO/LikeDTO";
import {Like} from "./like.entity";

@Controller('likes')
export class LikesController {

    constructor(private likeService: LikesService) {
    }

    @Post('like/:id')
    async addLike(@Param('id') itemId: string, @Body() likeDetails: LikeDTO, @Headers('Authorization') authToken, @Response() res) {
        const like: Like = await this.likeService.add(likeDetails, authToken, itemId);
        res.status(HttpStatus.OK).send({
            message: "Successfully liked",
            data: like.genres.map(data => data.tagName)
        });
    }

    @Post('dislike')
    async dislike(@Body() likeObj: LikeDTO, @Response() res, @Headers('Authorization') authToken) {
        const like = await this.likeService.deleteLike(likeObj, authToken);
        res.status(HttpStatus.OK).send({
            message: "Successfully disliked",
            data: like
        });
    }
}
