import { NEST_URI } from "@env";
import axios, {AxiosResponse} from "axios";
import {SetStateAction} from "react";
import { User } from "../types/user";

export const getUserInformation = (token: string, setIsSignedIn: (arg0: boolean) => void, removeCookie: any, setUser: (arg0: User) => void) => {
    axios.get(
        "http://192.168.1.105:3000/userProfile/userInformations", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response: AxiosResponse<User>) => {
            setUser(response.data);
        })
        .catch((error: { message: any; }) => {
            console.log("error:getUserInformations", error.message);
            removeCookie('loginCookie');
            setIsSignedIn(false);
        });
}

export const getUserPlaylist = (token: string, setIsSignedIn: (arg0: boolean) => void, removeCookie: any, setPlaylistItems: { (value: SetStateAction<any[]>): void; (arg0: any): void; }) => {
    axios.get(`http://192.168.1.105:3000/userProfile`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    }).then((response) => {
        setPlaylistItems(response.data.items);
    })
        .catch((error) => {
            console.log("error", error);
            removeCookie('loginCookie');
            setIsSignedIn(false);
        });

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


}
