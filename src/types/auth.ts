export type UserRole = 'admin' | 'moderator' | 'user'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface LoginPayload {
  email: string
  password: string
}
