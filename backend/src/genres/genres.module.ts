import { Module } from '@nestjs/common'
import { GenresService } from './genres.service'
import { GenresController } from './genres.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenreDist } from './entities/genre-dist.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GenreDist])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
