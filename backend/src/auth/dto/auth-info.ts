import { Role } from 'src/enums/role.enum'

export interface authInfo {
  JWT: string
  role: Role
}
