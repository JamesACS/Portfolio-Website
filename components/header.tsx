"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Popover } from "@headlessui/react";

import { ThemeSwitcher } from "./themeSwitcher";

const contactMethods = [
  {
    name: "Book a Meeting",
    href: "https://calendly.com/jamesamey/30min",
  },
  {
    name: "Send an Email",
    href: "mailto:jamesamey2000@gmail.com",
  },
];

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
              <div className="space-x-6 text-md  font-medium">
                <Link className="hover:opacity-90" href="/">
                  Home
                </Link>
                <Link className="hover:opacity-90" href="/about">
                  About
                </Link>
                <Link className="hover:opacity-90" href="/resume">
                  Resume
                </Link>
                <Popover className="inline-flex">
                  {({ open }) => (
                    <>
                      <Popover.Button className="group inline-flex items-center  hover:opacity-90 focus:outline-none ">
                        <span>Contact</span>
                      </Popover.Button>

                      <Popover.Panel className="absolute mt-8    ">
                        <div className="relative grid">
                          {contactMethods.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className=" flex items-center p-2 -translate-x-7 transition duration-150 ease-in-out  focus:outline-none focus-visible:ring hover:opacity-90 "
                            >
                              <p>{item.name}</p>
                            </a>
                          ))}
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
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
          <Link
            className="hover:opacity-90"
            href="/"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            className="hover:opacity-90"
            href="/about"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
        </div>
        <div>
          <Link
            className="hover:opacity-90"
            href="/resume"
            onClick={toggleMobileMenu}
          >
            Resume
          </Link>
        </div>
        <div>
          <Popover className="inline-flex">
            {({ open }) => (
              <>
                <Popover.Button className="group inline-flex items-center  hover:opacity-90 focus:outline-none ">
                  <span>Contact</span>
                </Popover.Button>

                <Popover.Panel className="absolute mt-6    ">
                  <div className="relative grid">
                    {contactMethods.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className=" flex items-center   transition duration-150 ease-in-out  focus:outline-none focus-visible:ring hover:opacity-90 "
                      >
                        <div className="mt-4">
                          <p>{item.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
    </nav>
  );
}
