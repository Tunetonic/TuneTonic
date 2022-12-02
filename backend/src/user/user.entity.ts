import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {

  @PrimaryColumn()
  id: string

  @Column({default: false})
  isBoarded: boolean

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at?: Date;
}
