import { NEST_URI } from '@env'
import { authFetch } from './fetch.service'

/**
 * Returns the data of the artist based on the artist id
 * @returns
 */
export const getArtist = async (id: string): Promise<any> => {
    return await authFetch(`${NEST_URI}/spotify/artist/${id}`)
}