import { NEST_URI } from '@env'
import { DatabaseUser } from '../interfaces/db-user'
import { authFetch, authRequest } from './fetch.service'

/**
 *
 * @returns Returns the current user from our Database
 */
export const getDatabaseUser = async (id: number): Promise<any> => {
  return await authFetch(`${NEST_URI}/user/${id}`)
}

/**
 * Do we get the spotify user from spotify authentication?
 * @returns
 */
export const getSpotifyUser = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify`)
}

export const getSpotifyUsers = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/users`)
}

/**
 * Don't we already get all this information from authenticating in spotify.
 * Do we really need to make an request?
 * @param setPlaylistItems
 */
export const getUserPlaylist = async (): Promise<any> => {
  return await authFetch(`${NEST_URI}/spotify/playlist`)
}

/**
 * Saves user in our database.
 * @param userBody User data to save
 * @returns
 */
export const saveUser = async (userBody: DatabaseUser): Promise<any> => {
  const postUrl = `${NEST_URI}/user`
  return await authRequest(postUrl, userBody, 'POST')
}

export const updateUser = async (
  updateUserBody: Partial<Omit<DatabaseUser, 'id'>>,
) => await authRequest(`${NEST_URI}/user`, updateUserBody, 'PUT')
