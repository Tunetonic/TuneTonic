import { NEST_URI } from '@env'
import { authFetch, authDelete } from './fetch.service'

/**
 * Returns the data of the artist based on the artist id
 * @returns
 */
export const getArtist = async (id: string): Promise<any> => {
    return await authFetch(`${NEST_URI}/spotify/artist/${id}`)
}

/**
 * Unfollows the artist of the user based on the artist id
 * @returns
 */
export const unfollowArtist = async (id: string): Promise<any> => {
    return await authDelete(`${NEST_URI}/spotify/artist/${id}`)
}