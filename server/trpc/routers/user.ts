/* eslint-disable space-before-function-paren */
import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session.user!.email!

    let me = await ctx.prisma.user.findUnique({
      where: { email },
      include: { sites: { include: { siteVotes: true } } }
    })

    if (!me) {
      await ctx.prisma.user.create({ data: { email } })
      me = await ctx.prisma.user.findUnique({
        where: { email },
        include: { sites: { include: { siteVotes: true } } }
      })
    }

    return me
  })
})
