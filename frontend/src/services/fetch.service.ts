import { getAsyncItem } from './async-storage.service'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const authFetch = async (url: string): Promise<Response> => {
  const accessToken = await getAsyncItem('access_token')
  console.log('Bearer ', accessToken)
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
  const accessToken = await getAsyncItem('access_token')

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
