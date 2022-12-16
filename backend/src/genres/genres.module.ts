import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
