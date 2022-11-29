import { removeAsyncItem } from './async-storage.service'
import { NEST_URI } from '@env'
import axios, { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export const getUserInformation = async (token: string) => {
  return await axios.get('https://api.spotify.com/v1/me', {
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
