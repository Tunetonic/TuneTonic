import axios from "axios";
import {NEST_URI} from '@env'

import {getAsyncItem, setAsyncItem} from "./async-storage.service";
import {deleteItemAsync} from "expo-secure-store";


type LikeDislike = {
    tagName: string,
    count: number
}


export const addLike = async (id: string | undefined, like: any) => {
    const likeDislike: string | null = await getAsyncItem('likeDislike');
    if (!likeDislike) {
        await setAsyncItem('likeDislike', JSON.stringify([]));
    }
    const parsedLikeDislike: LikeDislike[] = JSON.parse(likeDislike || "[]");
    const accessToken = await getAsyncItem('spotify_access_token');
    axios.post(`${NEST_URI}/likes/like/:${id}`, like, {
        headers: {
            Authorization: accessToken
        }
    }).then(async res => {
        const genres = res.data.data;
        genres.forEach(genre => {
            const existingGenre = parsedLikeDislike.find(likeDislikeGenre => likeDislikeGenre.tagName === genre);
            if (!existingGenre) {
                parsedLikeDislike.push({tagName: genre, count: 1});
            } else {
                existingGenre.count++;
            }
        });
        await setAsyncItem('likeDislike', JSON.stringify(parsedLikeDislike));
        console.log(await getAsyncItem('likeDislike'));
        // await deleteItemAsync('likeDislike');
    });
}

export const dislike = async (id: string | undefined, like: any) => {
    const accessToken = await getAsyncItem('spotify_access_token');

    const likeDislike: string | null  = await getAsyncItem('likeDislike');

    const parsedLikeDislike: LikeDislike[] = JSON.parse(likeDislike || "[]");

    axios.post('${NEST_URI}/likes/dislike', like, {
        headers: {
            Authorization: accessToken
        }}).then(async res => {

        res.data.data.forEach(genre => {
            const existingGenre = parsedLikeDislike.find(likeDislikeGenre => likeDislikeGenre.tagName === genre);
            if (!existingGenre) {
                parsedLikeDislike.push({tagName: genre, count: -1});
            } else {
                existingGenre.count--;
            }
        });
        await setAsyncItem('likeDislike', JSON.stringify(parsedLikeDislike));
        console.log(await getAsyncItem('likeDislike'))
        // await deleteItemAsync('likeDislike');
    });
}

