import { PartialType } from '@nestjs/mapped-types';
import { Genre } from '../entities/genre.entity';
import { CreateGenreDto } from './create-genre.dto';

export interface UpdateGenreDto extends Partial<Omit<Genre, 'id'>> {}
