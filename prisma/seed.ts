/* eslint-disable space-before-function-paren */
import { PrismaClient, VoteType } from '@prisma/client'
const prisma = new PrismaClient()
const voteTypes: VoteType[] = [
  {
    id: 1,
    name: 'Great UI 🌟',
    icon: ''
  },
  {
    id: 2,
    name: 'Blazing Fast 🔥',
    icon: ''
  },
  {
    id: 3,
    name: 'Clean Code 💻',
    icon: ''
  }
]
async function main() {
  for (let index = 0; index < voteTypes.length; index++) {
    const voteType = voteTypes[index]

    await prisma.voteType.upsert({
      where: { id: voteType.id },
      update: {},
      create: {
        id: voteType.id,
        name: voteType.name,
        icon: voteType.icon
      }
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
