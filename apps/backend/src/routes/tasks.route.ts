const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task.controller'),
  authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, taskController.getTasks)
router.post('/', taskController.createTask)

module.exports = router