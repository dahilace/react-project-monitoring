const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

exports.getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      manager: true,
      workers: true
    }
  })
}

exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname || null,
      fatherName: data.fatherName || null,
      login: data.login,
      password: hashedPassword, 
      role: data.role,
      managerId: data.managerId || null
    }
  })
}