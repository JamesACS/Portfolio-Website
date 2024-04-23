import Image from "next/image";
import Link from "next/link";
import TestimonialsSlider from "@/components/testimonialsSlider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:opacity-30 before:bg-gradient-radial before:from-colorquinternary before:to-transparent before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[300px] after:w-[350px] after:translate-x-1/2 after:bg-gradient-conic after:opacity-50 after:from-sky-900 after:via-colorsuccessdark after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:via-colorquinternary before:dark:opacity-20 after:dark:from-sky-900 after:dark:via-colorsuccessdark after:dark:opacity-60 before:lg:h-[360px] z-[-1]">
        <p className="relative text-5xl text-black dark:text-white dark:drop-shadow-[0_0_0.4rem_#ffffff70] ">
          James Amey
        </p>
      </div>

      <div className="relative grid items-center text-center text-black lg:max-w-5xl lg:grid-cols-4  dark:text-white">
        <Link
          href="/blog/categories/coding"
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Coding{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Development Projects
          </p>
        </Link>

        <Link
          href="/blog/categories/building"
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Building{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Model kits, MSDs and more...
          </p>
        </Link>

        <Link
          href="/blog/categories/writing"
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Writing{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Reviews and Pathfinder Project
          </p>
        </Link>

        <Link
          href="/blog"
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Blog{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Everything in one place with other general posts
          </p>
        </Link>
      </div>

      <TestimonialsSlider />
    </main>
  );
}
