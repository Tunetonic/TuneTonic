import { NEST_URI } from '@env'
import axios from 'axios'
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
  return await authRequest(postUrl, JSON.parse(JSON.stringify(genreBody)), 'POST')
}

export const updateUserPreferenceGenres = async (userId: string, likesDIslikes ) => {
  console.log('activated')
  console.log(userId);
  console.log(likesDIslikes);
  const postUrl = `${NEST_URI}/genres/update/:${userId}`;

  axios.post(postUrl, JSON.parse(likesDIslikes)).then(res => {console.log(res)});
}
