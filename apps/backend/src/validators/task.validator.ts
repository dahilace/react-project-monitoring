const { z } = require('zod')

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1),
  priority: z.enum(['standart', 'high', 'low']),
  status: z.enum(['appointed', 'started', 'ended', 'declined']),
  responsibleId: z.number().int()
})

module.exports = {
  createTaskSchema
}