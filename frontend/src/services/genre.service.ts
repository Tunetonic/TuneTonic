import { NEST_URI } from '@env'
import { GenreBody } from '../screens/TagView'
import { authFetch, authRequest } from './fetch.service'

export const getGenreSeeds = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/seeds`)
}


/**
 * Saves user's selected genres in our database.
 * @param userBody User data to save
 * @returns
 */
export const postUserPreferenceGenres = async (genreBody: GenreBody) => {
  const postUrl = `${NEST_URI}/genres`

  console.log("CHECKPOINT 1: ", genreBody)
  const genreBodyStr = JSON.stringify(genreBody).replace('/-/g', '_')
  return await authRequest(postUrl, JSON.parse(genreBodyStr), 'POST')
}
