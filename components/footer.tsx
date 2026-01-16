import Link from "next/link";
import { LinkedinIcon, TwitterIcon, MailIcon } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/james-r-a-amey/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  {
    href: "https://bsky.app/profile/jamesamey.bsky.social",
    icon: TwitterIcon,
    label: "Bluesky",
  },
  {
    href: "mailto:jamesamey2000@gmail.com",
    icon: MailIcon,
    label: "Email",
  },
];

export function Footer() {
  return (
    <footer className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <Link href="/" className="text-lg font-bold text-inherit hover:!text-[#d55138] transition-colors cursor-pointer">
            {process.env.NEXT_PUBLIC_SITE_NAME || "James Amey"}
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Support Engineer • Developer • Writer
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-neutral-400 uppercase tracking-wider">
            Navigation
          </h4>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:!text-[#d55138] transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-neutral-400 uppercase tracking-wider">
            Connect
          </h4>
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:!bg-[#d55138] hover:!text-white transition-all duration-300 cursor-pointer"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:!text-[#d55138] transition-colors cursor-pointer">
            {process.env.NEXT_PUBLIC_SITE_NAME || "James Amey"}
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
