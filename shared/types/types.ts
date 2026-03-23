type UserRole = 'worker' | 'manager'
type TaskPriority = 'standart' | 'high' | 'low'
type TaskStatus = 'appointed' | 'started' | 'ended' | 'declined'


export interface IUser {
  id?: number
  name: string
  surname: string | null
  fatherName: string | null
  login: string
  password: string
  manager: string | null
  role: UserRole
}

export interface ITask {
  id?: number
  title: string
  description: string
  dateOfEnd: Date | null
  dateOfCreation: Date
  dateOfUpdate: Date | null
  priority: TaskPriority
  status: TaskStatus
  creator: string
  responsible: string
}