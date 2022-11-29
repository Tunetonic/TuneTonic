import { getAsyncItem } from './async-storage.service'

export const authFetch = async (url: string) => {
  const accessToken = await getAsyncItem('access_token')

  return await fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  })
}
