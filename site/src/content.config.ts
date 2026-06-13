import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    description: z.string(),
    path: z.string(),
    hero: z.string(),
    service: z.string(),
    serviceLabel: z.string(),
    datePublished: z.string(),
    dateModified: z.string(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    category: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string().optional(),
    excerpt: z.string(),
    hero: z.string().optional(),
    related: z.object({ label: z.string(), path: z.string() }).optional(),
  }),
});

export const collections = { guides, blog };
