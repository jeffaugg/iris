import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main () {
  await prisma.cores.createMany({
    data: [
      { codigo: '#FF0000' },
      { codigo: '#FF7F00' },
      { codigo: '#FFFF00' },
      { codigo: '#00FF00' },
      { codigo: '#0000FF' },
      { codigo: '#4B0082' },
      { codigo: '#8B00FF' }
    ],
    skipDuplicates: true
  })

  await prisma.usuario.create(
    {
      data: {
        nome: 'Joe Doe',
        email: 'joe.doe@example.com',
        senha: await hash('senha_secreta', 10)
      }
    }
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prisma.$disconnect()
  })
