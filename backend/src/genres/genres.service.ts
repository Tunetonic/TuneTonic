import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreDist } from './entities/genre-dist.entity';
import { Genre } from './entities/genre.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenresService {

  constructor(
      @InjectRepository(GenreDist) private genreRepository: Repository<GenreDist>
  ) {}

  async create(genres: Record<string, string>[], userId: string): Promise<void> {
    let columnsLst = []
    let valuesLst = []

    genres.map((genre) => {
      genre.isActive = (genre.isActive ? "1" : "0")
      columnsLst.push(genre.tagName)
      valuesLst.push(genre.isActive)
    })

    let query = `
    INSERT INTO genre_dist (id, user_id, ${columnsLst.toString()})
    VALUES ("${uuidv4()}", "${userId}", ${valuesLst.toString()})
    `
    console.log(query)
    this.genreRepository.query(query)
  }

  findAll() {
    return `This action returns all genres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
