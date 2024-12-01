import type { Loader } from 'astro/loaders'
import { z } from 'astro:content'

import { yesterdayString } from '@utils/day'

type Mostread = {
  pageid: number
}

export const wikipediaLoader = (): Loader => ({
  name: 'wikipedia',
  load: async (context) => {
    const [y, mm, dd] = yesterdayString()
    const res = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/ja/featured/${y}/${mm}/${dd}`,
    )
    const json = await res.json()

    context.store.clear()

    json.mostread.articles.forEach((x: Mostread) => {
      context.store.set({ id: `${x.pageid}`, data: x })
    })
  },
  schema: z.object({
    views: z.number(),
    rank: z.number(),
    type: z.string(),
    titles: z.object({
      canonical: z.string(),
      display: z.string(),
    }),
    thumbnail: z
      .object({
        source: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    description: z.string(),
    content_urls: z.object({
      desktop: z.object({
        page: z.string(),
      }),
    }),
    extract: z.string(),
  }),
})
