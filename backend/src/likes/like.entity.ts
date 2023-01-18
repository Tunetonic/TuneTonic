
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    spotifyId: string;

    @Column()
    genres: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

}
