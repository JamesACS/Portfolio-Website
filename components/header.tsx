"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { ThemeSwitcher } from "./themeSwitcher";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];

const contactMethods = [
  { name: "Book a Meeting", href: "https://calendly.com/jamesamey/30min" },
  { name: "Send an Email", href: "mailto:jamesamey2000@gmail.com" },
];

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <header className="sticky top-0 z-50 mb-6 -mx-4 px-4">
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm"
            : "py-4 bg-transparent"
        }`}
      >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg pl-5 font-bold tracking-tight hover:text-colordanger transition-colors"
          >
            {process.env.NEXT_PUBLIC_SITE_NAME || "James Amey"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-colordanger dark:hover:text-colordanger transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {link.label}
              </Link>
            ))}

            <Popover className="relative">
              <PopoverButton className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-colordanger dark:hover:text-colordanger transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none">
                Contact
              </PopoverButton>

              <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 z-50">
                {contactMethods.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-colordanger dark:hover:text-colordanger hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </PopoverPanel>
            </Popover>

            <div className="ml-2 pl-5 pr-5 border-l border-neutral-200 dark:border-neutral-700">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 px-2 space-y-1 glass-card rounded-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="block px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-colordanger dark:hover:text-colordanger hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-700">
            <p className="px-4 py-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Contact
            </p>
            {contactMethods.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-colordanger dark:hover:text-colordanger hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      </nav>
      {/* Fade gradient below header */}
      <div 
        className={`h-6 bg-gradient-to-b from-white/80 dark:from-neutral-900/80 to-transparent transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ marginTop: '-1px' }}
      />
    </header>
  );
}
