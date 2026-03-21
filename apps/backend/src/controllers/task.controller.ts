import { error } from "node:console"

const taskService = require('../services/tasks.service')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks()
    res.json(tasks)
  } catch (e) {
    console.error(e)
    res.staus(500).json({ error: 'Failed to fetch' })
  }
}

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body)
    res.json(task)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}