import { router } from '../trpc'
import { siteRouter } from './site'
import { userRouter } from './user'
import { voteRouter } from './vote'
import { technologyRouter } from './technology'

export const appRouter = router({
  userRouter,
  siteRouter,
  voteRouter,
  technologyRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
