export type TaskPriority = 'standart' | 'high' | 'low'
export type TaskStatus = 'appointed' | 'started' | 'ended' | 'declined'

export interface ITask {
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