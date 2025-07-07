import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main () {
  await prisma.cores.createMany({
    data: [
      { codigo: '#FF5733' },
      { codigo: '#33FF57' },
      { codigo: '#3357FF' },
      { codigo: '#F0F0F0' },
      { codigo: '#000000' },
      { codigo: '#FFFFFF' }
    ],
    skipDuplicates: true
  })

  await prisma.usuario.createMany(
    {
      data: [
        {
          nome: 'Joe Doe',
          email: 'joe.doe@example.com',
          senha: await hash('senha_secreta', 10)
        }
      ],
      skipDuplicates: true
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
