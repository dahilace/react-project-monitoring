export type UserRole = 'worker' | 'manager' | 'admin'

export interface IUser {
  id: number
  name: string
  surname?: string
  fatherName?: string
  login: string
  manager?: string
  role: UserRole
  workers: IUser[]
}