import { getAsyncItem } from './async-storage.service'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const authFetch = async (url: string): Promise<Response> => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).then((res) => res.json())
}

export const authRequest = async (
  url: string,
  body: any,
  method: HttpMethod,
) => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method,
    body,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).then((res) => res.json())
}

export const authFetchAdmin = async (url: string): Promise<Response> => {
  const spotifyAccessToken = await getAsyncItem('access_token')
  const JWT = await getAsyncItem('admin_token')

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
  const spotifyAccessToken = await getAsyncItem('access_token')
  const JWT = await getAsyncItem('admin_token')

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
