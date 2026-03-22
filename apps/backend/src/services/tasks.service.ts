const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getTasks = async (user) => {
  if (user.role === 'manager') {
    return prisma.task.findMany()
  }
  return prisma.task.findMany({
    where: {
      OR: [
        { creatorId: user.userId },
        { responsibleId: user.userId }
      ]
    }
  })
}

exports.createTask = async (data, user) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      responsibleId: data.responsibleId,
      dateOfEnd: data.dateOfEnd || null,

      creatorId: user.userId,
    },
  })
}