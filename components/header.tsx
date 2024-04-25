"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { ThemeSwitcher } from "./themeSwitcher";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <nav className="mb-9">
      <div className="mx-auto">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute  flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center ml-6 sm:ml-0 sm:absolute sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="text-sm font-black">
                {process.env.NEXT_PUBLIC_SITE_NAME}
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center ">
            <div className="ml-6">
              <div className="space-x-6 text-md font-medium">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/resume">Resume</Link>
                <Link href="mailto:jamesamey2000@gmail.com">Contact</Link>
              </div>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>

      <div
        className={`space-y-4 px-2 sm:hidden ${
          isMobileOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div>
          <Link href="/" onClick={toggleMobileMenu}>
            Home
          </Link>
        </div>
        <div>
          <Link href="/about" onClick={toggleMobileMenu}>
            About
          </Link>
        </div>
        <div>
          <Link href="/resume" onClick={toggleMobileMenu}>
            Resume
          </Link>
        </div>
        <div>
          <Link
            href="mailto:jamesamey2000@gmail.com"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
