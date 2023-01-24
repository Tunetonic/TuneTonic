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
 * TODO: Do we get the spotify user from spotify authentication?
 * @returns
 */
export const getSpotifyUser = async (): Promise<any> =>
  await authFetch(`${NEST_URI}/spotify`)

/**

 * Fetches all users (admin)
 * @returns
 */
export const getSpotifyUsers = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/users`)
}

/**
 * Don't we already get all this information from authenticating in spotify.
 * Do we really need to make a request?
 * @param setPlaylistItems
 */
export const getUserPlaylist = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/playlist`)
}

/**
 * Retrieves a particular spotify playlist.
 * @param id Spotify playlist ID
 */
export const getPlaylist = async (id: string): Promise<Response> => {
  return await authFetch(`${NEST_URI}/spotify/playlist/${id}`)
}

export const getPlaylistSongs = async (id: string): Promise<any> =>
  await authFetch(`${NEST_URI}/spotify/playlist/songs/${id}`)

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
  await authRequest(`${NEST_URI}/user`, userBody,'POST')

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
  await authRequest(`${NEST_URI}/user/${id}`, updateUserBody, 'PUT')

/**
 * Deletes a user based on ID
 * @param id Id of the user
 * @returns deleted user
 */
export const deleteUser = async (id: string): Promise<any> =>
  await authDelete(`${NEST_URI}/user/${id}`)

/**
 * Deletes a user based on ID (admin)
 * @param id Id of the user
 * @returns deleted user
 */
export const deleteUserById = async (id: string): Promise<any> => {
  await authDelete(`${NEST_URI}/user/${id}/admin`)
}
