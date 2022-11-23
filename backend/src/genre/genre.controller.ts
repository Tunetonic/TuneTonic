import { GenreService } from './genre.service'
import { Genre } from './genre.entity'
import { Controller, Get, Res, HttpStatus } from '@nestjs/common'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async fetchAll(@Res() response: any): Promise<Genre[]> {
    const genres = await this.genreService.findAll()
    return response.status(HttpStatus.OK).json({
      genres,
    })
  }
}
