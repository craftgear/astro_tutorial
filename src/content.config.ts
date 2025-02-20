import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { feedLoader } from '@ascorbic/feed-loader'
import { wikipediaLoader } from '@loaders/wikipedia'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/../blog_examples' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    heroImage: z.string(),
  }),
})

const news = defineCollection({
  loader: feedLoader({
    url: 'https://news.yahoo.co.jp/rss/categories/domestic.xml',
  }),

  schema: z.object({
    title: z.string(),

    pubdate: z.coerce.date(),

    link: z.string(),
  }),
})

const wikipedia = defineCollection({
  loader: wikipediaLoader(),
})

export const collections = { posts, news, wikipedia }
