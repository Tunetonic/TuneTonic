import axios from "axios";
import { NEST_URI } from '@env'

import {getAsyncItem} from "./async-storage.service";


export const    addLike = async (id: string | undefined, like: any) => {
    // todo token authorization

    const accessToken = await getAsyncItem('access_token')

    axios.post('${NEST_URI}/likes/:' + id, like, {
        headers: {
            'Authorization':  accessToken
        }
    }).then(r => console.log(r.data))
}
