import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { feedLoader } from '@ascorbic/feed-loader'
import { authorFeedLoader } from '@ascorbic/bluesky-loader'
import { wikipediaLoader } from '@loaders/wikipedia'
import { githubLoader } from '@loaders/github'

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

const timeline = defineCollection({
  loader: authorFeedLoader({
    identifier: 'bsky.app',
    limit: 20,
  }),
})

const wikipedia = defineCollection({
  loader: wikipediaLoader(),
})

const github = defineCollection({
  loader: githubLoader(),
})

export const collections = { posts, news, timeline, wikipedia, github }
