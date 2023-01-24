import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { GenreDist } from './entities/genre-dist.entity'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreDist) private genreRepository: Repository<GenreDist>,
  ) {}

  async create(
    genres: Record<string, string>[],
    userId: string,
  ): Promise<void> {
    const columnsLst = []
    const valuesLst = []

    genres.map((genre) => {
      genre.isActive = genre.isActive ? '1' : '0'
      columnsLst.push(genre.tagName)
      valuesLst.push(genre.isActive)
    })

    const query = `
            INSERT INTO genre_dist (id, user_id, ${columnsLst.toString()})
            VALUES ("${uuidv4()}", "${userId}", ${valuesLst.toString()})
        `
    await this.genreRepository.query(query)
  }

  findAll() {
    return `This action returns all genres`
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre ${JSON.stringify(
      updateGenreDto,
    )}`
  }

  remove(id: number) {
    return `This action removes a #${id} genre`
  }
}
