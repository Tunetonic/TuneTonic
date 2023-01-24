import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'
import {Like} from "../../likes/like.entity";

@Entity('genre')
export class Genre {

    @PrimaryColumn()
    tagName: string;

    @CreateDateColumn({type: 'datetime'})
    created_at?: Date = new Date(Date.now());

    @ManyToMany(() => Like, like => like.genres)
    likes: Like;
}
