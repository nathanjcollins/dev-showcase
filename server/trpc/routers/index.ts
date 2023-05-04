import { router } from '../trpc'
import { siteRouter } from './site'
import { userRouter } from './user'
import { voteRouter } from './vote'

export const appRouter = router({
  userRouter,
  siteRouter,
  voteRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
