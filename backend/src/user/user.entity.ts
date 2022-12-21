import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

import { Role } from 'src/enums/role.enum'

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
