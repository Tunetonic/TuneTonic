import { NEST_URI } from '@env'
import axios, { AxiosResponse } from 'axios'
import { SetStateAction } from 'react'
import { DatabaseUser } from '../interfaces/db-user'
import { authPost } from './fetch.service'

export const getUserInformation = async (token: string): Promise<AxiosResponse<any, any>> => {
  return await axios.get(`${NEST_URI}/user`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
}

export const getUserProfile = (
  token: string,
  setPlaylistItems: { (value: SetStateAction<any[]>): void; (arg0: any): void },
) => {
  // axios.get(
  //     "https://api.spotify.com/v1/me/playlists", {
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //         },
  //     }).then((response) => {
  //         setPlaylistItems(response.data.items);
  //     })
  //     .catch((error: { message: any; }) => {
  //         console.log("error:getUserPlaylist", error.message);
  //         removeCookie('loginCookie');
  //         setIsSignedIn(false);
  //     });

  // useEffect(() => {
  //     if (cookies.loginCookie !== '') {
  //         axios.get(
  //             "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
  //                 headers: {
  //                     Accept: "application/json",
  //                     "Content-Type": "application/json",
  //                     Authorization: "Bearer " + cookies.loginCookie,
  //                 },
  //             }).then((response: any) => {
  //             // console.log(response)
  //         })
  //             .catch((error: { message: any; }) => {
  //                 console.log("error", error.message);
  //                 removeCookie('loginCookie');
  //             });
  //     }
  // }, [])

  axios
    .get(`${NEST_URI}/userProfile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => {
      console.log(response, 'res')
      setPlaylistItems(response.data.items)
    })
    .catch((error) => {
      console.error(error, 'error of userprofile')
      // removeAsyncItem('access_token')
    })
}

export const saveUser = (userBody: DatabaseUser) => {
  const postUrl = `${NEST_URI}/user`
  authPost(postUrl, userBody)
}