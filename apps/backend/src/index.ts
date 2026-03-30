require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

const taskRoutes = require('./routes/tasks.route'),
  userRoutes = require('./routes/user.route'),
  authRoutes = require('./routes/auth.route')

app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

