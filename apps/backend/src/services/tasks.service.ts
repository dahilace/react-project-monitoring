const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllTasks = async () => {
  return prisma.task.findMany({
    include: {
      creator: true,
      responsible: true,
    },
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