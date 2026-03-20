const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllTasks = async () => {
  return prisma.task.findMany()
}

exports.createTask = async (data) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      creatorId: data.creatorId,
      responsibleId: data.responsibleId,
    },
  })
}