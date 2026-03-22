require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET

exports.login = async (login, password) => {
  const user = await prisma.user.findUnique({
    where: { login }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  return { token }
}