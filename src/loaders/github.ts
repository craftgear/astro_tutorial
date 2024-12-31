import type { Loader } from 'astro/loaders'
import { z } from 'astro:content'

import { Octokit } from '@octokit/rest'

export const githubLoader = (): Loader => ({
  name: 'github',
  load: async ({ store, generateDigest }) => {
    const api = new Octokit()
    const res = await api.rest.repos.listForUser({
      username: 'TanStack',
    })

    const json = res.data

    store.clear()

    json.forEach((x) => {
      store.set({
        id: `${x.id}`,
        data: x,
        digest: generateDigest(`${x.updated_at}`),
      })
    })
  },
  schema: z.object({
    id: z.number(),
    node_id: z.string(),
    name: z.string(),
    full_name: z.string(),
    private: z.boolean(),
    owner: z.object({
      id: z.number(),
      node_id: z.string(),
      avatar_url: z.string(),
    }),
    html_url: z.string(),
    description: z.string(),
    stargazers_count: z.number(),
    watchers_count: z.number(),
    language: z.string(),
    updated_at: z.coerce.date(),
  }),
})
