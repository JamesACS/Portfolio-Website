import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().optional(),
      date: s.isodate(),
      category: s.string(),
      image: s.string().optional(),
      body: s.mdx(),
      // Use s.path() to get the file path relative to content root
      path: s.path(),
    })
    .transform((data) => {
      // Remove posts/ prefix to get just the slug
      const slugAsParams = data.path.replace(/^posts\//, "");
      
      // Compute reading time from body length (approximation)
      const wordsPerMinute = 200;
      const bodyLength = data.body.length;
      const estimatedWords = Math.floor(bodyLength / 6); // rough estimate
      const minutes = Math.max(1, Math.ceil(estimatedWords / wordsPerMinute));

      return {
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        image: data.image,
        body: data.body,
        slug: `/blog/posts/${slugAsParams}`,
        slugAsParams,
        readingTime: {
          text: `${minutes} min read`,
          minutes,
          words: estimatedWords,
        },
      };
    }),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().optional(),
      image: s.string().optional(),
      body: s.mdx(),
      path: s.path(),
    })
    .transform((data) => {
      // Remove pages/ prefix to get just the slug
      const slugAsParams = data.path.replace(/^pages\//, "");

      return {
        title: data.title,
        description: data.description,
        image: data.image,
        body: data.body,
        slug: `/${slugAsParams}`,
        slugAsParams,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
