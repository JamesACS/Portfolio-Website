import Link from "next/link";
import { TwitterIcon, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex justify-center mt-9">
      <div className="space-y-10 ">
        <nav className="space-x-6 text-center text-sm font-medium text-gray-500">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/resume">Resume</Link>
          <Link href="mailto:jamesamey2000@gmail.com">Contact</Link>
        </nav>

        <div className="flex items-center justify-center">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/james-r-a-amey/"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="px-4 text-gray-5s00 hover:text-blue-500"
          >
            <Linkedin className="h-8 w-8 fill-current" />
          </a>
          <a
            target="_blank"
            href="https://twitter.com/JamesAmeyUK"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="px-4 text-gray-800 hover:text-blue-500"
          >
            <TwitterIcon className="h-8 w-8 fill-current" />
          </a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            &copy; <Link href="/">{process.env.NEXT_PUBLIC_SITE_NAME}</Link>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
