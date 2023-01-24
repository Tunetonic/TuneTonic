import { getAsyncItem } from './async-storage.service'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const authFetch = async (url: string): Promise<Response> => {
  const spotifyAccessToken = await getAsyncItem('spotify_access_token')
  const JWT = await getAsyncItem('jwt_access_token')
  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + JWT,
      spotifyToken: 'Bearer ' + spotifyAccessToken,
    },
  })
    .then((res) => res.json())
    .catch(console.error)
}

export const authRequest = async (
  url: string,
  body: Object,
  method: HttpMethod,
) => {
  const spotifyAccessToken = await getAsyncItem('spotify_access_token')
  const JWT = await getAsyncItem('jwt_access_token')

  return await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + JWT,
      spotifyToken: 'Bearer ' + spotifyAccessToken,
    },
  })
    .then((res) => res.json())
    .catch(console.error)
}

export const authDelete = async (url: string) => {
  const spotifyAccessToken = await getAsyncItem('spotify_access_token')
  const JWT = await getAsyncItem('jwt_access_token')

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + JWT,
      spotifyToken: 'Bearer ' + spotifyAccessToken,
    },
  }).catch(console.error)
}
