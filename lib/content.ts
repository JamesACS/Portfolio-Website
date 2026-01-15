// Re-export Velite generated content with proper types
import { posts, pages } from "#site/content";

export interface ReadingTime {
  text: string;
  minutes: number;
  words: number;
}

export interface Post {
  title: string;
  description?: string;
  date: string;
  category: string;
  image?: string;
  featured: boolean;
  tags: string[];
  body: string;
  slug: string;
  slugAsParams: string;
  readingTime: ReadingTime;
}

export interface Page {
  title: string;
  description?: string;
  image?: string;
  body: string;
  slug: string;
  slugAsParams: string;
}

export const allPosts = posts as Post[];
export const allPages = pages as Page[];

// Helper functions
export function getFeaturedPosts(limit = 3): Post[] {
  return allPosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(0, limit);
}

export function getRecentPosts(limit = 6): Post[] {
  return allPosts
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(0, limit);
}

export function getPostsByCategory(category: string): Post[] {
  return allPosts
    .filter((post) => post.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function getPostsByTag(tag: string): Post[] {
  return allPosts
    .filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagCounts = new Map<string, number>();
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase();
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const categoryCounts = new Map<string, number>();
  
  allPosts.forEach((post) => {
    const normalizedCategory = post.category.toLowerCase();
    categoryCounts.set(normalizedCategory, (categoryCounts.get(normalizedCategory) || 0) + 1);
  });
  
  return Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
