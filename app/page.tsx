import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CodeIcon, WrenchIcon, PenToolIcon, BookOpenIcon } from "lucide-react";
import { getFeaturedPosts, getAllCategories } from "@/lib/content";
import TestimonialsSlider from "@/components/testimonialsSlider";
import { ScrollAnimation, StaggerContainer } from "@/components/scrollAnimation";
import { format, parseISO } from "date-fns";

// LCARS color flow: Orange → Blue → Lilac → Peach
const lcarsColors = [
  { color: "text-[#ff9900]", bgColor: "bg-[#ff9900]/10 dark:bg-[#ff9900]/20", hoverBg: "group-hover:text-[#ff9900]", gradient: "from-[#ff9900]/10" },
  { color: "text-[#99ccff]", bgColor: "bg-[#99ccff]/10 dark:bg-[#99ccff]/20", hoverBg: "group-hover:text-[#99ccff]", gradient: "from-[#99ccff]/10" },
  { color: "text-[#cc99cc]", bgColor: "bg-[#cc99cc]/10 dark:bg-[#cc99cc]/20", hoverBg: "group-hover:text-[#cc99cc]", gradient: "from-[#cc99cc]/10" },
  { color: "text-[#ffcc99]", bgColor: "bg-[#ffcc99]/10 dark:bg-[#ffcc99]/20", hoverBg: "group-hover:text-[#ffcc99]", gradient: "from-[#ffcc99]/10" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  coding: <CodeIcon className="h-6 w-6" />,
  building: <WrenchIcon className="h-6 w-6" />,
  writing: <PenToolIcon className="h-6 w-6" />,
  general: <BookOpenIcon className="h-6 w-6" />,
};

const categoryDescriptions: Record<string, string> = {
  coding: "Development projects, web apps, and technical explorations",
  building: "Physical builds, model kits, and hardware projects",
  writing: "Reviews, articles, and the Pathfinder Project",
  general: "Thoughts, insights, and everything else",
};

export default function Home() {
  const featuredPosts = getFeaturedPosts(3);
  const categories = getAllCategories();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 hero-gradient rounded-2xl mb-16">
        <div className="lcars-bar mb-6" />
        
        <ScrollAnimation animation="fade-up">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold pb-10 mb-0 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent leading-none">
              James Amey
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-2 -mt-1">
              Support Engineer • Developer • Writer
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 max-w-xl mx-auto mb-10">
              Solving complex problems with technology, building delightful support experiences, 
              and often writing about Star Trek.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff9900] text-white font-medium hover:bg-[#ffaa22] transition-all duration-300 shadow-lg shadow-[#ff9900]/25 hover:shadow-[#ff9900]/40 hover:-translate-y-0.5"
              >
                About Me
               
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#99ccff] text-black font-medium hover:bg-[#aaddff] transition-all duration-300 shadow-lg shadow-[#99ccff]/25 hover:shadow-[#99ccff]/40 hover:-translate-y-0.5"
              >
                View Resume
              </Link>
            </div>
          </div>
        </ScrollAnimation>

        <div className="lcars-bar mt-8" />
      </section>

      {/* Categories Bento Grid */}
      <section className="mb-16">
        <ScrollAnimation animation="fade-up">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-[#ff9900] rounded-full" />
            Explore
          </h2>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(({ category, count }, index) => {
            // Assign color based on position (left to right: orange, blue, lilac, peach)
            const colorConfig = lcarsColors[index % lcarsColors.length];
            const icon = categoryIcons[category] || <BookOpenIcon className="h-6 w-6" />;
            const description = categoryDescriptions[category] || `${count} posts`;
            
            return (
              <Link
                key={category}
                href={`/blog/categories/${category}`}
                className="group relative p-6 rounded-xl glass-card card-hover overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorConfig.gradient} to-transparent rounded-bl-full`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg ${colorConfig.bgColor} flex items-center justify-center ${colorConfig.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  
                  <h3 className={`text-lg font-semibold capitalize mb-1 ${colorConfig.hoverBg} transition-colors`}>
                    {category}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    {description}
                  </p>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {count} {count === 1 ? "post" : "posts"}
                  </span>
                </div>
                
                <ArrowRightIcon className={`absolute bottom-4 right-4 h-5 w-5 text-neutral-300 dark:text-neutral-600 ${colorConfig.hoverBg} group-hover:translate-x-1 transition-all duration-300`} />
              </Link>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Featured Projects */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <ScrollAnimation animation="fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-1 h-6 bg-[#99ccff] rounded-full" />
                Featured Projects
              </h2>
              <Link
                href="/blog"
                className="text-sm text-neutral-500 hover:text-[#ff9900] transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <ScrollAnimation key={post.slugAsParams} animation="fade-up" delay={index * 100}>
                <Link href={post.slug} className="group block">
                  <article className="rounded-xl overflow-hidden glass-card card-hover h-full">
                    {post.image && (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-[#ff9900] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
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
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="mb-16">
        <ScrollAnimation animation="fade-up">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <span className="w-1 h-6 bg-[#cc99cc] rounded-full" />
            What People Say
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="scale">
          <TestimonialsSlider />
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <ScrollAnimation animation="fade-up">
        <section className="text-center py-12 px-6 rounded-2xl glass-card">
          <div className="lcars-bar mb-6" />
          <h2 className="text-2xl font-bold mb-3">Let&apos;s Talk</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Are you building a new Support team, or the next generation of Support tooling? If you would like some feedback on your ideas, or just want to have a chat. Please get in touch!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/jamesamey/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff9900] text-white font-medium hover:bg-[#ffaa22] transition-all duration-300"
            >
              Book 30 Minutes
            </a>
            <a
              href="mailto:jamesamey2000@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#99ccff] text-black font-medium hover:bg-[#aaddff] transition-all duration-300 shadow-lg shadow-[#99ccff]/25 hover:shadow-[#99ccff]/40 hover:-translate-y-0.5"
              >
              Send Email
            </a>
          </div>
          <div className="lcars-bar mt-6" />
        </section>
      </ScrollAnimation>
    </main>
  );
}
