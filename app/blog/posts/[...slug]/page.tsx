import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon, ChevronLeftSquare } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

import { Mdx } from "@/mdx-components";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center space-x-1">
        <Link
          href={`/blog/categories/${encodeURIComponent(
            post.category.toLowerCase(),
          )}`}
        >
          <ChevronLeftSquare className=" h-6 w-6 mt-0.5" />
        </Link>
        <h1 className="text-1xl">
          <span className="font-semibold">Back</span>
        </h1>
      </header>

      <article className="prose dark:prose-invert max-h-full max-w-full mb-12">
        <div className={montserrat.className}>
          {post.image && (
            <div className="relative mb-12 h-96 w-full">
              <Image
                className="m-0 w-full rounded-lg object-cover"
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <header>
            <h1 className="mb-2">{post.title}</h1>
            {post.description && (
              <p className="mb-6 mt-0 text-xl text-gray-700 dark:text-colortext">
                {post.description}
              </p>
            )}
            <p className="space-x-1 text-xs text-tertiary">
              <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
              <span>{` • `}</span>
              <span>{post.readingTime.text}</span>
              <span>{` • `}</span>
              <span>
                <Link
                  href={`/blog/categories/${encodeURIComponent(
                    post.category.toLowerCase(),
                  )}`}
                  className="text-tertiary underline underline-offset-2 "
                >
                  {post.category}
                </Link>
              </span>
            </p>
          </header>
          <hr className="my-6" />
          <Mdx code={post.body.code} />
        </div>
      </article>
      <div className="pb-10">
        <footer className="flex items-center space-x-1">
          <Link
            href={`/blog/categories/${encodeURIComponent(
              post.category.toLowerCase(),
            )}`}
          >
            <ChevronLeftSquare className=" h-6 w-6" />
          </Link>
          <h1 className="text-1xl">
            <span className="font-semibold">Back</span>
          </h1>
        </footer>
      </div>
    </div>
  );
}
