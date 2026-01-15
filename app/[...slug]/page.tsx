import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPages } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { Mdx } from "@/mdx-components";
import { ChevronLeftIcon } from "lucide-react";
import { ScrollAnimation } from "@/components/scrollAnimation";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function getPageFromParams(slug: string[]) {
  const slugPath = slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slugPath);
  return page || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageFromParams(slug);

  if (!page) return {};

  return {
    title: `${page.title} | James Amey`,
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
  const page = getPageFromParams(slug);

  if (!page) {
    notFound();
  }

  // Check if this is the about page for special layout
  const isAboutPage = page.slugAsParams === "about";
  const isResumePage = page.slugAsParams === "resume";

  return (
    <article>
      {/* Back navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-colordanger transition-colors mb-8"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Hero section for About page */}
      {isAboutPage && page.image && (
        <ScrollAnimation animation="scale">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 ring-4 ring-colordanger/20">
              <Image
                src={page.image}
                alt={page.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{page.title}</h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                Support Engineer • Developer • Writer
              </p>
              <div className="flex gap-3">
                <a
                  href="https://calendly.com/jamesamey/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-colordanger text-white text-sm font-medium hover:bg-colordangerbright transition-colors"
                >
                  Book a Call
                </a>
                <a
                  href="mailto:jamesamey2000@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Hero section for Resume page */}
      {isResumePage && (
        <div className="mb-12 animate-fade-in-up">
          {page.image && (
            <div className="relative w-full mb-6">
              <div className="relative h-48 md:h-64 w-full rounded-2xl overflow-hidden">
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {page.title}
                </h1>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <a
              href="https://calendly.com/jamesamey/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-colordanger text-white text-sm font-medium hover:bg-colordangerbright transition-colors"
            >
              Schedule Interview
            </a>
            <a
              href="mailto:jamesamey2000@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}

      {/* Standard hero for other pages */}
      {!isAboutPage && !isResumePage && (
        <ScrollAnimation animation="fade-up">
          <header className="mb-8">
            {page.image && (
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.title}</h1>
            {page.description && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {page.description}
              </p>
            )}
          </header>
        </ScrollAnimation>
      )}

      {/* LCARS divider */}
      <div className="lcars-bar mb-8" />

      {/* Content */}
      <div className={`prose-custom ${isResumePage ? 'resume-layout' : ''}`}>
        <Mdx code={page.body} />
      </div>
    </article>
  );
}
