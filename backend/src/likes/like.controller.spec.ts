import {Test, TestingModule} from '@nestjs/testing';
import {LikesController} from './likes.controller';
import {LikesService} from './likes.service';
import {Like} from './like.entity';
import {Repository} from 'typeorm'
import {HttpModule, HttpService} from '@nestjs/axios'
import {UserService} from '../user/user.service'
import {getRepositoryToken, TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/user.entity';

describe('LikesController', () => {
    let controller: LikesController;
    let service: LikesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [LikesController],
            providers: [LikesService, UserService, {
                provide: getRepositoryToken(Like),
                useClass: Repository,
            }, {
                provide: getRepositoryToken(User),
                useClass: Repository,
            },],
        }).compile();

        controller = module.get<LikesController>(LikesController);
        service = module.get<LikesService>(LikesService);
    });

    describe('addLike', () => {
        it('should return successfully liked, and the like genres', async () => {
            const likeObj: Like = {
                spotifyId: 'testID',
                genres: [{
                    tagName: 'rock',
                    likes: {spotifyId: 'test', genres: [], users: []},
                    created_at: new Date(Date.now())
                }, {
                    tagName: 'pop',
                    likes: {spotifyId: 'test', genres: [], users: []},
                    created_at: new Date(Date.now())
                }],
                users: []
            }
            const spy = jest.spyOn(service, 'add').mockImplementation(() => Promise.resolve(likeObj));
            const res = await controller.addLike('1', {
                uri: 'string',
                type: 'string',
                track_number: 0,
                preview_url: 'string',
                name: 'string',
                image: 'string',
                artist_name: 'string',
                id: 'string',
                duration_ms: 0
            }, 'auth');
            expect(spy).toHaveBeenCalled();
            // Assert that the response has a status of 200
            // expect(r).toBe(200);
            // Assert that the response message is 'Successfully liked'
            expect(res.message).toBe('Successfully liked');
            // Assert that the spotifyId of the returned Like object is 'woo'
            expect(res.data).toEqual(['rock', 'pop']);
            // Restore the spy
            spy.mockRestore();
        });
    });



//todo
    describe('dislike', () => {
        it('should dislike', async () => {
            const spy = jest.spyOn(service, 'deleteLike').mockImplementation(() => Promise.resolve(['pop', 'hiphop']));
            const res = await controller.dislike({
                uri: 'string',
                type: 'string',
                track_number: 0,
                preview_url: 'string',
                name: 'string',
                image: 'string',
                artist_name: 'string',
                id: 'string',
                duration_ms: 0
            }, 'auth');
            expect(spy).toHaveBeenCalled();
            // Assert that the response has a status of 200
            // expect(r).toBe(200);
            // Assert that the response message is 'Successfully liked'
            expect(res.message).toBe('Successfully disliked');
            // Assert that the spotifyId of the returned Like object is 'woo'
            expect(res.data).toEqual(['pop', 'hiphop']);
            // Restore the spy
            spy.mockRestore();
        });
    });

});



