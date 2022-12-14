import { getAsyncItem } from './async-storage.service'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const authFetch = async (url: string): Promise<Response> => {
  const accessToken = await getAsyncItem('spotify_access_token')

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .catch(console.error)
}

export const authRequest = async (
  url: string,
  method: HttpMethod,
  body?: any,
) => {
  const accessToken = await getAsyncItem('spotify_access_token')

  return await fetch(url, {
    method,
    body,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => res.json())
    .catch(console.error)
}

export const authDelete = async (url: string) => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).catch(console.error)
}

export const authFetchAdmin = async (url: string): Promise<Response> => {
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
  }).then((res) => res.json())
}

export const authRequestAdmin = async (
  url: string,
  body: any,
  method: HttpMethod,
) => {
  const spotifyAccessToken = await getAsyncItem('spotify_access_token')
  const JWT = await getAsyncItem('jwt_access_token')

  return await fetch(url, {
    method,
    body,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + JWT,
      spotifyToken: 'Bearer ' + spotifyAccessToken,
    },
  }).then((res) => res.json())
}
