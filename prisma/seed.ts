/* eslint-disable space-before-function-paren */
import { PrismaClient, Technology, VoteType } from '@prisma/client'
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

const technologies: Technology[] = [
  {
    id: 1,
    name: 'Vue',
    icon: ''
  },
  {
    id: 2,
    name: 'React',
    icon: ''
  },
  {
    id: 3,
    name: 'Angular',
    icon: ''
  },
  {
    id: 4,
    name: 'SolidJS',
    icon: ''
  },
  {
    id: 5,
    name: 'Javascript',
    icon: ''
  },
  {
    id: 6,
    name: 'Typescript',
    icon: ''
  },
  {
    id: 7,
    name: 'PrismaORM',
    icon: ''
  },
  {
    id: 8,
    name: 'TailwindCSS',
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

  for (let index = 0; index < technologies.length; index++) {
    const technology = technologies[index]

    await prisma.technology.upsert({
      where: { id: technology.id },
      update: {},
      create: {
        id: technology.id,
        name: technology.name,
        icon: technology.icon
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
    // process.exit(1)
  })
