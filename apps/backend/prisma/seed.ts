import { PrismaClient, UserRole } from '@prisma/client'
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
  }

  const manager1 = await prisma.user.create({
    data: {
      name: 'Manager',
      surname: 'One',
      login: 'manager1',
      password: await hashPassword('123'),
      role: UserRole.manager,
    },
  })

  const worker11 = await prisma.user.create({
    data: {
      name: 'Worker',
      surname: 'One',
      login: 'worker1',
      password: await hashPassword('123'),
      role: UserRole.worker,
      managerId: manager1.id,
    },
  })

  const worker12 = await prisma.user.create({
    data: {
      name: 'Worker',
      surname: 'Two',
      login: 'worker2',
      password: await hashPassword('123'),
      role: UserRole.worker,
      managerId: manager1.id,
    },
  })

  const manager2 = await prisma.user.create({
    data: {
      name: 'Manager',
      surname: 'Two',
      login: 'manager2',
      password: await hashPassword('123'),
      role: UserRole.manager,
    },
  })

  const worker21 = await prisma.user.create({
    data: {
      name: 'Worker',
      surname: 'Three',
      login: 'worker3',
      password: await hashPassword('123'),
      role: UserRole.worker,
      managerId: manager2.id,
    },
  })

  console.log({ manager1, worker11, worker12, manager2, worker21 })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())