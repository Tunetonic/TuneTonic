import { getAsyncItem } from './async-storage.service'

export const authFetch = async (url: string): Promise<any> => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}

export const authPost = async(url: string, body: any) => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method: 'POST',
    body,
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}