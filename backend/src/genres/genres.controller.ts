import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { GenresService, Rating } from './genres.service'
import { UpdateGenreDto } from './dto/update-genre.dto'

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(
    @Body('genres') genres: Record<string, string>[],
    @Body('userId') userId: string,
  ) {
    return this.genresService.create(genres, userId)
  }

  @Post()
  updateDistribution(
    @Body('userId') userId: string,
    @Body('userId') ratings: Rating[],
  ) {
    return this.genresService.calculateUpdateDistribution(userId, ratings)
  }

  @Get()
  findAll() {
    return this.genresService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+id, updateGenreDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id)
  }
}
