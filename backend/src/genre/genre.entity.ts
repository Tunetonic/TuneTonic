import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  @Column()
  id: number

  @Column()
  name: string
}
