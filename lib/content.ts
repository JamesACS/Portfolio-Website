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

