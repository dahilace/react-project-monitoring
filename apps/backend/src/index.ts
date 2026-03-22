require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const port = 3001
const app = express()

app.use(cors())
app.use(express.json())

const taskRoutes = require('./routes/tasks.route'),
  userRoutes = require('./routes/user.route'),
  authRoutes = require('./routes/auth.route')

app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
  } catch (e) {
    res.status(500).json({ status: 'error' })
  }
})

// Dev
if (process.env.NODE_ENV === 'development') {
  app.post('/debug/seed-users', async (req, res) => {
    try {
      const bcrypt = require('bcrypt')

      const password = await bcrypt.hash('123', 10)

      const users = await prisma.user.createMany({
        data: [
          {
            name: 'Manager 1',
            login: 'manager1',
            password,
            role: 'manager'
          },
          {
            name: 'Worker 1',
            login: 'worker1',
            password,
            role: 'worker'
          },
          {
            name: 'Worker 2',
            login: 'worker2',
            password,
            role: 'worker'
          }
        ]
      })
      res.json({ created: users.count })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Seed failed' })
    }
  })
}
// Dev

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
