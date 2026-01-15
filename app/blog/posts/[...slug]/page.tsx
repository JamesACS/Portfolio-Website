import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/content";
import { format, parseISO } from "date-fns";
import { ChevronLeftIcon, CalendarIcon, ClockIcon, TagIcon } from "lucide-react";
import { ScrollAnimation } from "@/components/scrollAnimation";
import { Mdx } from "@/mdx-components";

interface PostProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getPostFromParams(slug: string[]) {
  const slugPath = slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slugPath);
  return post || null;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostFromParams(slug);

  if (!post) return {};

  return {
    title: `${post.title} | James Amey`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = getPostFromParams(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Back navigation */}
      <Link
        href={`/blog/categories/${encodeURIComponent(post.category.toLowerCase())}`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-colordanger transition-colors mb-8"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to {post.category}
      </Link>

      {/* Hero image */}
      {post.image && (
        <ScrollAnimation animation="scale">
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </ScrollAnimation>
      )}

      {/* Header */}
      <ScrollAnimation animation="fade-up">
        <header className="mb-8">
          {/* Category badge */}
          <Link
            href={`/blog/categories/${encodeURIComponent(post.category.toLowerCase())}`}
            className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-colordanger/10 text-colordanger hover:bg-colordanger hover:text-white transition-colors mb-4"
          >
            {post.category}
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              {post.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              {format(parseISO(post.date), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              {post.readingTime.text}
            </span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <TagIcon className="h-4 w-4 text-neutral-400" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-colordanger hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>
      </ScrollAnimation>

      {/* LCARS divider */}
      <div className="lcars-bar mb-8" />

      {/* Content */}
      <ScrollAnimation animation="fade-up" delay={100}>
        <div className="prose-custom">
          <Mdx code={post.body} />
        </div>
      </ScrollAnimation>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="lcars-bar mb-6" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/blog/categories/${encodeURIComponent(post.category.toLowerCase())}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-colordanger transition-colors"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            More {post.category} posts
          </Link>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium hover:bg-colordanger hover:text-white transition-colors"
          >
            View all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
