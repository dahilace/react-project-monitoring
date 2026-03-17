const express = require('express')
const cors = require('cors')
const port = 3001

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ staus: 200 })
})

app.get('/', (req, res) => {
  res.send('Hello user!')
  console.log('Hello from user!')
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})