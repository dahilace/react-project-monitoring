require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const port = 3001,
  app = express()

app.use(cors())
app.use(express.json())

const taskRoutes = require('./routes/tasks.route'),
  userRoutes = require('./routes/user.route')

app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
  } catch (e) {
    res.status(500).json({ status: 'error' })
  }
})

app.get('/', (req, res) => {
  res.send('Hello user!')
  console.log('Hello from user!')
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

// app.get('/debug/users', async (req, res) => {
//   const users = await prisma.user.findMany()
//   res.json(users)
// })

// app.get('/debug/create-user', async (req, res) => {
//   const user = await prisma.user.create({
//     data: {
//       name: "John",
//       surname: null,
//       fatherName: null,
//       login: "john",
//       password: "123",
//       managerId: null,
//       role: "worker"
//     }
//   })

//   res.json(user)
// })
