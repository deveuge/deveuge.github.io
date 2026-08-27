import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const projects = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      tags: z.array(z.string()),
      imagePreview: image(),
      codePreview: z.url(),
      livePreview: z.url().optional(),
      /** Only set when a project has no live/source-only status yet (see REDESIGN-PLAN.md § 2.4). */
      inProgress: z.boolean().optional(),
      images: z.array(image()),
    }),
})

export const collections = { projects }
