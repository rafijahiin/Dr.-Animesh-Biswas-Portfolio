import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('Field Notes'),
    cover: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    language: z.enum(['en', 'bn']).default('en'),
    kind: z.enum(['Story', 'Poem', 'Reflection']).default('Story'),
    cover: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    image: z.string(),
    category: z.enum(['field', 'conferences', 'community', 'personal']),
    caption: z.string(),
    location: z.string().optional(),
    date: z.coerce.date().optional(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    venue_name: z.string(),
    venue_sub: z.string(),
    abstract: z.string(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    order: z.number().default(100),
  }),
});

const advisory = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    body: z.string(),
    bullets: z.array(z.string()).default([]),
    icon: z.enum(['heart', 'shield', 'globe', 'spark', 'pulse', 'leaf', 'compass']).default('spark'),
    order: z.number().default(100),
  }),
});

const socials = defineCollection({
  type: 'data',
  schema: z.object({
    platform: z.string(),
    url: z.string(),
    icon: z.enum(['linkedin', 'youtube', 'researchgate', 'x', 'instagram', 'github', 'email', 'globe']),
    label: z.string().default('Find me here'),
    order: z.number().default(100),
  }),
});

export const collections = { posts, stories, gallery, publications, advisory, socials };
