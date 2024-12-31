import type { Loader } from 'astro/loaders'
import { z } from 'astro:content'

import { yesterdayYMD } from '@utils/date'

type Mostread = {
  pageid: number
  timestamp: string
}

export const wikipediaLoader = (): Loader => ({
  name: 'wikipedia',
  load: async ({ store, generateDigest }) => {
    const [y, mm, dd] = yesterdayYMD()
    const res = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/ja/featured/${y}/${mm}/${dd}`,
    )
    const json = await res.json()

    store.clear()

    json.mostread.articles.forEach((x: Mostread) => {
      store.set({
        id: `${x.pageid}`,
        data: x,
        digest: generateDigest(x.timestamp),
      })
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
    description: z.string().optional(),
    content_urls: z.object({
      desktop: z.object({
        page: z.string(),
      }),
    }),
    extract: z.string(),
  }),
})
