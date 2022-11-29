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
//  {"authentication": {"accessToken": "BQCCMkJWHzNWV822uojUyHGkJW2cSFO8KYwdH5T0Weo_FRaz-dbjST8ej7yTVzziBUdPCLe4WM9bbocWnXebHd6q4H1bzDlCmjjZhd8YZlqI5682Nnlb6ihqbNRwAwer5vMO78DKluYiSBghbZsFy34m31DBAtlJVzXX7sSpiynFRGUlGdBQwsUtSVNToaHKtaKpkymFmV_j1KG1Sg", "expiresIn": "3600", "idToken": undefined, "issuedAt": 1669721352, "refreshToken": undefined, "scope": undefined, "state": "2apNZzoKuo", "tokenType": "Bearer"}, "error": null, "errorCode": null, "params": {"access_token": "BQCCMkJWHzNWV822uojUyHGkJW2cSFO8KYwdH5T0Weo_FRaz-dbjST8ej7yTVzziBUdPCLe4WM9bbocWnXebHd6q4H1bzDlCmjjZhd8YZlqI5682Nnlb6ihqbNRwAwer5vMO78DKluYiSBghbZsFy34m31DBAtlJVzXX7sSpiynFRGUlGdBQwsUtSVNToaHKtaKpkymFmV_j1KG1Sg", "exp://192.168.178.45:19000/": "", "expires_in": "3600", "state": "2apNZzoKuo", "token_type": "Bearer"}, "type": "success", "url": "exp://192.168.178.45:19000/#access_token=BQCCMkJWHzNWV822uojUyHGkJW2cSFO8KYwdH5T0Weo_FRaz-dbjST8ej7yTVzziBUdPCLe4WM9bbocWnXebHd6q4H1bzDlCmjjZhd8YZlqI5682Nnlb6ihqbNRwAwer5vMO78DKluYiSBghbZsFy34m31DBAtlJVzXX7sSpiynFRGUlGdBQwsUtSVNToaHKtaKpkymFmV_j1KG1Sg&token_type=Bearer&expires_in=3600&state=2apNZzoKuo"}

export const getUserPlaylist = (
  token: string,
  setIsLoggedIn: Dispatch<SetStateAction<Boolean>>,
  removeCookie: any,
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
      setPlaylistItems(response.data.items)
    })
    .catch((error) => {
      console.log('error', error)
      removeCookie('loginCookie')
      setIsLoggedIn(false)
    })
}
