import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";

export default function Blog() {
  return (
    <div>
      {allPosts.map((post) => (
        <article key={post._id} className="mb-12">
          <Card>
            {post.image && (
              <div className="relative h-60 w-full">
                <Link href={post.slug}>
                  <Image
                    className="m-0 w-full rounded-t-lg object-cover"
                    src={post.image}
                    alt={post.title}
                    fill
                  />
                </Link>
              </div>
            )}
            <CardHeader>
              <CardTitle className="m-0">
                <Link href={post.slug} className="no-underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="space-x-1 text-xs text-tertiary">
                <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                <span>{` • `}</span>
                <span>{post.readingTime.text}</span>
                <span>{` • `}</span>
                <span>
                  <Link
                    href={`/blog/categories/${encodeURIComponent(
                      post.category.toLowerCase(),
                    )}`}
                    className="underline underline-offset-2 "
                  >
                    {post.category}
                  </Link>
                </span>
              </CardDescription>
            </CardHeader>
            {post.description && (
              <CardContent className="text-tertiary">
                {post.description}
              </CardContent>
            )}
            <CardFooter>
              <Link
                href={post.slug}
                className="inline-flex items-center space-x-2 rounded-sm bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white no-underline hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-colordanger dark:hover:bg-colordangerbright dark:focus:ring-secondaryhover"
              >
                <span>Read more</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </CardFooter>
          </Card>
        </article>
      ))}
    </div>
  );
}
