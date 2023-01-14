import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('genre')
export class Genre {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    tagName: string

    @CreateDateColumn({ type: 'datetime' })
    created_at?: Date = new Date(Date.now())
}
