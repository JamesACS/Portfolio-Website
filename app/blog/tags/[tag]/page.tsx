import Image from "next/image";
import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/content";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon, ChevronLeftIcon, TagIcon } from "lucide-react";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPostsPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const tagPosts = getPostsByTag(decodedTag);

  if (tagPosts.length === 0) {
    return (
      <div className="space-y-12">
        <header className="flex items-center space-x-2">
          <Link href="/blog" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">No posts found for tag: {decodedTag}</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-colordanger transition-colors mb-4"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Blog
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <TagIcon className="h-6 w-6 text-colordanger" />
          <h1 className="text-4xl font-bold capitalize">{decodedTag}</h1>
        </div>
        
        <p className="text-neutral-500 dark:text-neutral-400">
          {tagPosts.length} {tagPosts.length === 1 ? "post" : "posts"} tagged with &ldquo;{decodedTag}&rdquo;
        </p>
      </header>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tagPosts.map((post) => (
          <Link
            key={post.slugAsParams}
            href={post.slug}
            className="group rounded-xl overflow-hidden glass-card card-hover"
          >
            {post.image && (
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm capitalize">
                  {post.category}
                </span>
              </div>
            )}
            <div className="p-4">
              <h2 className="font-semibold mb-2 group-hover:text-colordanger transition-colors line-clamp-2">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                  {post.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>{format(parseISO(post.date), "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{post.readingTime.text}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

