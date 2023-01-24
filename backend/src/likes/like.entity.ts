
import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";
import {Genre} from "../genres/entities/genre.entity";

@Entity('sentiment')
export class Like {
    // @PrimaryGeneratedColumn()
    // id: string;

    @PrimaryColumn()
    spotifyId: string;

    @ManyToMany(() => Genre, genre => genre.likes, {cascade:["insert","update"], eager: true}, )
    @JoinTable()
    genres: Genre[];

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}
