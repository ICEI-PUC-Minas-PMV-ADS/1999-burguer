import { PrismaClient } from '@prisma/client'

const database: PrismaClient = new PrismaClient()

console.log('#### BANCO CONECTADO ####')

export { database }
