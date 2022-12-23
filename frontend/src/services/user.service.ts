import { NEST_URI } from '@env'
import { DatabaseUser } from '../interfaces/db-user'
import { authFetch, authRequest, authDelete } from './fetch.service'

/**
 *
 * @returns Returns the current user from our Database
 */
export const getDatabaseUser = async (id: number): Promise<any> =>
  await authFetch(`${NEST_URI}/user/${id}`)

/**
 * Do we get the spotify user from spotify authentication?
 * @returns
 */
export const getSpotifyUser = async (): Promise<any> =>
  await authFetch(`${NEST_URI}/spotify`)

/**
 * Don't we already get all this information from authenticating in spotify.
 * Do we really need to make a request?
 * @param setPlaylistItems
 */
export const getUserPlaylist = async (): Promise<any> =>
  await authFetch(`${NEST_URI}/spotify/playlist`)

/**
 * Returns the followed artist of the user
 * @returns
 */
export const getFollowedArtists = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/artists/`)
}

/**
 * Saves user in our database.
 * @param userBody User data to save
 * @returns
 */
export const saveUser = async (userBody: DatabaseUser): Promise<any> =>
  await authRequest(`${NEST_URI}/user`, 'POST', userBody)

/**
 * Updates an existing user
 * @param id Id of the user
 * @param updateUserBody Update data
 * @returns
 */
export const updateUser = async (
  id: string,
  updateUserBody: Partial<Omit<DatabaseUser, 'id'>>,
): Promise<any> =>
  await authRequest(`${NEST_URI}/user/${id}`, 'PUT', updateUserBody)

/**
 * Deletes a user based on ID
 * @param id Id of the user
 * @returns
 */
export const deleteUser = async (id: string): Promise<any> =>
  await authDelete(`${NEST_URI}/user/${id}`)
