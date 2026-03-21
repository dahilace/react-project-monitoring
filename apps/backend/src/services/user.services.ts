const { PrismaClient } = require('@prisma/client')
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
  return prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname || null,
      fatherName: data.fatherName || null,
      login: data.login,
      password: data.password,
      role: data.role,
      managerId: data.managerId || null
    }
  })
}