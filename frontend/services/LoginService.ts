import axios from "axios";
import {NEST_URI} from "@env";


export const registerUser = (token: string) => {

    return axios.post(
        NEST_URI + "addUser", {}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        })
}
