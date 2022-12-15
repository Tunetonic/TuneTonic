import { NEST_URI } from '@env'
import { DatabaseUser } from '../interfaces/db-user'
import { Tag } from '../screens/TagView'
import { authFetch, authRequest } from './fetch.service'

export const getGenreSeeds = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/seeds`)
}


/**
 * Saves user's selected genres in our database.
 * @param userBody User data to save
 * @returns
 */
export const postUserPreferenceGenres = async (userBody: Tag[]): Promise<any> => {
  const postUrl = `${NEST_URI}/genres`
  return await authRequest(postUrl, userBody, 'POST')
}
