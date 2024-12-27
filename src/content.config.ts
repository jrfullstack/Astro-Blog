import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import type { SchemaContext } from "astro:content";

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    // image: image(),
    // description: z.string().optional(),
    image: image().refine((img) => img.width <= 1200, {
      message: "La imagen debe tener un ancho menor o igual a 1200px.",
    }),
  });
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image(),

      // Relación
      // author: z.string(),
      author: reference("author"),

      // Relación
      tags: z.array(z.string()),

      // Boolean
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/data/author" }),

  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
