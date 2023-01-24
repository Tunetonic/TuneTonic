import { Like } from '../like.entity'
import { User } from '../../user/user.entity'
import { Genre } from '../../genres/entities/genre.entity'

export type LikeDTO = {
  uri: string
  type: string
  track_number: number
  preview_url: string
  name: string
  image: string
  artist_name: string
  id: string
  duration_ms: number
}

export const likeDTOMapper = (
  likeDto: LikeDTO,
  genres: Genre[],
  user: User,
): Like => {
  const like: Like = new Like()
  like.genres = [...genres]
  like.spotifyId = likeDto.id
  like.users = [user]
  return like
}
