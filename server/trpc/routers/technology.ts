/* eslint-disable space-before-function-paren */
import { protectedProcedure, router } from '../trpc'

export const technologyRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const technologies = await ctx.prisma.technology.findMany()

    return technologies
  })
})
