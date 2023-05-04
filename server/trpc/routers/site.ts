/* eslint-disable space-before-function-paren */
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const siteRouter = router({
  getNextSite: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session.user!.email!

    const nextSite = await ctx.prisma.site.findFirst({
      where: {
        NOT: { siteVotes: { some: { user: { email } } }, user: { email } }
      }
    })

    return nextSite
  }),
  createSite: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        repositoryUrl: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.session.user!.email!

      const newSite = await ctx.prisma.site.create({
        data: {
          name: input.name,
          url: input.url,
          repoUrl: input.repositoryUrl,
          user: {
            connect: {
              email
            }
          }
        }
      })

      return newSite
    }),
  updateSite: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        url: z.string(),
        repositoryUrl: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const email = ctx.session.user!.email!

      const site = await ctx.prisma.site.findFirst({
        where: { id: input.id },
        include: { user: true }
      })

      if (site?.user.email !== email) {
        throw new TRPCError({
          message: 'This user cannot change this site',
          code: 'UNAUTHORIZED'
        })
      }

      const updatedSite = await ctx.prisma.site.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          url: input.url,
          repoUrl: input.repositoryUrl
        }
      })

      return updatedSite
    }),
  mySites: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session.user!.email!

    const me = await ctx.prisma.user.findUnique({
      where: { email },
      include: { sites: true }
    })

    const sites = me?.sites

    return sites
  })
})
