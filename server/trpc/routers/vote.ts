/* eslint-disable arrow-parens */
/* eslint-disable space-before-function-paren */
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { protectedProcedure, router } from '../trpc'

export const voteRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const voteTypes = await ctx.prisma.voteType.findMany()

    return voteTypes.map((x) => ({ ...x, voted: false }))
  }),
  vote: protectedProcedure
    .input(
      z.object({
        siteId: z.number(),
        voteTypeId: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.session.user!.email!

      const user = await ctx.prisma.user.findUnique({ where: { email } })

      if (user === null) {
        throw new TRPCError({
          message: 'User does not exist',
          code: 'UNAUTHORIZED'
        })
      }

      const site = await ctx.prisma.site.findUnique({
        include: { user: true, siteVotes: { where: { userId: user.id } } },
        where: { id: input.siteId }
      })

      if (site === null) {
        throw new TRPCError({
          message: 'Site does not exist',
          code: 'BAD_REQUEST'
        })
      }

      // if (site.user.email === email) {
      //   throw new TRPCError({
      //     message: 'This user cannot vote on this site',
      //     code: 'UNAUTHORIZED'
      //   })
      // }

      const existingVote = site?.siteVotes.find(
        (x) => x.voteTypeId === input.voteTypeId
      )

      if (existingVote) {
        await ctx.prisma.siteVote.delete({
          where: {
            id: existingVote.id
          }
        })
      } else {
        await ctx.prisma.siteVote.create({
          data: {
            userId: user.id,
            voteTypeId: input.voteTypeId,
            siteId: input.siteId
          }
        })
      }
    })
})
