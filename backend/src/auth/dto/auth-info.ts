import { Role } from '../../enums/role.enum'

export interface authInfo {
  JWT: string
  role: Role
}
