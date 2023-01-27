import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { GenreDist } from './entities/genre-dist.entity'

export interface Rating {
  genre: string // tagname
  count: number
}

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreDist) private genreRepository: Repository<GenreDist>,
  ) {}

  async create(genres: Record<string, string>[], userId: string): Promise<any> {
    const columnsLst = []
    const valuesLst = []
    const falsepref = genres.filter(
      (data) => data.isActive.toString() === 'false',
    ).length
    const truepref = genres.filter(
      (data) => data.isActive.toString() === 'true',
    ).length
    const defaultWeight = 100 / 126

    genres.map((genre) => {
      genre.isActive = genre.isActive
        ? (defaultWeight + 0.126).toString()
        : (defaultWeight - 0.001 * truepref).toString()
      columnsLst.push(genre.tagName)
      valuesLst.push(genre.isActive)
    })

    const query = `INSERT INTO genre_dist(user_id, ${columnsLst.toString()}) VALUES ("${userId}", ${valuesLst.toString()})`

    return await this.genreRepository.query(query)
  }

  async calculateUpdateDistribution(
    userId: string,
    ratings: Rating[],
  ): Promise<any> {
    const currentDistribution = await this.genreRepository.findOneBy({
      user_id: userId,
    })
    const increaseLikeWeight = 0.1
    const decreaseLikeWeight = 0.1
    const increaseWeight = 0.07
    const decreaseWeight = 0.05
    const maxPoints = 100

    ratings.forEach(({ genre, count }) => {
      if (count < 0) {
        currentDistribution[genre] =
          currentDistribution[genre] - decreaseLikeWeight * count
      }
      if (count > 0) {
        currentDistribution[genre] =
          currentDistribution[genre] + increaseLikeWeight * count
      }
    })

    // make sure everything will be 100% in total
    while (true) {
      const dummyDistribution: GenreDist = { ...currentDistribution }
      const { user_id, created_at, ...currentDistributionRest } =
        dummyDistribution
      const distributionSum: number = Object.values(dummyDistribution).reduce(
        (prev, curr) => (prev = curr),
        0,
      )

      if (distributionSum > maxPoints + 1) {
        for (const key in dummyDistribution) {
          dummyDistribution[key] = dummyDistribution[key] + decreaseWeight
        }
        continue
      }

      if (distributionSum < maxPoints - 1) {
        for (const key in dummyDistribution) {
          dummyDistribution[key] = dummyDistribution[key] + decreaseWeight
        }
        continue
      }

      break
    }
    return await this.genreRepository.save(currentDistribution)
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
