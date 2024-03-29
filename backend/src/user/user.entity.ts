import { Genre } from 'src/genres/entities/genre.entity'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

import { Role } from '../enums/role.enum'

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string

  @Column({ default: false })
  isBoarded: boolean

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date = new Date(Date.now())
}
