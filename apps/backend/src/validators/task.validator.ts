const { z } = require('zod')

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1),
  priority: z.enum(['standart', 'high', 'low']),
  status: z.enum(['appointed', 'started', 'ended', 'declined']),
  responsibleId: z.number().int(),
  dateOfEnd: z.string().datetime().optional().nullable(),

})

const updateTaskSchema = z.object({
  status: z.enum(['appointed', 'started', 'ended', 'declined']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['standart', 'low', 'high']).optional(),
  responsibleId: z.number().optional(),
  dateOfEnd: z.string().datetime().optional().nullable(),
})

module.exports = {
  createTaskSchema, updateTaskSchema
}