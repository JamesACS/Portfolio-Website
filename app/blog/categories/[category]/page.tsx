import Image from "next/image";
import Link from "next/link";
import { allPosts, getPostsByCategory, getAllCategories } from "@/lib/content";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon, ChevronLeftIcon, TagIcon } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(({ category }) => ({
    category,
  }));
}

export default async function CategoryPostsPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryPosts = getPostsByCategory(category);

  if (categoryPosts.length === 0) {
    return (
      <div className="space-y-12">
        <header className="flex items-center space-x-2">
          <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">No posts found</h1>
        </header>
      </div>
    );
  }

  // Get unique tags for this category
  const categoryTags = [...new Set(categoryPosts.flatMap((post) => post.tags))];

  // Determine bento grid spans based on index
  const getGridSpan = (index: number, total: number) => {
    if (total === 1) return "md:col-span-4 md:row-span-2";
    if (total === 2) return "md:col-span-2 md:row-span-2";
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 1) return "md:col-span-2 md:row-span-1";
    if (index === 2) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  };

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
          <h1 className="text-4xl font-bold capitalize">{category}</h1>
        </div>
        
        <p className="text-neutral-500 dark:text-neutral-400 ml-4">
          {categoryPosts.length} {categoryPosts.length === 1 ? "post" : "posts"} in this category
        </p>
      </header>

      {/* Tags filter */}
      {categoryTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <TagIcon className="h-4 w-4 text-neutral-400" />
          {categoryTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-colordanger hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Bento Grid */}
      <div className="bento-grid">
        {categoryPosts.map((post, index) => (
          <Link
            key={post.slugAsParams}
            href={post.slug}
            className={`group relative rounded-xl overflow-hidden glass-card card-hover ${getGridSpan(index, categoryPosts.length)}`}
          >
            {/* Background Image */}
            {post.image && (
              <div className="absolute inset-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              </div>
            )}

            {/* Content overlay */}
            <div className={`relative z-10 p-5 h-full flex flex-col justify-end ${post.image ? "text-white" : ""}`}>
              {/* Featured badge */}
              {post.featured && (
                <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-colordanger text-white">
                  Featured
                </span>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        post.image
                          ? "bg-white/20 text-white/90"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h2 className={`font-bold mb-1 group-hover:text-colordanger transition-colors ${
                index < 3 ? "text-xl" : "text-base"
              }`}>
                {post.title}
              </h2>

              {post.description && index < 3 && (
                <p className={`text-sm mb-2 line-clamp-2 ${
                  post.image ? "text-white/80" : "text-neutral-500 dark:text-neutral-400"
                }`}>
                  {post.description}
                </p>
              )}

              <div className={`flex items-center gap-2 text-xs ${
                post.image ? "text-white/60" : "text-neutral-400"
              }`}>
                <span>{format(parseISO(post.date), "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{post.readingTime.text}</span>
              </div>
            </div>

            {/* Hover arrow */}
            <ArrowRightIcon className={`absolute bottom-4 right-4 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
              post.image ? "text-white" : "text-colordanger"
            }`} />
          </Link>
        ))}
      </div>
    </div>
  );
}
