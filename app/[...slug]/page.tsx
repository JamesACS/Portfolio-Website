import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPages } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { Mdx } from "@/mdx-components";
import { ChevronLeftSquare } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getPageFromParams(slug: string[]) {
  const slugPath = slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slugPath);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromParams(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageFromParams(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <header className="flex items-center space-x-2">
        <Link href="/">
          <ChevronLeftSquare className="h-6 w-6 mt-0.5" />
        </Link>
        <h1 className="font-semibold">Back</h1>
      </header>
      <article className="prose dark:prose-invert max-w-full mb-12">
        <div className={montserrat.className}>
          {page.image && (
            <div className="relative mb-8 h-96 w-full">
              <Image
                className="m-0 w-full rounded-lg object-cover"
                src={page.image}
                alt={page.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <h1 className="text-center">{page.title}</h1>
          {page.description && <p className="text-xl">{page.description}</p>}
          <hr className="my-6" />
          <Mdx code={page.body} />
        </div>
      </article>
    </div>
  );
}
