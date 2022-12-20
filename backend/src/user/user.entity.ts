import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ default: false })
  isBoarded: boolean

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date = new Date(Date.now())
}
