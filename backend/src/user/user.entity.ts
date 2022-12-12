import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ default: false })
  isBoarded: boolean

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date
}
