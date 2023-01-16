import { NEST_URI } from '@env'
import { getAsyncItem } from './async-storage.service'

export const getAuthInfo = async (): Promise<any> => {
  const spotifyAccessToken = await getAsyncItem('spotify_access_token')

  return await fetch(`${NEST_URI}/auth`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      spotifyToken: 'Bearer ' + spotifyAccessToken,
    },
  })
    .then((res) => res.json())
    .catch(console.error)
}