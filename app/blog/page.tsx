import Image from "next/image";
import Link from "next/link";
import { allPosts, getAllTags } from "@/lib/content";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon, ChevronLeftIcon, TagIcon, SearchIcon } from "lucide-react";
import { ScrollAnimation, StaggerContainer } from "@/components/scrollAnimation";

const sortedPosts = [...allPosts].sort((a, b) => {
  const aDate = new Date(a.date).valueOf();
  const bDate = new Date(b.date).valueOf();
  return bDate - aDate;
});

export default function Blog() {
  const tags = getAllTags().slice(0, 12); // Top 12 tags

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-colordanger transition-colors mb-4"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1 h-8 bg-colordanger rounded-full" />
          <h1 className="text-4xl font-bold">All Posts</h1>
        </div>
        
        <p className="text-neutral-500 dark:text-neutral-400 ml-4">
          {sortedPosts.length} articles across all categories
        </p>
      </header>

      {/* Tags */}
      {tags.length > 0 && (
        <ScrollAnimation animation="fade-up">
          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="h-4 w-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-500">Popular Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-colordanger hover:text-white transition-colors"
                >
                  {tag} <span className="opacity-60">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Posts Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
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
                
                {/* Category badge */}
                <span className="absolute bottom-2 left-2 text-xs text-white/90 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm capitalize">
                  {post.category}
                </span>
                
                {/* Featured badge */}
                {post.featured && (
                  <span className="absolute top-2 right-2 text-xs bg-colordanger text-white px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
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
              
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>{format(parseISO(post.date), "MMM d, yyyy")}</span>
                  <span>•</span>
                  <span>{post.readingTime.text}</span>
                </div>
                <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-colordanger" />
              </div>
            </div>
          </Link>
        ))}
      </StaggerContainer>
    </div>
  );
}
