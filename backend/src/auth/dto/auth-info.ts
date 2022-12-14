import { Role } from 'src/user/user.entity'

export interface authInfo {
  JWT: string
  role: Role
}
