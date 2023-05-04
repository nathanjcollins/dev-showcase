/* eslint-disable space-before-function-paren */
import { protectedProcedure, router } from '../trpc'

export const voteRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.voteType.findMany()
  })
})
