import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'
import { Genre } from './genre.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreService],
  controllers: [GenreController],
})
export class LibraryModule {}
