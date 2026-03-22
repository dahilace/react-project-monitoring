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

exports.updateTask = async (taskId, data, user) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  })

  if (!task) {
    throw new Error('Task not found')
  }

  const isCreator = task.creatorId === user.userId
  const isResponsible = task.responsibleId === user.userId
  const isAdmin = user.role === 'admin'

  if (!isCreator && !isResponsible && !isAdmin) {
    throw new Error('Forbidden')
  }

  if (isAdmin) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        ...data,
        dateOfUpdate: new Date()
      }
    })
  }

  if (isCreator) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title ?? task.title,
        description: data.description ?? task.description,
        priority: data.priority ?? task.priority,
        status: data.status ?? task.status,
        responsibleId: data.responsibleId ?? task.responsibleId,
        dateOfEnd: data.dateOfEnd ?? task.dateOfEnd,
        dateOfUpdate: new Date()
      }
    })
  }

  if (isResponsible) {
    if (!data.status) {
      throw new Error('Only status can be updated')
    }

    return prisma.task.update({
      where: { id: taskId },
      data: {
        status: data.status,
        dateOfUpdate: new Date()
      }
    })
  }

  throw new Error('Forbidden')
}