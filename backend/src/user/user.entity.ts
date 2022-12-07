import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ default: false })
  isBoarded: boolean

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date
}
