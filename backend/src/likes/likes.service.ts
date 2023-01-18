import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Like} from './like.entity';
import {HttpService} from '@nestjs/axios';
import {LikeDTO, likeDTOMapper} from "./likeDTO/LikeDTO";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@Injectable()
export class LikesService {
    private readonly headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
    };

    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        private readonly httpService: HttpService,
        private readonly userService: UserService,
    ) {
    }

    async findAll(): Promise<Like[]> {
        return this.likeRepository.find();
    }

    async add(like: LikeDTO, token: string, userId: string) {
        this.headers.Authorization = `Bearer ${token}`;
        const {artists} = await this.findSongInApi(like.id);
        const genres = (await Promise.all(artists.map(({id}) => this.findGenresByArtist(id, this.headers)))).flatMap(({genres}) => genres);
        const userById: User = await this.userService.findUserById(userId.split(':')[1]);
        const like2: Like = likeDTOMapper(like, genres[0], userById);
        return await this.likeRepository.save(like2);
    }

    async findGenresByArtist(artistId: string, headers: any) {
        const {data} = await this.httpService.get<any>(`https://api.spotify.com/v1/artists/${artistId}`, {headers}).toPromise();
        return data;
    }

    async findSongInApi(songId: string) {
        const {data} = await this.httpService.get<any>(`https://api.spotify.com/v1/tracks/${songId}`, {headers: this.headers}).toPromise();
        return data;
    }
}
