import axios, {AxiosResponse} from "axios";
import {SetStateAction} from "react";
import {User} from "../Screens/UserProfile";

export const getUserInformations = (token: string, setIsSignedIn: (arg0: boolean) => void, removeCookie: any, setUser: (arg0: User) => void) => {
    axios.get(
        "https://api.spotify.com/v1/me", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response: AxiosResponse<User>) => {
        setUser(response.data);
    })
        .catch((error: { message: any; }) => {
            console.log("error", error.message);
            removeCookie('loginCookie');
            setIsSignedIn(false);
        });
}

export const getUserPlaylist = (token: string, setIsSignedIn: (arg0: boolean) => void, removeCookie: any, setPlaylistItems: { (value: SetStateAction<any[]>): void; (arg0: any): void; }) => {
    axios.get(
        "https://api.spotify.com/v1/me/playlists", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
        setPlaylistItems(response.data.items);
    })
        .catch((error: { message: any; }) => {
            console.log("error", error.message);
            removeCookie('loginCookie');
            setIsSignedIn(false);
        });

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

    // axios.get('http://localhost:3000/userProfile', {
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //     },}).then((response) => {
    //         console.log(response)
    //     setPlaylistItems(response.data.items);
    //     })
    //     .catch((error: { message: any; }) => {
    //         console.log("error", error.message);
    //         removeCookie('loginCookie');
    //         setIsSignedIn(false);
    //     });
}
