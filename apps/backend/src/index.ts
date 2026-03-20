require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const port = 3001,
  app = express()

app.use(cors())
app.use(express.json())

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