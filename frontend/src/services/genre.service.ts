import { NEST_URI } from '@env'
import { authFetch } from './fetch.service'

export const getGenreSeeds = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/seeds`)
}
