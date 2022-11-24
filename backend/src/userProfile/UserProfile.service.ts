import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import { map } from 'rxjs/operators';



@Injectable()
export class UserProfileService {

    constructor(private readonly httpService: HttpService) {
    }

    async userPLaylists(token: string): Promise<any> {

        // return new Promise((resolve, reject) => {
        //     this.httpService.get(
        //         "https://api.spotify.com/v1/me/playlists", {
        //             headers: {
        //                 Accept: "application/json",
        //                 "Content-Type": "application/json",
        //                 Authorization: token,
        //             }
        //         }
        //         ).subscribe((response) => {
        //             console.log(response + " de response");
        //          resolve(response);
        //     }, error => {
        //             console.log(error.response.data + ' de err')
        //             reject(error.response.data)}
        //     );
        // })


        return await firstValueFrom(
    this.httpService.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        }
    }).pipe(
        map(response => response),
        catchError((error) => {
            console.log(error.response.data);
            throw error.response.data;
        }),
    ),
)
    }
}
