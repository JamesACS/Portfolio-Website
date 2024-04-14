"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Transition } from "@headlessui/react";
import Link from "next/link";

import TestimonialImg01 from "@/public/testimonials/Pathfinder-Project-logo.png";
import TestimonialImg02 from "@/public/testimonials/necotestamonial.png";
import TestimonialImg03 from "@/public/testimonials/Pathfinder-Project-logo.png";

interface Testimonial {
  img: StaticImageData;
  url: string;
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  const testimonials: Testimonial[] = [
    {
      img: TestimonialImg01,
      url: "https://www.linkedin.com/in/necoline/",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed turpis.",
      name: "Ives van Hoorne",
      role: "Founder & CTO",
    },
    {
      img: TestimonialImg02,
      url: "https://www.linkedin.com/in/necoline/",
      quote:
        "In the 2 years of working together James has cultivated a support system that goes beyond resolving customer concerns and has become an essential part of community building, product feedback and an important source of health metrics.",
      name: "Necoline Hubner",
      role: "Head of Product",
    },
    {
      img: TestimonialImg03,
      url: "https://www.linkedin.com/in/necoline/",
      quote:
        " Pulvinar pellentesque habitant morbi tristique senectus et netus et. Nullam non nisi est sit amet facilisis. Viverra adipiscing at in tellus integer feugiat scelerisque.",
      name: "Sanne Kalkman",
      role: " Senior Backend Engineer",
    },
  ];

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === testimonials.length ? 0 : (active) => active + 1,
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate]);

  return (
    <div className="w-full max-w-3xl mx-auto text-center ">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-colorlink/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                key={index}
                show={active === index}
                className="absolute inset-0 h-full -z-10"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
              >
                <Image
                  className="relative top-11 left-1/2 -translate-x-1/2 rounded-sm"
                  src={testimonial.img}
                  width={56}
                  height={56}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
        <div
          className="relative h-full flex flex-col flex-wrap"
          ref={testimonialsRef}
        >
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={() => heightFix()}
            >
              <div className="text-2xl w-1xl before:content-['\201C'] after:content-['\201D']">
                {testimonial.quote}
              </div>
            </Transition>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center -m-1.5 mb-9">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={` justify-center whitespace-nowrap rounded-sm px-3 py-1.5 m-1.5 text-s shadow-sm border border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-transparent dark:focus-visible:ring-transparent transition-colors duration-150 ${active === index ? "bg-white  shadow-colorlink-950/10 dark:bg-neutral-800/90 dark:border-neutral-700 " : "bg-gray-100 hover:bg-white dark:bg-neutral-800/40 hover:dark:bg-neutral-800/90 hover:dark:border-neutral-700 "}`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <h2>{testimonial.name}</h2>{" "}
            <h2
              className={`${active === index ? "text-indigo-200" : "text-slate-300"}`}
            ></h2>{" "}
            <p className="opacity-50 text-xs">{testimonial.role}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
