import { User } from '../user.entity'

export type UpdateUserDTO = Partial<Omit<User, 'id'>>
