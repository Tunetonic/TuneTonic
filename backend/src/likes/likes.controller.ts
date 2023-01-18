import {Body, Controller, Get, Headers, Param, Post, Put} from '@nestjs/common'
import {LikesService} from "./likes.service";
import {LikeDTO} from "./likeDTO/LikeDTO";

@Controller('likes')
export class LikesController {

    constructor(private likeService: LikesService) {}

  @Post(':id')
   addLike(@Param('id') id: string, @Body() likeObj: LikeDTO, @Headers('Authorization') token) {
        this.likeService.add(likeObj, token, id).then(r => console.log(r));
      return "dancing with wooo"
  }

}
