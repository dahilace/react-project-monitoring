const taskService = require('../services/tasks.service')
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validator')

exports.getTasks = async (req, res) => {
  try {
    const user = req.user

    const tasks = await taskService.getTasks(user)

    res.json(tasks)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Failed to fetch tasks',
      message: e.message
    })
  }
}

exports.createTask = async (req, res) => {
  try {
    console.log(req.user) //dev
    const parsedZ = createTaskSchema.parse(req.body)
    const task = await taskService.createTask(parsedZ, req.user)

    res.status(201).json(task)
  } catch (e) {
    console.error(e) // dev
    if (e.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation error',
        details: e.errors
      })
    }

    res.status(500).json({
      error: 'Failed to create task',
      message: e.message
    })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id)

    const parsed = updateTaskSchema.parse(req.body)

    const updatedTask = await taskService.updateTask(
      taskId,
      parsed,
      req.user
    )

    res.json(updatedTask)
  } catch (e) {
    console.error(e)

    if (e.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation error',
        details: e.errors
      })
    }

    if (e.message === 'Forbidden') {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.status(500).json({
      error: 'Failed to update task',
      message: e.message
    })
  }
}