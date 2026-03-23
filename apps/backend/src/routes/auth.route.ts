const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/login', authController.login)

router.get('/me', authMiddleware, async (req, res) => {
  const userId = req.user.userId

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      login: true,
      role: true
    }
  })

  res.json(user)
})


module.exports = router